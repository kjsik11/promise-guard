import 'react-mde/lib/styles/css/react-mde-all.css';

import clsx from 'clsx';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

import s from '@assets/markdown.module.css';

import { uploadMarkdownImage } from '@frontend/lib/upload-markdown-image';

import markdownToHtml from '@utils/markdownToHtml';

export default function TestPage() {
  const [mdText, setMdText] = useState('');
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const save = async function* (data: ArrayBuffer) {
    yield await uploadMarkdownImage(new File([new Blob([data])], String(Number(new Date()))));

    return true;
  };

  return (
    <div className={clsx(s.root, 'mt-20 p-4')}>
      <ReactMarkdown className="markdown-container border-gray-1 my-10 min-h-[400px] rounded-sm border p-4">
        {mdText}
      </ReactMarkdown>
      <ReactMde
        initialEditorHeight={600}
        value={mdText}
        onChange={setMdText}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(markdownToHtml(markdown))}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{
          saveImage: save,
        }}
      />
    </div>
  );
}
