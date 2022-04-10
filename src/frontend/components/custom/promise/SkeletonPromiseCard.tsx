export default function SkeletonPromiseCard() {
  return (
    <div className="rounded-lg bg-white py-3 px-2">
      <div className="h-4 w-40 animate-pulse rounded-md bg-gray-300" />
      <div className="mt-4 h-6 w-80 animate-pulse rounded-md bg-gray-300" />
      <div className="flex justify-between pt-3">
        <div className="h-3 w-20 animate-pulse rounded-sm bg-gray-300" />
        <div className="h-3 w-28 animate-pulse rounded-sm bg-gray-300" />
      </div>
    </div>
  );
}
