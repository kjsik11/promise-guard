import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import CountdownComponent from 'react-countdown';

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
  } else {
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
  }
};

export default function Countdown() {
  return (
    <CountdownComponent
      date={new Date('2022-05-10').getTime() - 60 * 60 * 9 * 1000}
      renderer={renderer}
    />
  );
}
