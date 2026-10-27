import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Julia",
  lastName: "Grellmann",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Projetista Civil",
  avatar: "/images/avatar.jpg",
  email: "grellmann.ju21@gmail.com",
  location: "Brasil/São Paulo", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Português", "Inglês"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/julia-grellmann/",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/+555193287291",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfólio`,
  description: `Portfólio mostrando meu trabalho como ${person.role}`,
  headline: <>Projetos que funcionam, obras que acontecem.</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Redefinição de Layout Interno</strong></>,
    href: "/work/otimizacaoApartamento",
  },
  subline: (
    <>
      Substituindo complicação por clareza: da planta ao cronograma.
    </>
  ),
};

const about = {
  path: "/about",
  label: "Sobre",
  title: `Sobre – ${person.name}`,
  description: `Conheça ${person.name}, ${person.role} de ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introdução",
    description: (
      <>
        Sou estudante de Engenharia Civil com experiência prática desde 2022 em obras residenciais e comerciais. Atuei em diversas fases do canteiro:
        medições, controle de materiais, atualização de projetos, cronogramas, orçamentos e contato com fornecedores. Também participei de projetos
        acadêmicos e sociais no PET Civil UFRGS. Hoje, busco unir o conhecimento técnico da execução com a elaboração de projetos completos,
        otimizados e bem apresentados.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experiências",
    experiences: [
      {
        company: "Self-employed",
        timeframe: "2025 - atualmente",
        role: "Auxiliar de Engenharia Civil",
        achievements: [
          <>
            Acompanhamento técnico de obras civis, conformidade com
            cronograma, orçamento e padrões de qualidade 
          </>,
          <>
            Elaboração de relatórios detalhados do progresso, incluindo registros
            com fotos e análises de desempenho.
          </>,
          <>
            Apoio no controle de materiais e serviços. Monitoramento das etapa
            construtivas e comunicação com equipes de campo e escritório.
          </>
        ],
        images: [
          
        ]
      },
      {
        company: "Construtora Granada",
        timeframe: "2024 - 2025",
        role: "Estagiária de Engenharia Civil",
        achievements: [
          <>
            Atuo no acompanhamento direto da execução da obra, realizando medições, preenchendo diários e
            acompanhando os serviços por meio das FVS (Fichas de Verificação de Serviço) e Instruções de Trabalho.
          </>,
          <>
            Participei ativamente da solicitação, recebimento e controle de materiais, garantindo o fluxo eficiente de insumos.
            Também fui responsável pela atualização e controle de projetos, além do monitoramento do cronograma físico-financeiro.
          </>,
          <>
            Realizei orçamentos, levantamentos e contribuí para o planejamento das etapas construtivas com foco em organização e previsibilidade.
          </>
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
        ],
      },
      {
        company: "Rede Pires",
        timeframe: "2023 - 2024",
        role: "Estagiária de Engenharia Civil",
        achievements: [
          <>
            Trabalhei com inspeção e acompanhamento de serviços, verificando conformidade com normas técnicas e legislações.
          </>,
          <>
            Estive em contato direto com prestadores de serviço, fornecedores e órgãos públicos, auxiliando na articulação e execução das etapas da obra.
          </>,
          <>
            Controlei documentos e projetos em andamento, solicitei materiais e providenciei recursos para execução.
            Também participei da conferência de serviços para validação de medições.
          </>
        ],
        images: [],
      },
      {
        company: "Aikon Empreendimentos",
        timeframe: "2023 - 2023",
        role: "Estagiária de Engenharia Civil",
        achievements: [
          <>
            Acompanhei rotinas de obra, com foco em medições, controle de materiais e atualização de projetos. Fui inserida na gestão de qualidade de obras,
            desenvolvendo conhecimento sobre as ISO 9001 e 14001, com a utilização do Mobuss para acompanhamento e controle de qualidade.
          </>,
          <>
            Fui responsável por manter os registros de campo através do diário de obra, além de acompanhar a
            execução em loco e prestar apoio à equipe técnica em diversas frentes operacionais.
          </>
        ],
        images: [],
      },
      {
        company: "Construtora Belmais",
        timeframe: "2022 - 2023",
        role: "Estagiária de Engenharia Civil",
        achievements: [
          <>
            Tive minha primeira imersão prática em obras civis, atuando diretamente no acompanhamento da execução e
            nos bastidores do planejamento de um empreendimento residencial de quatro torres de 20 pavimentos.
          </>,
          <>
            Participei da realização de medições, do controle de materiais recebidos e da conferência de serviços em campo,
            garantindo conformidade com o projeto e qualidade da execução
          </>,
          <>
            Fui responsável por atualizar projetos e documentos técnicos no canteiro, mantendo a equipe alinhada com as revisões e alterações executivas.
          </>
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Formação",
    institutions: [
      {
        name: "Univali",
        description: <>Bacharelado Engenharia Civil (2023 - 2025)</>,
      },
      {
        name: "Unip",
        description: <>Bacharelado Engenharia Civil (2026 - cursando)</>,
      }
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Habilidades Técnicas",
    skills: [
      {
        title: "AutoCAD",
        description: <>Desenvolvimento de plantas técnicas, detalhamentos e compatibilização de projetos.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Revit",
        description: <>Modelagem básica em BIM e organização de elementos construtivos.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "SketchUp e Kerkythea",
        description: <>Modelagem 3D e renderização de ambientes.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
            {
        title: "Mobuss e Sienge",
        description: <>Controle de obras, medições e atualizações de cronograma.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
            {
        title: "Photoshop",
        description: <>Edição de imagens, plantas humanizadas e pós-produção de renders.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
            {
        title: "Promob",
        description: <>Modelagem básica para mobiliário e interiores.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Projetos",
  title: `Projeto – ${person.name}`,
  description: `Projetos feitos por ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Galeria",
  title: `Galeria de Fotos – ${person.name}`,
  description: `Coleção de fotos por ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
