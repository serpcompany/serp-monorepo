import { d as e, g as t, c as i } from '../../../nitro/nitro.mjs';
import { f as r } from '../../../_/chunk-KRMY7ATX.mjs';
import 'node:buffer';
import 'node:process';
import 'node:events';
import 'node:net';
import 'node:timers';
import 'node:assert';
import 'node:util';
import 'node:url';
import 'node:stream';
import 'node:crypto';
import 'node:dns';
import 'node:string_decoder';
const n = Array.from({ length: 500 }, () => {
    const e = r.company.name();
    return {
      id: r.number.int(),
      name: e,
      slug: r.helpers.slugify(e),
      screenshots: Array.from({ length: 3 }, () => r.image.urlLoremFlickr()),
      oneLiner: r.lorem.words(13),
      excerpt: r.lorem.sentences(12),
      rating: parseFloat(r.number.float({ min: 1, max: 5 }).toFixed(1)),
      upvotes: r.number.int({ min: 0, max: 1e3 }),
      downvotes: r.number.int({ min: 0, max: 1e3 }),
      logo: 'https://imagedelivery.net/lnCkkCGRx34u0qGwzZrUBQ/f364fd53-6e3b-4156-1c32-2d1540384f00/width=200,height=200,fit=pad',
      serplyLink: r.internet.url(),
      categories: Array.from({ length: 10 }, () => ({
        id: r.number.int(),
        name: r.commerce.department(),
        slug: r.helpers.slugify(r.commerce.department())
      }))
    };
  }).sort((e, t) => e.name.localeCompare(t.name)),
  s = e(async (e) => {
    const { page: s = 1, limit: o = 100, categorySlug: a = '' } = t(e),
      m = Number(s),
      p = Math.min(Number(o), 100);
    if (isNaN(m) || m < 1 || !Number.isInteger(m))
      throw i({ statusCode: 400, message: 'Page must be a positive integer' });
    if (isNaN(p) || p < 1 || !Number.isInteger(p))
      throw i({ statusCode: 400, message: 'Limit must be a positive integer' });
    const l = (m - 1) * p,
      c = n.slice(l, l + p),
      d = { currentPage: m, pageSize: p, totalItems: 500 },
      u = r.lorem.words(2);
    return {
      companies: c,
      pagination: d,
      categoryName: a ? u : null,
      categoryArticle: a
        ? '\n  <h2>Buyers Guide: How to Choose & Email Marketing Software</h2>\n  <p>Understanding different company categories is crucial for business planning and market analysis.</p>\n\n  <h3>Types of Business Structures</h3>\n  <p>Companies can be classified into various structures, from sole proprietorships to corporations, each with distinct legal and financial implications. Choosing the right structure impacts taxation, liability, and operational flexibility.</p>\n\n  <h3>Industry Classifications</h3>\n  <p>Standard industrial classification systems help categorize companies by their primary business activities. These classifications are essential for market research, regulatory compliance, and competitive analysis.</p>\n\n  <h3>Size Categories</h3>\n  <p>Organizations are often grouped by size metrics such as revenue, employee count, or market capitalization. Small and medium enterprises (SMEs) operate differently from large corporations and multinationals.</p>\n\n  <h3>Market Positioning</h3>\n  <p>Companies position themselves in different market segments, from budget-friendly to premium offerings. Understanding market positioning helps identify competitors and target customer segments effectively.</p>\n\n  <h3>Ownership Models</h3>\n  <p>Business ownership structures range from private companies to publicly traded corporations. Each model has specific requirements for governance, reporting, and stakeholder management.</p>\n  '
        : null
    };
  });
export { s as default };
//# sourceMappingURL=index2.mjs.map
