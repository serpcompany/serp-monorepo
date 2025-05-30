export type Category = {
  id?: number;
  name: string;
  slug: string;
  data?: {
    faqs?: Array<{ answer: string; question: string }>;
    buyers_guide?: string;
  };
  buyersGuide?: string;
  faqs?: string;
  description?: string;
  icon?: string;
  module?: string;
};
