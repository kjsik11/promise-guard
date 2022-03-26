import Link from 'next/link';

export default function IndexPage() {
  return (
    <div>
      <Link href="/sign-in">Go to sign-in page</Link>
      <Link href="/upload-image">test upload image</Link>
    </div>
  );
}
