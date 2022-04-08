import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';

export default function LoginModal({
  show,
  close,
  action,
}: {
  show: boolean;
  close: () => void;
  action: () => void;
}) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

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
                      카카오로 로그인
                    </h3>
                    <div className="mt-4">
                      <p>
                        오월십일에서는 무분별한 중복 투표를 방지하기 위해
                        <br /> 카카오 인증을 받고 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={action}
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-Kakao py-2.5 px-4"
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 3.14355C6.9772 3.14355 2.5 6.65955 2.5 10.9968C2.5 14.2002 4.08 15.729 6.2444 17.123L6.2544 17.1268L5.8377 21.6649C5.84447 21.7085 5.86225 21.7497 5.88934 21.7845C5.91644 21.8194 5.95197 21.8468 5.99258 21.8641C6.03319 21.8814 6.07755 21.8881 6.12146 21.8836C6.16538 21.879 6.20741 21.8634 6.2436 21.8381L11.0507 18.7881L11.1594 18.8009C11.6045 18.8501 12.0525 18.8666 12.5 18.8502C18.023 18.8502 22.5 15.3341 22.5 10.9972C22.5 6.66025 18.023 3.14355 12.5 3.14355Z"
                        fill="#111827"
                      />
                    </svg>
                    <p className="font-semibold text-gray-900">카카오로 시작하기</p>
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
