import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Uni<span className="text-blue-400">Admit</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-blue-400 font-medium">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
