import { Message } from "@/types";
import { FC } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const hljs = require('highlight.js');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';  
  }
});

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {  
  var result = DOMPurify.sanitize(md.render(message.content), {USE_PROFILES: {html: true}, });
  return (
    <div
      className={`flex justify-center px-[120px] py-[30px] whitespace-pre-wrap] ${message.role === "assistant" ? "dark:bg-[#434654] dark:text-neutral-100 bg-neutral-100 text-neutral-900 border border-neutral-300 dark:border-none" : "dark:bg-[#343541] dark:text-white text-neutral-900"}`}
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="w-[650px] flex">
        <div className="mr-4 font-bold min-w-[40px]">{message.role === "assistant" ? "AI:" : "You:"}</div>

        <div className="whitespace-pre-wrap">{parse(result)}</div>
      </div>
    </div>
  );
};
