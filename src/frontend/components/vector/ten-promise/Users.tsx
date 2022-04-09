interface Props {
  className?: string;
}

export default function Users({ className }: Props) {
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
        d="M17.999 12C17.999 15.3137 15.3127 18 11.999 18C8.68532 18 5.99902 15.3137 5.99902 12C5.99902 8.68629 8.68532 6 11.999 6C15.3127 6 17.999 8.68629 17.999 12Z"
        fill="currentColor"
      />
      <path
        d="M33.999 12C33.999 15.3137 31.3127 18 27.999 18C24.6853 18 21.999 15.3137 21.999 12C21.999 8.68629 24.6853 6 27.999 6C31.3127 6 33.999 8.68629 33.999 12Z"
        fill="currentColor"
      />
      <path
        d="M25.8573 34C25.9507 33.3468 25.9991 32.679 25.9991 32C25.9991 28.7296 24.8777 25.7212 22.9985 23.3381C24.4695 22.4871 26.1774 22 27.9991 22C33.5219 22 37.9991 26.4772 37.9991 32V34H25.8573Z"
        fill="currentColor"
      />
      <path
        d="M11.999 22C17.5219 22 21.999 26.4772 21.999 32V34H1.99902V32C1.99902 26.4772 6.47618 22 11.999 22Z"
        fill="currentColor"
      />
    </svg>
  );
}
