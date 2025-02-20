import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, within } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';

import CompanyArticleSection from '@/components/CompanyArticleSection.vue';

describe('CompanyArticleSection', () => {
  it('should render an article with the provided content', async () => {
    const mockArticleContent =
      '<h2 id="article-title">This is my stupid ass Sample Article</h2><p>This is a paragraph.</p>';

    await renderSuspended(CompanyArticleSection, {
      props: {
        article: mockArticleContent
      }
    });
    const article = screen.getByRole('article');
    expect(article).toHaveTextContent('This is my stupid ass Sample Article');
  });

  it('should not render the article if no content is provided', async () => {
    await renderSuspended(CompanyArticleSection, {
      props: {
        article: ''
      }
    });

    const article = screen.queryByRole('article');
    expect(article).not.toBeInTheDocument();
  });
});
