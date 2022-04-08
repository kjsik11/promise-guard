import copy from 'copy-to-clipboard';

export default function shareLogic(url: string) {
  const shareData = { url };

  const canShare = navigator.canShare && navigator.canShare(shareData);
  const userAgent = navigator.userAgent || navigator.vendor;
  const isMobile = /android|iPad|iPhone|iPod/i.test(userAgent);

  if (canShare && isMobile) {
    navigator.share(shareData);
    return false;
  }
  copy(url);
  return true;
}
