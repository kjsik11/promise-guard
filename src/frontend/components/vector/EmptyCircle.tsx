interface Props {
  className?: string;
}

export default function EmptyCircle({ className }: Props) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="12" stroke="white" strokeWidth="3" />
    </svg>
  );
}
