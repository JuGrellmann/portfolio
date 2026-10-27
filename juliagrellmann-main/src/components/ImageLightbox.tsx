"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  HiXMark,
  HiMagnifyingGlassPlus,
  HiMagnifyingGlassMinus,
  HiArrowsPointingIn,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import styles from "./ImageLightbox.module.scss";

export interface LightboxImage {
  src: string;
  alt?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  startIndex?: number;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const STEP = 1.5;

type Point = { x: number; y: number };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function ImageLightbox({ images, startIndex = 0, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, Point>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const moved = useRef(false);
  const view = useRef({ scale, offset });
  view.current = { scale, offset };

  const reset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Zoom keeping the given point (relative to the stage center) fixed on screen
  const zoomTo = useCallback((nextScale: number, focus: Point = { x: 0, y: 0 }) => {
    const { scale: s, offset: o } = view.current;
    const next = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    if (next === MIN_SCALE) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
      return;
    }
    const ratio = next / s;
    setScale(next);
    setOffset({
      x: focus.x - (focus.x - o.x) * ratio,
      y: focus.y - (focus.y - o.y) * ratio,
    });
  }, []);

  const toStagePoint = (clientX: number, clientY: number): Point => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    };
  };

  const go = useCallback(
    (dir: number) => {
      if (images.length < 2) return;
      setIndex((i) => (i + dir + images.length) % images.length);
      reset();
    },
    [images.length, reset],
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") zoomTo(view.current.scale * STEP);
      else if (e.key === "-") zoomTo(view.current.scale / STEP);
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, go, zoomTo, reset]);

  // Wheel needs a non-passive listener to prevent page scroll
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      zoomTo(view.current.scale * factor, toStagePoint(e.clientX, e.clientY));
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [zoomTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: view.current.scale };
    }
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const current = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, current);

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const center = toStagePoint((a.x + b.x) / 2, (a.y + b.y) / 2);
      zoomTo((pinchStart.current.scale * dist) / pinchStart.current.dist, center);
      moved.current = true;
      return;
    }

    const dx = current.x - prev.x;
    const dy = current.y - prev.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true;
    if (view.current.scale > 1) {
      setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) setDragging(false);
  };

  const onStageClick = (e: React.MouseEvent) => {
    if (moved.current) return;
    if (e.target === e.currentTarget && view.current.scale === 1) onClose();
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    if (view.current.scale > 1) reset();
    else zoomTo(2.5, toStagePoint(e.clientX, e.clientY));
  };

  const image = images[index];
  if (!image) return null;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={image.alt || "Imagem"}>
      <div className={styles.toolbar}>
        {images.length > 1 && (
          <span className={styles.counter}>
            {index + 1} / {images.length}
          </span>
        )}
        <button type="button" className={styles.button} onClick={() => zoomTo(scale / STEP)} disabled={scale <= MIN_SCALE} aria-label="Diminuir zoom">
          <HiMagnifyingGlassMinus />
        </button>
        <span className={styles.zoomLabel}>{Math.round(scale * 100)}%</span>
        <button type="button" className={styles.button} onClick={() => zoomTo(scale * STEP)} disabled={scale >= MAX_SCALE} aria-label="Aumentar zoom">
          <HiMagnifyingGlassPlus />
        </button>
        <button type="button" className={styles.button} onClick={reset} disabled={scale === 1} aria-label="Restaurar zoom">
          <HiArrowsPointingIn />
        </button>
        <button type="button" className={styles.button} onClick={onClose} aria-label="Fechar">
          <HiXMark />
        </button>
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        style={{ cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onStageClick}
        onDoubleClick={onDoubleClick}
      >
        <img
          key={image.src}
          src={image.src}
          alt={image.alt || ""}
          draggable={false}
          className={styles.image}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transition: dragging ? "none" : "transform 0.15s ease-out",
          }}
        />
      </div>

      {images.length > 1 && (
        <>
          <button type="button" className={`${styles.button} ${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label="Imagem anterior">
            <HiChevronLeft />
          </button>
          <button type="button" className={`${styles.button} ${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label="Próxima imagem">
            <HiChevronRight />
          </button>
        </>
      )}

      <p className={styles.hint}>Role ou use dois dedos para dar zoom · arraste para mover · duplo clique alterna o zoom</p>
    </div>,
    document.body,
  );
}
