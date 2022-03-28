import Link from 'next/link';

import type { PromiseTypeBSON } from '@backend/model/promise';

import { Button } from '@frontend/components/ui';
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
  const { showModal, closeModal } = useModal();

  const { showAlert } = useNoti();

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 py-1 px-2">
      <p className="text-lg font-semibold">Title: {data.title}</p>
      <div className="mt-2">
        {/* {data.tag.map((tag, idx) => (
          <span className="rounded-md bg-sky-500 px-2 py-1 text-white" key={`${tag}-${idx}`}>
            {tag}
          </span>
        ))} */}
      </div>
      <div className="flex w-80 justify-end space-x-2">
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
      </div>
    </div>
  );
}
