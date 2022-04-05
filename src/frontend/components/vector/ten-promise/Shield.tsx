interface Props {
  className?: string;
}

export default function Shield({ className }: Props) {
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
        d="M4.33124 9.99781C10.3478 9.91619 15.8296 7.62066 19.999 3.88892C24.1685 7.62066 29.6503 9.91618 35.6668 9.99781C35.8853 11.2994 35.999 12.6364 35.999 14.0001C35.999 24.4498 29.3206 33.3397 19.999 36.6343C10.6775 33.3397 3.99902 24.4498 3.99902 14.0001C3.99902 12.6364 4.11275 11.2994 4.33124 9.99781ZM26.7061 16.7071C27.0967 16.3166 27.0967 15.6834 26.7061 15.2929C26.3156 14.9024 25.6824 14.9024 25.2919 15.2929L17.999 22.5858L14.7061 19.2929C14.3156 18.9024 13.6824 18.9024 13.2919 19.2929C12.9014 19.6834 12.9014 20.3166 13.2919 20.7071L17.2919 24.7071C17.6824 25.0976 18.3156 25.0976 18.7061 24.7071L26.7061 16.7071Z"
        fill="#6A99CD"
      />
    </svg>
  );
}
