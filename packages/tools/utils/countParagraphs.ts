export default function countParagraphs(str: string): number {
  const paragraphs = str.match(/(^|\n\n)[^\n]+/g) || [];
  return paragraphs.length;
}
