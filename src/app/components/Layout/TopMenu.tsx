import Link from "next/link";

export default function TopMenu() {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/universities" className="hover:underline">
            Universities
          </Link>
          <Link href="/registration" className="hover:underline">
            Registration
          </Link>
          {/* <Link href="/grades" className="hover:underline">
            Grades
          </Link> */}
          <Link href="/courses" className="hover:underline">
            Classes
          </Link>

          <Link href="/students" className="hover:underline">
            Students
          </Link>
          <Link href="/courses" className="hover:underline">
            Courses
          </Link>
          <Link href="/leisure" className="hover:underline">
            Leisure
          </Link>

          <Link href="/blog" className="hover:underline">
            Blog
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
