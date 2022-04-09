import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import NextImage from 'next/image';

import Calendar from '@assets/introduce/calendar.png';
import CheckBoardImage from '@assets/introduce/check-board.png';

import KakaoButton from '@frontend/components/custom/KakaoButton';
import { QAList } from '@frontend/define/qa-list';

export default function IntroducePage() {
  return (
    <>
      <NextSeo
        title="오월 십일 소개"
        openGraph={{
          title: '오월 십일 소개',
        }}
      />
      <div className="pt-10">
        <section className="px-4 pb-16">
          <p className="text-3xl font-bold text-PC-800">대국민 공약 투표</p>
          <p className="pt-2">
            새로운 정부가 꼭 지켜야 하는 공약에 투표해주세요. 투표는 윤석열 대통령의 임기 시작인{' '}
            <span className="font-bold">5월 10일 오전 0시</span>에 마무리됩니다.
          </p>
          <div className="mt-16 flex  justify-center">
            <div className="h-[257px] w-[208px]">
              <NextImage alt="check-board-img" src={CheckBoardImage} placeholder="blur" />
            </div>
          </div>
          <p className="mt-16">
            누구나 꼭 지켜졌으면 하는 공약 하나 쯤은 마음 속에 담고 있습니다. 국민과 한 약속을
            가볍게 여기지 않도록 무게를 실어주세요. 투표 결과는 실시간 공개되고{' '}
            <span className="font-bold">새로운 정부에 직접 전달</span>됩니다.
          </p>
        </section>
        <section className="px-4 pt-10 pb-16">
          <p className="text-3xl font-bold text-PC-800">오월 십일</p>
          <p className="pt-2">
            오월 십일은 국민과의 약속을 어기는 것이 너무나 당연해진 현실을 바꾸기 위하여
            시작되었습니다. 투표가 끝난 뒤에도 공약 이행에 대한 감시와 홍보의 역할을
            이어나가겠습니다.
          </p>
          <div className="mt-16 flex  justify-center">
            <div className="h-[239px] w-[239px]">
              <NextImage
                alt="calendar-image"
                placeholder="blur"
                layout="responsive"
                src={Calendar}
              />
            </div>
          </div>
          <p className="pt-16 pb-4">
            오월 십일 카카오 채널을 통하여 관심 공약 뉴스를 알려드리겠습니다.
          </p>
          <KakaoButton />
        </section>
        <section className="pt-10">
          <p className="px-4 pb-4 text-xl font-bold">자주 묻는 질문</p>

          {QAList.map((item, idx) => (
            <div key={`qa-item-${idx}`} className="w-full ">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between border-t border-gray-100 px-4 py-6 text-black">
                      <span>{item.question}</span>
                      <ChevronDownIcon className={clsx('h-5 w-5', { 'rotate-180': open })} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-gray-100 py-6 px-4 text-gray-800">
                      {item.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
