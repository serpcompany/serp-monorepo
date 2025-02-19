import { Category, RawCategory } from '@/types/category';
import { Pagination } from '@/types/pagination';

export type Post = {
    id: number;
    title: string;
    slug: string;
    content: string;
    categories: Category[];
}

export type RawPost = {
    id: number;
    title: string;
    slug: string;
    content: string;
    categories: RawCategory[];
}

export type PostIndex = {
    id: number;
    title: string;
    slug: string;
    categories: Category[];
}

export type RawPostIndex = {
    id: number;
    title: string;
    slug: string;
    categories: RawCategory[];
}

export type Posts = {
    posts: PostIndex[];
    pagination: Pagination;
}