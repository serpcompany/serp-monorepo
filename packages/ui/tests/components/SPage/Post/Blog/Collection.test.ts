/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPagePostBlogCollection from '../../../../../components/SPage/Post/Blog/Collection.vue';
import ComponentRender from '../../../../componentRender';
import '../../../../mockUseUserSession';

mockNuxtImport('useHead', () => () => {});
mockNuxtImport('useSeoMeta', () => () => {});

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false
  }
};

describe('SPagePostBlogCollection Snapshot', () => {
  const defaultPostsData = {
    posts: [
      { id: 1, title: 'Post One', slug: 'post-one' },
      {
        id: 2,
        title: 'Post Two',
        slug: 'post-two',
        oneLiner: 'Test one-liner',
        excerpt: 'Test excerpt'
      }
    ],
    pagination: {
      totalItems: 100
    }
  };
  const defaultCategories = [
    { id: 1, slug: 'tech', name: 'Tech' },
    { id: 2, slug: 'lifestyle', name: 'Lifestyle' }
  ];

  const scenarios: [
    string,
    { config: Record<string, unknown>; postsData: unknown; categories: unknown }
  ][] = [
    [
      'with posts and categories (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postsData: defaultPostsData,
        categories: defaultCategories
      }
    ],
    [
      'with posts but no categories (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postsData: defaultPostsData,
        categories: []
      }
    ],
    [
      'with posts and categories (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postsData: defaultPostsData,
        categories: defaultCategories
      }
    ],
    [
      'with posts but no categories (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postsData: defaultPostsData,
        categories: []
      }
    ]
  ];
  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { config, postsData, categories }) => {
      config_ = config;
      mockNuxtImport('useRuntimeConfig', () => () => config_);
      globalThis.usePosts = async (page: number, limit: number) => postsData;
      globalThis.usePostCategories = async () => categories;

      const html = await ComponentRender(
        `SPagePostBlogCollection ${desc}`,
        {},
        SPagePostBlogCollection
      );
      expect(html).toMatchSnapshot();
    }
  );
});
