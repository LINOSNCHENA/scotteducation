import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">About UniAdmit</h3>
            <p className="mb-4 text-gray-300">We provide expert university admission consultation services to help students navigate the complex application process.</p>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <a key={social} href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition" aria-label={social}>
                  <span className="text-xs">{social.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Our Services", href: "/services" },
                { name: "Blog", href: "/blog" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-blue-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Education Lane</p>
              <p className="mb-4">University District, CA 90210</p>
              <p className="mb-2">
                Email:{" "}
                <a href="mailto:info@uniadmit.com" className="hover:text-blue-400 transition">
                  info@uniadmit.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+15551234567" className="hover:text-blue-400 transition">
                  (555) 123-4567
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} UniAdmit. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
