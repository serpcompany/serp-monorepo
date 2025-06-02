import { describe, expect, it } from 'vitest';
import CompanyCard from '../../components/CompanyCard.vue';
import ComponentRender from '../componentRender';
import '../mockUseUserSession';

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: true,
  },
};

describe('companyCard Snapshot', () => {
  it.each([
    [
      'renders non-featured company correctly (without auth)',
      {
        props: {
          company: {
            id: 1,
            slug: 'non-featured',
            name: 'Non Featured Co.',
            featured: false,
            oneLiner: 'Just a regular company.',
            serplyLink: 'https://nonfeatured.example.com',
            upvotes: [],
          },
        },
        config: {
          app: { baseURL: '/' },
          public: {
            useAuth: false,
          },
        },
      },
    ],
    [
      'renders featured company with complete details correctly (without auth)',
      {
        props: {
          company: {
            id: 2,
            slug: 'featured',
            name: 'Featured Co.',
            featured: true,
            oneLiner: 'A standout company.',
            excerpt: 'This company is truly awesome and innovative.',
            rating: 4.5,
            logo: 'https://featured.example.com/logo.png',
            screenshots: ['https://featured.example.com/screenshot.png'],
            features: [
              { id: 1, item: 'Innovation', description: 'Cutting edge tech.' },
              { id: 2, item: 'Quality', description: 'High quality products.' },
            ],
            serplyLink: 'https://featured.example.com',
            upvotes: ['user@example.com'],
          },
        },
        config: {
          app: { baseURL: '/' },
          public: {
            useAuth: false,
          },
        },
      },
    ],
    [
      'renders company with expanded content correctly (without auth)',
      {
        props: {
          company: {
            id: 3,
            slug: 'expanded',
            name: 'Expanded Co.',
            featured: true,
            oneLiner: 'Company with extra details.',
            excerpt: 'Expanded content goes here.',
            rating: 3.8,
            // No logo provided; should fall back to screenshot
            screenshots: ['https://expanded.example.com/screenshot.png'],
            features: [
              {
                id: 3,
                item: 'Flexibility',
                description: 'Adaptable solutions.',
              },
            ],
            serplyLink: 'https://expanded.example.com',
            upvotes: [],
          },
          showReadMore: true,
          showFeatures: true,
          showExpandedContent: true,
          baseSlug: 'products/',
        },
        config: {
          app: { baseURL: '/' },
          public: {
            useAuth: false,
          },
        },
      },
    ],
    [
      'renders non-featured company correctly (with auth)',
      {
        props: {
          company: {
            id: 1,
            slug: 'non-featured',
            name: 'Non Featured Co.',
            featured: false,
            oneLiner: 'Just a regular company.',
            serplyLink: 'https://nonfeatured.example.com',
            upvotes: [],
          },
        },
        config: {
          app: { baseURL: '/' },
          public: {
            useAuth: true,
          },
        },
      },
    ],
    [
      'renders featured company with complete details correctly (with auth)',
      {
        props: {
          company: {
            id: 2,
            slug: 'featured',
            name: 'Featured Co.',
            featured: true,
            oneLiner: 'A standout company.',
            excerpt: 'This company is truly awesome and innovative.',
            rating: 4.5,
            logo: 'https://featured.example.com/logo.png',
            screenshots: ['https://featured.example.com/screenshot.png'],
            features: [
              { id: 1, item: 'Innovation', description: 'Cutting edge tech.' },
              { id: 2, item: 'Quality', description: 'High quality products.' },
            ],
            serplyLink: 'https://featured.example.com',
            upvotes: ['user@example.com'],
          },
        },
        config: {
          app: { baseURL: '/' },
          public: {
            useAuth: true,
          },
        },
      },
    ],
    [
      'renders company with expanded content correctly (with auth)',
      {
        props: {
          company: {
            id: 3,
            slug: 'expanded',
            name: 'Expanded Co.',
            featured: true,
            oneLiner: 'Company with extra details.',
            excerpt: 'Expanded content goes here.',
            rating: 3.8,
            // No logo provided; should fall back to screenshot
            screenshots: ['https://expanded.example.com/screenshot.png'],
            features: [
              {
                id: 3,
                item: 'Flexibility',
                description: 'Adaptable solutions.',
              },
            ],
            serplyLink: 'https://expanded.example.com',
            upvotes: [],
          },
          showReadMore: true,
          showFeatures: true,
          showExpandedContent: true,
          baseSlug: 'products/',
        },
        config: {
          app: { baseURL: '/' },
          public: {
            useAuth: true,
          },
        },
      },
    ],
  ])(
    '%s',
    async (desc: string, options: { props: unknown; config?: unknown }) => {
      config_ = options.config;
      mockNuxtImport('useRuntimeConfig', () => () => config_);
      const html = await ComponentRender(
        `CompanyCard ${desc}`,
        options,
        CompanyCard,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
