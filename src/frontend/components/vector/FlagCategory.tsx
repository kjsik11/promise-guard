interface Props {
  className?: string;
}

export default function FlagCategory({ className }: Props) {
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
        d="M4.79999 9.60005C4.79999 6.94908 6.94902 4.80005 9.59998 4.80005H25.5999C26.206 4.80005 26.76 5.14245 27.031 5.68451C27.302 6.22656 27.2436 6.87522 26.8799 7.36005L22.7999 12.8L26.8799 18.24C27.2436 18.7249 27.302 19.3735 27.031 19.9156C26.76 20.4576 26.206 20.8 25.5999 20.8H9.59998C8.71632 20.8 7.99998 21.5164 7.99998 22.4V27.2C7.99998 28.0837 7.28364 28.8 6.39998 28.8C5.51633 28.8 4.79999 28.0837 4.79999 27.2V9.60005Z"
        fill="#094C99"
      />
    </svg>
  );
}
