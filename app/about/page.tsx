import { Timeline } from "@/components/ui/timeline";

const data = [
  {
    title: "Lead Developer Front - Betterfly Tourism",
    description: "March 2024 - Present",
    img: { src: "/img/betterfly-logo.png", alt: "Betterfly logo" },
    content: null
  },
  {
    title: "Fullstack Developer (Lead front) - Infotel",
    description: "March 2023 - March 2024",
    img: { src: "/img/infotel-logo.jpg", alt: "Infotel logo" },
    content: null
  },
  {
    title: "DevOps / Java Developer - Sopra Banking Software",
    description: "Octobre 2023 - March 2024",
    img: { src: "/img/sbs-logo.png", alt: "Sopra Banking Software logo" },
    content: null
  },
  {
    title: "Intership/Work-study Fullstack Developer - Infotel",
    description: "May 2022 - September 2023",
    img: { src: "/img/infotel-logo.jpg", alt: "Infotel logo" },
    content: null
  },
  {
    title: "Engineering Degree - Polytech Angers",
    description: "September 2017 - September 2022",
    img: { src: "/img/polytech-logo.png", alt: "Polytech logo" },
    content: null
  }
];

export default function About() {
  return <Timeline data={data} />;
}
