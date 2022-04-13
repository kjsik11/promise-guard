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
            새로운 정부에서&nbsp;
            <span className="font-bold">반드시 지켜야 할 공약은? 절대로 지켜지면 안될 공약은?</span>
            &nbsp; 오월십일 대국민 공약 투표에서 여러분의 의견을 들려주세요. 투표는 윤석열 대통령의
            공식적 임기 시작 시간인&nbsp;
            <span className="font-bold">5월 10일 오전 0시에 마감됩</span>
            니다.
          </p>
          <div className="mt-16 flex  justify-center">
            <div className="h-[257px] w-[208px]">
              <NextImage alt="check-board-img" src={CheckBoardImage} placeholder="blur" />
            </div>
          </div>
          <p className="mt-16">
            윤석열 당선인은 대통령 선거 동안에 10대 공약, 지역 공약, 생활 공약이라는 이름으로
            국민들에게 수백여 가지의 약속을 했습니다. 국민과의 약속을 무겁게 생각하고 성실히
            지켜나가야 하겠지만, 어떤 약속은 지켜지지 말아야 하는 것도 있을 것입니다. 새로운 정부의
            시작에 앞서 어떤 약속을 했는지 다시 살펴보고 목소리를 내야 할 때입니다. 투표
            결과는&nbsp;
            <span className="font-bold">실시간 공개</span>
            되고&nbsp;
            <span className="font-bold">새로운 정부에 직접 전달</span>&nbsp;됩니다.
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
            끝없이 쏟아지는 다른 이슈들에 묻혀 공약 소식들이 잊혀지지 않도록&nbsp;
            <span className="font-bold">맞춤형 뉴스 알림</span>을 운영합니다. 오월십일 카카오 채널을
            통해 관심있는 공약에 대한 뉴스 알림을 받아보실 수 있습니다.
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
