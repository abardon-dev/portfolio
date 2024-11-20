import Image, { ImageProps } from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { PropsWithChildren, ReactElement } from "react";
import { cn } from "@/utils/cn";
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileCode2, Link2 } from "lucide-react";
import { CopyCodeButton } from "./copy-code-button";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

function RoundedImage({ alt, ...props }: ImageProps) {
  return <Image className="rounded-lg" alt={alt} {...props} />;
}

function HeadingLink({ anchor, children }: PropsWithChildren<{ anchor: string }>) {
  return (
    <a className="group flex items-center gap-2" href={`#${anchor}`}>
      {children}
      <Link2 className="invisible size-4 group-hover:visible" />
    </a>
  );
}

const components: MDXRemoteProps["components"] = {
  h1: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchor = slugify(children || "");
    return (
      <h1 id={anchor} className={cn("mt-2 scroll-m-20 font-sans text-4xl font-bold", className)} {...props}>
        <HeadingLink anchor={anchor}>{children}</HeadingLink>
      </h1>
    );
  },
  h2: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchor = slugify(children || "");
    return (
      <h2
        id={anchor}
        className={cn("mt-12 scroll-m-20 pb-2 font-sans text-2xl font-semibold tracking-tight first:mt-0", className)}
        {...props}
      >
        <HeadingLink anchor={anchor}>{children}</HeadingLink>
      </h2>
    );
  },
  h3: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchor = slugify(children || "");
    return (
      <h3
        id={anchor}
        className={cn("mt-8 scroll-m-20 font-sans text-xl font-semibold tracking-tight", className)}
        {...props}
      >
        <HeadingLink anchor={anchor}>{children}</HeadingLink>
      </h3>
    );
  },
  h4: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchor = slugify(children || "");
    return (
      <h4
        id={anchor}
        className={cn("mt-8 scroll-m-20 font-sans text-lg font-semibold tracking-tight", className)}
        {...props}
      >
        <HeadingLink anchor={anchor}>{children}</HeadingLink>
      </h4>
    );
  },
  h5: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchor = slugify(children || "");
    return (
      <h5
        id={anchor}
        className={cn("mt-8 scroll-m-20 font-sans text-lg font-semibold tracking-tight", className)}
        {...props}
      >
        <HeadingLink anchor={anchor}>{children}</HeadingLink>
      </h5>
    );
  },
  h6: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchor = slugify(children || "");
    return (
      <h6
        id={anchor}
        className={cn("mt-8 scroll-m-20 font-sans text-base font-semibold tracking-tight", className)}
        {...props}
      >
        <HeadingLink anchor={anchor}>{children}</HeadingLink>
      </h6>
    );
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-3", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("list my-3 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-3 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-1", className)} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("relative w-full overflow-hidden border-none text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("last:border-b-none m-0 border-b", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn("px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className={cn("mt-3 border-l-2 border-primary py-0.5 pl-6", className)} {...props} />
  ),
  pre: ({
    className,
    children,
    filename,
    lines,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & { filename?: string; lines?: string }) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    const codeContent = children.props.children.toString();

    return (
      <pre className={cn("relative mb-4 mt-6 rounded-sm bg-[#011627] p-1 text-sm", className)} {...props}>
        {filename ? (
          <>
            <div className="flex items-center gap-2 px-3 py-2">
              {filename && (
                <>
                  <FileCode2 className="h-4 w-4 text-primary-foreground" />
                  <span className="font-sans text-xs text-primary-foreground">{filename}</span>
                </>
              )}
              <CopyCodeButton className="ml-auto" rawValue={codeContent} />
            </div>
            <hr className="h-[1px] w-full border-primary-foreground/30" />
          </>
        ) : (
          <CopyCodeButton className="absolute right-4 top-4" rawValue={codeContent} />
        )}

        {React.cloneElement(children as ReactElement, { highlightLines: extractCodeLinesToHighlight(lines) })}
      </pre>
    );
  },
  code({
    className,
    children,
    highlightLines = [],
    ...props
  }: React.HTMLAttributes<HTMLElement> & SyntaxHighlighterProps & { highlightLines?: number[] }) {
    const match = /language-(\w+)/.exec(className || "");

    if (!children) {
      return null;
    }

    return match ? (
      <SyntaxHighlighter
        style={nightOwl}
        PreTag={"div"}
        language={match[1]}
        /** Workaround to make lineNumber callback param of lineProps returns a number instead false (https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/288) */
        showLineNumbers={true}
        lineNumberStyle={{ display: "none" }}
        wrapLines
        lineProps={(lineNumber) => ({
          style: {
            display: "block",
            backgroundColor: highlightLines.includes(lineNumber) ? "hsl(206, 94%, 12%)" : ""
          }
        })}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    ) : (
      <code
        className={cn(
          "relative rounded-sm bg-muted px-[0.4rem] py-[0.2rem] font-sans text-base font-medium text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  Image: RoundedImage
};

//TODO: Handle responsiveness
export async function CustomMDX(props: MDXRemoteProps) {
  return (
    <article className="text-justify">
      <MDXRemote
        {...props}
        components={{ ...components, ...props.components }}
        options={{ mdxOptions: { rehypePlugins: [rehypeMdxCodeProps] } }}
      />
    </article>
  );
}

/* ----------- Utils ----------- */
export type ToC = {
  level: number;
  title: string;
  anchor: string;
}[];

export const extractToc = (markdownContent: string): ToC => {
  const regexReplaceCode = /(```.+?```)/gms;
  const regexRemoveLinks = /\[(.*?)\]\(.*?\)/g;

  const markdownWithoutLinks = markdownContent.replace(regexRemoveLinks, "");
  const markdownWithoutCodeBlocks = markdownWithoutLinks.replace(regexReplaceCode, "");

  const regXHeader = /#{1,6}.+/g;
  const titles = markdownWithoutCodeBlocks.match(regXHeader);

  return (
    titles?.map((tempTitle: string) => {
      const level = tempTitle.match(/#/g).length - 1;
      const title = tempTitle.replace(/#/g, "").trim();

      return { level, title, anchor: `#${slugify(title)}` };
    }) ?? []
  );
};

function slugify(str: React.ReactNode) {
  const slug = (str: string) =>
    str
      .toString()
      .toLowerCase()
      .trim() // Remove whitespace from both ends of a string
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/`/g, "") // Replace backticks with empty characters
      .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
      .replace(/--+/g, "-"); // Replace multiple - with single -

  if (typeof str === "string") {
    return slug(str);
  }

  /**Handle react node inside the heading */
  if (Array.isArray(str) && str.length !== 0) {
    return slug(
      str
        .map((item) => {
          if (typeof item === "object" && typeof item.props.children === "string") {
            return item.props.children;
          } else if (item === "object") {
            return "";
          }
          return item;
        })
        .toString()
    );
  }

  return "";
}

/**
 * Extract an array of line numbers to highlight based on the lines string got from the block code metadata inside themarkdown file
 *
 * @param lines string lines go from the markdown files (Ex: {1, 3-5, 8})
 * @returns array of line numbers to highlight in the code block
 */
const extractCodeLinesToHighlight = (lines?: string) => {
  if (!lines || !lines.match(/^\{(\d+(-\d+)?)(,\s?\d+(-\d+)?)*\}$/)) {
    return [];
  }

  const linesWithoutBrackets = lines.replace(/[[\](){}]/g, "");

  const highlightLines: number[] = [];

  for (const lineRange of linesWithoutBrackets.trim().split(",")) {
    const lineNumbers = lineRange.split("-");
    const startLine = parseInt(lineNumbers[0]);
    const endLine = lineNumbers.length === 2 ? parseInt(lineNumbers[1]) : startLine;

    for (let i = startLine; i <= endLine; i++) {
      highlightLines.push(i);
    }
  }

  return highlightLines;
};
