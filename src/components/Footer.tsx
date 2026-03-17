import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-bold text-white">Pure &amp; Savoury</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Handcrafted soaps and gourmet snacks made with love and the finest
              natural ingredients. Treat yourself to the perfect blend of
              self-care and indulgence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products?category=soaps", label: "Soaps" },
                { href: "/products?category=snacks", label: "Snacks" },
                { href: "/cart", label: "Cart" },
                { href: "/profile", label: "My Account" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>hello@pureandsavoury.com</li>
              <li>(555) 123-4567</li>
              <li>123 Artisan Way, Portland, OR 97201</li>
            </ul>

            <h3 className="mt-6 text-lg font-bold text-white">Follow Us</h3>
            <div className="mt-3 flex gap-4">
              {["Facebook", "Instagram", "Twitter", "Pinterest"].map(
                (platform) => (
                  <span
                    key={platform}
                    className="cursor-pointer text-sm transition-colors hover:text-amber-400"
                  >
                    {platform}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Pure &amp; Savoury. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
