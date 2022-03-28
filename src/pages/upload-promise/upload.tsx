import 'react-mde/lib/styles/css/react-mde-all.css';

import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ReactMde from 'react-mde';

import s from '@assets/markdown.module.css';

import { initialPromise, PromiseType } from '@backend/model/promise';

import { Button } from '@frontend/components/ui';
import InputComponent from '@frontend/components/ui/Input';
import { useNoti } from '@frontend/hooks/use-noti';
import getPromise from '@frontend/lib/promise/get-promise';
import updatePromise from '@frontend/lib/promise/update-promise';
import uploadPromise from '@frontend/lib/promise/upload';
import { uploadMarkdownImage } from '@frontend/lib/upload-markdown-image';

import markdownToHtml from '@utils/markdownToHtml';

export default function UploadPromise() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const [promiseInput, setPromiseInput] = useState<PromiseType>(initialPromise);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const { showNoti, showAlert } = useNoti();

  useEffect(() => {
    const id = router.query['id'];

    if (id && typeof id === 'string') getPromise(id).then(setPromiseInput).catch(showAlert);
  }, [router, showAlert]);

  const save = async function* (data: ArrayBuffer) {
    yield await uploadMarkdownImage(new File([new Blob([data])], String(Number(new Date()))));

    return true;
  };

  const handleSubmit = useCallback(() => {
    setLoading(true);

    const id = router.query['id'];

    if (id && typeof id === 'string') {
      updatePromise(id, promiseInput)
        .then(() => {
          showNoti({ title: '수정 성공' });
          router.push('/upload-promise');
        })
        .catch(showAlert)
        .finally(() => setLoading(false));
    } else {
      uploadPromise(promiseInput)
        .then(() => {
          showNoti({ title: '업로드 성공' });
          router.push('/upload-promise');
        })
        .catch(showAlert)
        .finally(() => setLoading(false));
    }
  }, [showAlert, showNoti, router, promiseInput]);

  return (
    <div className={clsx(s.root, 'p-4')}>
      <p className="text-4xl font-bold">공약 {router.query.id ? '수정' : '업로드'}</p>
      <InputComponent
        className="py-4"
        placeholder="title"
        label="title"
        value={promiseInput.title}
        maxLength={50}
        onChange={(e) =>
          setPromiseInput((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <p className="-mt-4 mb-4 text-xs">{promiseInput.title.length}/50</p>
      <ReactMde
        initialEditorHeight={400}
        maxEditorHeight={400}
        minEditorHeight={400}
        minPreviewHeight={400}
        value={promiseInput.body}
        onChange={(t) => setPromiseInput((prev) => ({ ...prev, body: t }))}
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
      <form className="mt-8 flex items-end">
        <InputComponent
          maxLength={20}
          inputClassName="flex-1"
          label="검색 태그 (20글자 제한, 최대 20개)"
          placeholder="지역공약, 서울, 여성 등"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
          }}
        />
        <Button
          type="submit"
          className="ml-4"
          color="white"
          disabled={!tagInput}
          onClick={() => {
            tagInput.split(',').map((tagItem, _, tagArray) => {
              if (tagItem.replace(' ', '').length > 20) {
                showNoti({
                  title: '태그는 최대 20글자까지 입력 가능합니다',
                  variant: 'alert',
                });
              } else if (promiseInput.tag.length + tagArray.length > 20) {
                showNoti({
                  title: '태그는 최대 20개까지 추가 가능합니다.',
                  variant: 'alert',
                });
              } else if (promiseInput.tag.includes(tagItem.replace(' ', ''))) {
                showNoti({
                  title: '이미 등록되어있는 태그입니다.',
                  variant: 'alert',
                });
                setTagInput('');
              } else {
                setPromiseInput((prev) => ({
                  ...prev,
                  tag: [...prev.tag, tagItem.replace(' ', '')],
                }));
                setTagInput('');
              }
            });
          }}
        >
          태그 추가
        </Button>
      </form>
      {promiseInput.tag.length !== 0 && (
        <div className="mt-2 flex flex-wrap space-x-4">
          {promiseInput.tag.map((val, idx) => (
            <button
              onClick={() => {
                setPromiseInput((prev) => ({
                  ...prev,
                  tag: prev.tag.filter((tagItem) => tagItem !== val),
                }));
              }}
              className="my-1 flex items-center gap-2 rounded bg-gray-200 px-2 py-1 text-sm leading-none text-gray-600 shadow-sm hover:opacity-80"
              key={`${val}-${idx}`}
            >
              <p>#{val}</p>
              <XIcon className="h-4 w-4" />
            </button>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Button disabled={loading} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
