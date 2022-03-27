import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/404');
  }, [router]);

  return null;

  // return (
  //   <div>
  //     <Countdown />
  //     <Link href="/sign-in">Go to sign-in page</Link>
  //     <Link href="/upload-image">test upload image</Link>
  //   </div>
  // );
}
