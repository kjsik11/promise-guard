import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
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
            <div className="absolute inset-x-0 w-full transition-all">
              <div className="mx-auto max-w-sm rounded-lg bg-white px-4">
                <div className="relative flex min-h-[527px] flex-col justify-between pt-12">
                  <button onClick={close} className="absolute top-4 right-0">
                    <XIcon className="h-6 w-6" />
                  </button>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold leading-8 text-gray-900" id="modal-headline">
                      어떤 공약을 지지하시나요?
                    </h3>
                    <div className="mt-4">
                      <p>
                        카카오톡으로 3초만에 로그인해서
                        <br /> 대국민 공약 투표에 참여할 수 있어요
                      </p>
                    </div>
                    <div className="pt-4">
                      <Link href="/introduce">
                        <a className="rounded-full bg-PC-400 px-3 py-1.5 text-sm font-semibold text-white">
                          프로젝트 소개
                        </a>
                      </Link>
                      <div className="mt-3">
                        <button onClick={close} className="text-sm font-semibold text-blue-500">
                          닫기
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative -mb-[7px]">
                    {/*eslint-disable-next-line */}
                    <Image width={1280} height={900} src={voteImage} alt="vote-image" />
                    <div className="absolute inset-0 top-0 h-8 bg-gradient-to-t from-transparent to-white" />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
