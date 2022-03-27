import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@frontend/components/ui';
import DragDrop from '@frontend/components/ui/DragDrop';
import { useNoti } from '@frontend/hooks/use-noti';
import { uploadImage } from '@frontend/lib/upload-image';

export default function UploadImage() {
  const { showAlert } = useNoti();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    router.push('/404');
  }, [router]);

  return null;
  return (
    <div className="mx-auto max-w-5xl pt-20">
      <DragDrop onDropFile={setFile} />
      <Button
        onClick={async () => {
          if (file) await uploadImage(file).catch(showAlert);
        }}
      >
        Submit
      </Button>
    </div>
  );
}
