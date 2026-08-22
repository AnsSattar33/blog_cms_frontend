export type ExtractedFaq = {
  question: string;
  answer: string;
};

function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function isFaqSectionTitle(text: string): boolean {
  const normalized = text.replace(/[:\s]+$/g, "").toLowerCase();
  return normalized === "faq" || normalized === "frequently asked questions";
}

function isQuestionHeading(text: string): boolean {
  return text.includes("?");
}

export function extractFaqFromHtml(html: string): ExtractedFaq[] {
  if (!html) return [];

  const headingRegex = /<h[2-3][^>]*>([\s\S]*?)<\/h[2-3]>/gi;
  const headings: Array<{
    text: string;
    index: number;
    end: number;
  }> = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]);
    if (!text) continue;
    headings.push({
      text,
      index: match.index,
      end: match.index + match[0].length,
    });
  }

  const faqStart = headings.findIndex((heading) => isFaqSectionTitle(heading.text));
  if (faqStart === -1) return [];

  const faqs: ExtractedFaq[] = [];

  for (let i = faqStart + 1; i < headings.length; i += 1) {
    const heading = headings[i];
    if (!isQuestionHeading(heading.text)) break;

    const answerStart = heading.end;
    const answerEnd =
      i + 1 < headings.length ? headings[i + 1].index : html.length;
    const answer = stripHtml(html.slice(answerStart, answerEnd));
    if (!answer) continue;

    faqs.push({
      question: heading.text,
      answer,
    });
  }

  return faqs;
}
