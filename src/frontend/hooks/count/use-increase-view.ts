import { useEffect } from 'react';

import { viewArrayKey } from '@frontend/define/session-key';
import { useNoti } from '@frontend/hooks/use-noti';
import increaseViewCount from '@frontend/lib/count/increase-view-count';

export default function useIncreaseView(promiseId: string) {
  const { showAlert } = useNoti();

  useEffect(() => {
    const viewArray = JSON.parse(window.sessionStorage.getItem(viewArrayKey) ?? '[]') as string[];

    const alreadyViewFlag = viewArray.includes(promiseId);

    if (!alreadyViewFlag) {
      window.sessionStorage.setItem(viewArrayKey, JSON.stringify([...viewArray, promiseId]));
    }
    increaseViewCount(promiseId, alreadyViewFlag).catch(showAlert);
  }, [promiseId, showAlert]);
}
