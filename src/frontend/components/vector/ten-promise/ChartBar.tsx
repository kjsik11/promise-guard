interface Props {
  className?: string;
}

export default function ChartBar({ className }: Props) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.99902 22C3.99902 20.8954 4.89445 20 5.99902 20H9.99902C11.1036 20 11.999 20.8954 11.999 22V32C11.999 33.1046 11.1036 34 9.99902 34H5.99902C4.89445 34 3.99902 33.1046 3.99902 32V22Z"
        fill="currentColor"
      />
      <path
        d="M15.999 14C15.999 12.8954 16.8945 12 17.999 12H21.999C23.1036 12 23.999 12.8954 23.999 14V32C23.999 33.1046 23.1036 34 21.999 34H17.999C16.8945 34 15.999 33.1046 15.999 32V14Z"
        fill="currentColor"
      />
      <path
        d="M27.999 8C27.999 6.89543 28.8945 6 29.999 6H33.999C35.1036 6 35.999 6.89543 35.999 8V32C35.999 33.1046 35.1036 34 33.999 34H29.999C28.8945 34 27.999 33.1046 27.999 32V8Z"
        fill="currentColor"
      />
    </svg>
  );
}
