/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPagePostSingle from '../../../../components/SPage/Post/Single.vue';
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

describe('SPagePostSingle Snapshot', () => {
  const defaultPostData = {
    id: 2,
    title: 'Post Two',
    module: '',
    slug: 'post-two',
    keyword: 'Two',
    oneLiner: 'Test one-liner',
    excerpt: 'Test excerpt',
    categories: [{ id: 1, slug: 'tech', name: 'Tech' }],
    content: '<p>Test content</p>'
  };
  const scenarios: [
    string,
    { config: Record<string, unknown>; postData: unknown }
  ][] = [
    [
      'with basic post data (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postData: defaultPostData
      }
    ],
    [
      'with blog module (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postData: { ...defaultPostData, module: 'blog' }
      }
    ],
    [
      'with glossary module (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postData: { ...defaultPostData, module: 'Glossary' }
      }
    ],
    [
      'with movies module (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        postData: { ...defaultPostData, module: 'movies' }
      }
    ],
    [
      'with basic post data (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postData: defaultPostData
      }
    ],
    [
      'with blog module (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postData: { ...defaultPostData, module: 'blog' }
      }
    ],
    [
      'with glossary module (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postData: { ...defaultPostData, module: 'Glossary' }
      }
    ],
    [
      'with movies module (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        postData: { ...defaultPostData, module: 'movies' }
      }
    ]
  ];
  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { config, postData }) => {
      config_ = config;
      mockNuxtImport('useRuntimeConfig', () => () => config_);
      globalThis.usePost = async (slug: string) => postData;

      const html = await ComponentRender(
        `SPagePostSingle ${desc}`,
        {},
        SPagePostSingle
      );
      expect(html).toMatchSnapshot();
    }
  );
});
