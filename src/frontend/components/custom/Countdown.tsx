import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import CountdownComponent from 'react-countdown';
import { useEffectOnce } from 'react-use';

type CountdownParams = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownParams) => {
  if (completed) {
    // Render a completed state
    //TODO: Apply design
    return <div>good</div>;
  }
  // Render a countdown
  return (
    <div className="flex items-center justify-center space-x-1.5 bg-[#285A92]/60 py-0.5 px-4 text-white">
      <p>
        대통령 취임까지&nbsp;
        <span className="font-semibold">
          {days}일 {hours}시간 {minutes}분 {seconds}초
        </span>
      </p>
      <QuestionMarkCircleIcon className="h-5 w-5" />
    </div>
  );
};

const mainRenderer = ({ days, hours, minutes, seconds, completed }: CountdownParams) => {
  if (completed) {
    // Render a completed state
    //TODO: Apply design
    return <div>good</div>;
  }
  // Render a countdown
  return (
    <div className="absolute top-full w-[280px] -translate-y-1/2 rounded-lg border border-gray-300 bg-white py-4 text-center">
      <p className="text-sm font-semibold text-PC-400">투표마감 5월 10일 0시까지</p>
      <p className="mx-auto w-[260px] text-2xl font-semibold text-PC-600">
        {days}일 {hours}시간 {minutes}분 {seconds < 10 ? `0${seconds}` : seconds}초
      </p>
    </div>
  );
};

export default function Countdown({ isMain = false }: { isMain?: boolean }) {
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    setLoading(false);
  });

  if (loading) return null;

  return (
    <CountdownComponent
      date={new Date('2022-05-10').getTime() - 60 * 60 * 9 * 1000}
      renderer={isMain ? mainRenderer : renderer}
    />
  );
}
