"use client";

import { useState } from "react";
import { Media, MediaProps } from "@once-ui-system/core";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { ImageLightbox, LightboxImage } from "@/components/ImageLightbox";
import styles from "./ImageLightbox.module.scss";

type ZoomableMediaProps = MediaProps & {
  src: string;
  // Other images to browse in the lightbox; defaults to just this one
  gallery?: LightboxImage[];
};

export function ZoomableMedia({ gallery, src, alt, ...props }: ZoomableMediaProps) {
  const [open, setOpen] = useState(false);
  const images = gallery?.length ? gallery : [{ src, alt }];
  const startIndex = Math.max(0, images.findIndex((image) => image.src === src));

  return (
    <>
      <div
        className={styles.trigger}
        role="button"
        tabIndex={0}
        aria-label={`Ampliar imagem${alt ? `: ${alt}` : ""}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <Media src={src} alt={alt} cursor="interactive" {...props} />
      </div>
      {open && <ImageLightbox images={images} startIndex={startIndex} onClose={() => setOpen(false)} />}
    </>
  );
}

// Floating button to open a set of images, for places where the image itself is already interactive (e.g. carousels)
export function LightboxButton({ images }: { images: LightboxImage[] }) {
  const [open, setOpen] = useState(false);
  if (images.length === 0) return null;

  return (
    <>
      <button
        type="button"
        className={`${styles.button} ${styles.expand}`}
        onClick={() => setOpen(true)}
        aria-label="Ampliar imagens"
      >
        <HiArrowsPointingOut />
      </button>
      {open && <ImageLightbox images={images} onClose={() => setOpen(false)} />}
    </>
  );
}
