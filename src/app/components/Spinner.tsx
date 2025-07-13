// components/Spinner.tsx
export default function Spinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600" />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}
