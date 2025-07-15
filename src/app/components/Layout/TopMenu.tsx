import Link from "next/link";

export default function TopMenu() {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/grades" className="hover:underline">
            Grades
          </Link>
          <Link href="/classes" className="hover:underline">
            Classes
          </Link>
        </div>
        <div className="flex space-x-4">
          <span>Welcome, Student</span>
          <button className="hover:underline">Logout</button>
        </div>
      </div>
    </nav>
  );
}
