import { StrapiRichTextNode } from "@/consts/util";

export interface Project {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    locale: string;
    content: StrapiRichTextNode[];
    cover: any;
}

export const STRAPI_URL = "http://localhost:1337"