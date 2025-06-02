export interface FooterColumnItem {
  text: string
  slug: string
}

export interface FooterColumn {
  title: string
  slug: string
  items: FooterColumnItem[]
}
