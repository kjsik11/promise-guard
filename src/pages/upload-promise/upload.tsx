import 'react-mde/lib/styles/css/react-mde-all.css';

import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ReactMde from 'react-mde';

import { initialPromise, PromiseType } from '@backend/model/promise';

import Loading from '@frontend/components/core/Loading';
import AdminLayout from '@frontend/components/layout/Admin';
import { Button } from '@frontend/components/ui';
import InputComponent from '@frontend/components/ui/Input';
import useAdmin from '@frontend/hooks/use-admin';
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
  const [categoryInput, setCategoryInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const { adminFlag } = useAdmin();

  const { showNoti, showAlert } = useNoti();

  useEffect(() => {
    if (!adminFlag) return;
    const id = router.query['id'];

    if (id && typeof id === 'string') {
      setPageLoading(true);
      getPromise(id)
        .then(setPromiseInput)
        .catch(showAlert)
        .finally(() => setPageLoading(false));
    }
  }, [router, showAlert, adminFlag]);

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

  if (pageLoading) return <Loading />;

  return (
    <div className="p-4">
      <p className="text-4xl font-bold">공약 {router.query.id ? '수정' : '업로드'}</p>
      <div className="-mb-4 flex items-center space-x-4 pt-4">
        <p>핵심공약인가요? </p>
        <input
          checked={promiseInput.coreFlag}
          onChange={() => {
            setPromiseInput((prev) => ({ ...prev, coreFlag: !prev.coreFlag }));
          }}
          type="checkbox"
        />
      </div>
      <InputComponent
        inputClassName="w-full"
        autofocus
        className="flex-1 py-4"
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
      <div className="prose prose-lg w-full">
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
      </div>
      <form className="mt-8 flex items-end">
        <InputComponent
          maxLength={30}
          inputClassName="flex-1 w-80"
          label="검색 카테고리 (30글자 제한, 최대 20개)"
          placeholder="지역공약, 서울, 여성 등"
          value={categoryInput}
          onChange={(e) => {
            setCategoryInput(e.target.value);
          }}
        />

        <Button
          type="submit"
          className="ml-4"
          color="white"
          disabled={!categoryInput}
          onClick={(e: any) => {
            e.preventDefault();
            setPromiseInput((prev) => ({
              ...prev,
              categories: [...prev.categories, categoryInput],
            }));
            setTagInput('');
          }}
        >
          카테고리 추가
        </Button>
      </form>
      {promiseInput.categories.length !== 0 && (
        <div className="mt-2 flex flex-wrap space-x-4">
          {promiseInput.categories.map((val, idx) => (
            <button
              onClick={() => {
                setPromiseInput((prev) => ({
                  ...prev,
                  categories: prev.categories.filter((categoryItem) => categoryItem !== val),
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

      <form className="mt-8 flex items-end">
        <InputComponent
          maxLength={30}
          inputClassName="flex-1 w-80"
          label="검색 태그 (30글자 제한, 최대 20개)"
          placeholder="긴 태그들..."
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
          onClick={(e: any) => {
            e.preventDefault();
            setPromiseInput((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
            setTagInput('');
          }}
        >
          태그 추가
        </Button>
      </form>
      {promiseInput.tags.length !== 0 && (
        <div className="mt-2 flex flex-wrap space-x-4">
          {promiseInput.tags.map((val, idx) => (
            <button
              onClick={() => {
                setPromiseInput((prev) => ({
                  ...prev,
                  tags: prev.tags.filter((tagItem) => tagItem !== val),
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

UploadPromise.Layout = AdminLayout;
