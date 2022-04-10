import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useRef } from 'react';

import voteImage from '@assets/images/vote-image.png';

export default function VoteModal({ show, close }: { show: boolean; close: () => void }) {
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
            <Dialog.Overlay className="fixed inset-0 bg-black/40 transition-opacity" />
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
            <div className="relative z-10 mx-auto w-full max-w-sm rounded-lg bg-white px-4 py-6 transition-all">
              <div className="relative flex min-h-[400px] flex-col">
                <Image width={1280} height={900} src={voteImage} alt="vote-image" />
                <div className="pt-8 text-center">
                  <h3 className="text-2xl font-bold leading-8 text-gray-900" id="modal-headline">
                    환영해요!
                  </h3>
                  <div className="mt-4">
                    <p>
                      대통령 취임일 5월 10일에 마감되는
                      <br /> 대국민 공약 투표에 참여해주세요.
                    </p>
                  </div>
                  <button
                    onClick={close}
                    className="mt-4 rounded-full bg-PC-400 py-1.5 px-3 text-sm font-semibold text-white"
                  >
                    시작하기
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
