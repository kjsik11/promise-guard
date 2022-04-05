interface Props {
  className?: string;
}

export default function Building({ className }: Props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99902 8C7.99902 5.79086 9.78988 4 11.999 4H27.999C30.2082 4 31.999 5.79086 31.999 8V32C33.1036 32 33.999 32.8954 33.999 34C33.999 35.1046 33.1036 36 31.999 36H24.999C24.4467 36 23.999 35.5523 23.999 35V30C23.999 28.8954 23.1036 28 21.999 28H17.999C16.8945 28 15.999 28.8954 15.999 30V35C15.999 35.5523 15.5513 36 14.999 36H7.99902C6.89445 36 5.99902 35.1046 5.99902 34C5.99902 32.8954 6.89445 32 7.99902 32V8ZM13.999 10H17.999V14H13.999V10ZM17.999 18H13.999V22H17.999V18ZM21.999 10H25.999V14H21.999V10ZM25.999 18H21.999V22H25.999V18Z"
        fill="#6A99CD"
      />
    </svg>
  );
}
