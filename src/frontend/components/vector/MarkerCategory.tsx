interface Props {
  className?: string;
}

export default function MarkerCategory({ className }: Props) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.9196 6.48036C28.2935 10.8542 28.2935 17.9457 23.9196 22.3195L16 30.2391L8.08039 22.3195C3.70652 17.9457 3.70652 10.8542 8.08039 6.48036C12.4543 2.10648 19.5457 2.10648 23.9196 6.48036ZM16 17.6C17.7673 17.6 19.2 16.1673 19.2 14.4C19.2 12.6326 17.7673 11.2 16 11.2C14.2327 11.2 12.8 12.6326 12.8 14.4C12.8 16.1673 14.2327 17.6 16 17.6Z"
        fill="#60A5FA"
      />
    </svg>
  );
}
