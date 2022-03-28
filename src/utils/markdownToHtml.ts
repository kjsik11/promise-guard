import hljs from 'highlight.js';
import { marked } from 'marked';

export default function markdownToHtml(mdText: string) {
  marked.setOptions({
    gfm: true,
    breaks: true,
    highlight: (code, lang) =>
      lang
        ? hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
        : hljs.highlightAuto(code).value,
  });
  return marked(mdText);
}
