import Image from "next/image";
import { JSX } from "react";
import React from "react";

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export type StrapiRichTextNode = {
  type:
    | "text"
    | "heading"
    | "paragraph"
    | "list"
    | "list-item"
    | "link"
    | "quote"
    | "code"
    | "image";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "unordered" | "ordered";
  text?: string;
  url?: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  image?: {
    alternativeText: string;
    url: string;
    width?: number;
    height?: number;
    // ...
  };
  children?: StrapiRichTextNode[];
};

export function resolveRichText(nodes: StrapiRichTextNode[]): JSX.Element {
  return (
    <>
      {nodes.map((node, index) => (
        <React.Fragment key={index}>{resolveRichTextNode(node)}</React.Fragment>
      ))}
    </>
  );
}

export function resolveRichTextNode(node: StrapiRichTextNode): JSX.Element {
  const children = node.children
    ? node.children.map((c, index) => (
        <React.Fragment key={index}>{resolveRichTextNode(c)}</React.Fragment>
      ))
    : [];

  switch (node.type) {
    case "heading":
      switch (node.level) {
        case 1:
          return <h1>{children}</h1>;
        case 2:
          return <h2>{children}</h2>;
        case 3:
          return <h3>{children}</h3>;
        case 4:
          return <h4>{children}</h4>;
        case 5:
          return <h5>{children}</h5>;
        case 6:
          return <h6>{children}</h6>;
        default:
          return <h1>{children}</h1>;
      }
    case "text":
      if (node.text) {
        let content: JSX.Element = (
          <>
            {node.text.split("\n").map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </>
        );

        // Apply formatting by wrapping the content
        if (node.bold) content = <b>{content}</b>;
        if (node.code) content = <code>{content}</code>;
        if (node.italic) content = <i>{content}</i>;
        if (node.strikethrough) content = <s>{content}</s>;
        if (node.underline) content = <u>{content}</u>;

        return content;
      }
      return <span></span>;
    case "paragraph":
      return <p>{children}</p>;
    case "link":
      return <a href={node.url}>{children}</a>;
    case "list":
      switch (node.format) {
        case "ordered":
          return <ol>{children}</ol>;
        case "unordered":
          return <ul>{children}</ul>;
        default:
          return <ul>{children}</ul>;
      }
    case "list-item":
      return <li>{children}</li>;
    case "quote":
      return <blockquote>{children}</blockquote>;
    case "code":
      return <pre>{children}</pre>;
    case "image":
      if (node.image) {
        return (
          <Image
            src={node.image.url}
            height={node.image.height}
            width={node.image.width}
            alt={node.image.alternativeText}
          />
        );
      }
      return <span></span>;
    default:
      return <span>{children}</span>;
  }
}
