import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';

import { useNoti } from '@frontend/hooks/use-noti';
import { fetcher } from '@frontend/lib/fetcher';

export default function WithdrawalModal({
  show,
  close,
  mutate,
}: {
  mutate: () => void;
  show: boolean;
  close: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const { showNoti, showAlert } = useNoti();

  const handleWithDrawal = useCallback(() => {
    setLoading(true);
    fetcher
      .delete('/api/user/withdrawal')
      .then(() => {
        showNoti({ title: '회원 탈퇴가 완료되었습니다.' });
        mutate();
        close();
      })
      .catch(showAlert)
      .finally(() => setLoading(false));
  }, [close, mutate, showAlert, showNoti]);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10"
        initialFocus={cancelButtonRef}
        open={show}
        onClose={close}
      >
        <div className="flex min-h-screen items-center justify-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#111827] bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="absolute inset-x-0 w-full transition-all">
              <div className="mx-auto max-w-sm rounded-lg bg-white px-4 py-5">
                <div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold leading-7 text-gray-900" id="modal-headline">
                      회원 탈퇴
                    </h3>
                    <div className="mt-4">
                      <p>
                        모든 활동, 투표내역이 삭제됩니다.
                        <br /> 정말 탈퇴하시겠습니까?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    disabled={loading}
                    onClick={handleWithDrawal}
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-600 py-2.5 px-4 text-white"
                  >
                    <p className="font-semibold">회원탈퇴</p>
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={close}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
