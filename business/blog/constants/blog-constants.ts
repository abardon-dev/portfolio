export const READ_TIMES: number[] = [3, 5, 10, 15];

export const SORT_ORDER = ["ASC", "DESC"] as const;
export type SortOrder = (typeof SORT_ORDER)[number];

/** TMP */
export type TBlogArticleResume = {
  title: string;
  resume: string;
  readTime: number; //in minutes
  categories: string[];
  date: Date;
};

export const blogArticlesResume: TBlogArticleResume[] = [
  {
    title: "Understanding React Hooks",
    resume: "An in-depth guide to mastering React Hooks for efficient state management.",
    readTime: 7,
    categories: ["react", "javascript"],
    date: new Date("2022-02-15")
  },
  {
    title: "Next.js: Static vs Server-Side Rendering",
    resume: "Learn the difference between static generation and server-side rendering in Next.js.",
    readTime: 6,
    categories: ["next.js", "react"],
    date: new Date("2022-02-20")
  },
  {
    title: "Getting Started with Tailwind CSS",
    resume: "A beginner's guide to building fast and responsive websites with Tailwind CSS.",
    readTime: 5,
    categories: ["css", "tailwind"],
    date: new Date("2022-04-08")
  },
  {
    title: "Advanced Form Handling in React with React Hook Form",
    resume: "Best practices for managing complex forms in React using React Hook Form.",
    readTime: 8,
    categories: ["react", "forms"],
    date: new Date("2022-05-01")
  },
  {
    title: "Optimizing Performance in Next.js Applications",
    resume: "Explore techniques to boost the performance of your Next.js app.",
    readTime: 6,
    categories: ["next.js", "performance"],
    date: new Date("2022-06-12")
  },
  {
    title: "Shadcn UI Components: A Comprehensive Guide",
    resume: "Learn how to build stunning UIs using Shadcn with React.",
    readTime: 7,
    categories: ["ui", "shadcn", "react"],
    date: new Date("2022-07-25")
  },
  {
    title: "Using ESLint and Prettier for Cleaner Code",
    resume: "Set up ESLint and Prettier to ensure consistent code style in your JavaScript projects.",
    readTime: 5,
    categories: ["eslint", "prettier", "javascript"],
    date: new Date("2022-08-30")
  },
  {
    title: "Building a Carousel with Embla and React",
    resume: "Step-by-step guide to creating a responsive carousel using Embla with React.",
    readTime: 6,
    categories: ["react", "carousel", "embla"],
    date: new Date("2022-09-15")
  },
  {
    title: "TypeScript Basics for React Developers",
    resume: "An introduction to TypeScript for developers looking to improve their React projects.",
    readTime: 7,
    categories: ["typescript", "react"],
    date: new Date("2022-10-05")
  },
  {
    title: "Deploying Next.js Applications with Vercel",
    resume: "A detailed guide to deploying your Next.js apps seamlessly on Vercel.",
    readTime: 5,
    categories: ["next.js", "deployment"],
    date: new Date("2022-11-20")
  }
];
