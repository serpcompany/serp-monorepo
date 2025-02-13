export type FooterColumnItem = {
  text: string;
  slug: string;
};

export type FooterColumn = {
  title: string;
  id: number;
  slug: string;
  items: FooterColumnItem[];
};
