/** @format */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute w-full bottom-0 border-t border-border mt-16 footer">
      <div className="container mx-auto px-4 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Star Electronic
        </p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <a
            href="mailto:info@star-electronic.example"
            className="hover:underline"
          >
            info@star-electronic.example
          </a>
        </div>
      </div>
    </footer>
  );
}
