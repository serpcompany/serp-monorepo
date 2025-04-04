/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPagePostCategoryCollection from '../../../../components/SPage/Post/CategoryCollection.vue';
import ComponentRender from '../../../componentRender';
import '../../../mockUseUserSession';

mockNuxtImport('useHead', () => () => {});
mockNuxtImport('useSeoMeta', () => () => {});

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false
  }
};

describe('SPagePostCategoryCollection Snapshot', () => {
  const defaultPostsData = {
    posts: [
      {
        id: 1,
        title: 'Post One',
        slug: 'post-one',
        keyword: 'One',
        categories: [{ id: 1, slug: 'tech', name: 'Tech' }]
      },
      {
        id: 2,
        title: 'Post Two',
        slug: 'post-two',
        keyword: 'Two',
        oneLiner: 'Test one-liner',
        excerpt: 'Test excerpt',
        categories: [{ id: 1, slug: 'tech', name: 'Tech' }]
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
      'with no posts (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postsData: [],
        categories: defaultCategories
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
      'with no posts (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postsData: [],
        categories: defaultCategories
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
        `SPagePostCategoryCollection ${desc}`,
        {},
        SPagePostCategoryCollection
      );
      expect(html).toMatchSnapshot();
    }
  );
});
