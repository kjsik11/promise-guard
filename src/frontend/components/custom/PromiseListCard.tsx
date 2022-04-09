import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useState } from 'react';

import type { PromiseTypeBSON } from '@backend/model/promise';

import { Button } from '@frontend/components/ui';
import InputComponent from '@frontend/components/ui/Input';
import { useModal } from '@frontend/hooks/use-modal';
import { useNoti } from '@frontend/hooks/use-noti';
import { fetcher } from '@frontend/lib/fetcher';

interface Props {
  data: PromiseTypeBSON;
  refetch: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function PromiseListCard({ loading, setLoading, data, refetch }: Props) {
  const [tagInput, setTagInput] = useState('');
  const [tagRender, setTagRender] = useState<string[]>([]);
  const [tagInputs, setTagInputs] = useState<string[]>([]);
  const { showModal, closeModal } = useModal();

  const { showAlert, showNoti } = useNoti();

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 py-1 px-2">
      <div>
        <p className="font-semibold">
          {data.coreFlag && <span className="text-blue-400">*&nbsp;</span>}
          {data.title}
        </p>
        <div className="flex flex-wrap space-x-2">
          {data.categories.map((categories, idx) => (
            <span
              className="mt-1 shrink-0 rounded-md bg-red-500 p-1 text-sm text-white"
              key={`${categories}-${idx}`}
            >
              {categories}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap space-x-2">
          {(tagRender.length > 0 ? tagRender : data.tags).map((tags, idx) => (
            <span
              className="mt-1 shrink-0 rounded-md bg-sky-500 p-1 text-sm text-white"
              key={`${tags}-${idx}`}
            >
              {tags}
            </span>
          ))}
        </div>
      </div>
      <div className="">
        <form className="flex items-end">
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
              setTagInputs((prev) => [...prev, tagInput]);
              setTagInput('');
            }}
          >
            태그 추가
          </Button>
          <Button
            disabled={!tagInputs.length || loading}
            className="ml-4"
            onClick={async () => {
              setLoading(true);
              await fetcher
                .patch(`/api/promise/${data._id}`, {
                  json: { tags: tagInputs },
                })
                .then(() => {
                  showNoti({ title: '성공' });
                  setTagRender(tagInputs);
                  setTagInputs([]);
                  setLoading(false);
                })
                .catch(showAlert);
            }}
          >
            저장
          </Button>
        </form>
        <div>
          {tagInputs.length !== 0 && (
            <div className="mt-2 flex flex-wrap space-x-4">
              {tagInputs.map((val, idx) => (
                <button
                  onClick={() => {
                    setTagInputs((prev) => prev.filter((tagItem) => tagItem !== val));
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
        </div>
      </div>

      <div className="flex w-72 shrink-0 justify-end space-x-2">
        <Link href={`/upload-promise/upload?id=${data._id}`} passHref>
          <Button disabled={loading} size="sm">
            수정하기
          </Button>
        </Link>
        <Button
          disabled={loading}
          onClick={() =>
            showModal({
              variant: 'alert',
              title: '진짜 삭제?',
              content: 'ㄹㅇ?',
              actionButton: {
                label: '네',
                onClick: async () => {
                  setLoading(true);
                  await fetcher
                    .delete(`/api/promise/${data._id}`)
                    .then(refetch)
                    .catch(showAlert)
                    .finally(() => setLoading(false));
                  closeModal();
                },
              },
              cancelButton: { label: '아니요', onClick: () => closeModal() },
            })
          }
          color="red"
          size="sm"
        >
          삭제하기
        </Button>
        <Button
          onClick={async () => {
            setLoading(true);
            await fetcher
              .post(`/api/promise/${data._id}`)
              .then(refetch)
              .catch(showAlert)
              .finally(() => setLoading(false));
          }}
          disabled={loading}
          color="white"
          size="sm"
        >
          복사하기
        </Button>
      </div>
    </div>
  );
}
