import Link from "next/link";

export default function BottomMenu() {
  return (
    <nav className="bg-gray-100 p-3 fixed bottom-0 w-full border-t">
      <div className="container mx-auto flex justify-around">
        <Link href="/account" className="flex flex-col items-center">
          <span className="text-xs">Account</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center">
          <span className="text-xs">Services</span>
        </Link>
        <Link href="/projects" className="flex flex-col items-center">
          <span className="text-xs">Projects</span>
        </Link>
        <Link href="/visits" className="flex flex-col items-center">
          <span className="text-xs">Visits</span>
        </Link>
        <Link href="/leisure" className="flex flex-col items-center">
          <span className="text-xs">Leisure</span>
        </Link>
      </div>
    </nav>
  );
}
