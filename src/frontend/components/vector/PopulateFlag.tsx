interface Props {
  className?: string;
  flagColor: string;
}

export default function PopulateFlag({ className, flagColor }: Props) {
  return (
    <svg
      className={className}
      width="33"
      height="34"
      viewBox="0 0 33 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="26" transform="translate(0.0322266)" fill={flagColor} />
      <path d="M32.0322 26H0.0322266L16.0322 34L32.0322 26Z" fill={flagColor} />
    </svg>
  );
}
