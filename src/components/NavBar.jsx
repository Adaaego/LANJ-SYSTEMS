
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navigationLinks = [
  { name: "About", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Building for", href: "#sectors" },
  { name: "FAQ", href: "#faq" },
];

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (href) => {
    closeMobileMenu();

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-none mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => handleLinkClick("#home")}
              className="flex items-center"
              aria-label="LANJ Systems - Home"
            >
 <img
  src="/lanj-logo.png"
  alt="LANJ Systems"
  className="h-12 md:h-14 w-auto object-contain"
/>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-base font-medium transition-colors duration-200 relative group"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => handleLinkClick("#contact")}
              className="bg-black text-white px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-black/90 transition-all duration-200 hover:rounded-2xl shadow-sm hover:shadow-md whitespace-nowrap leading-4"
              style={{
                fontFamily: "Figtree, sans-serif",
                fontWeight: 500,
              }}
            >
              Get in touch
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-900 hover:text-gray-600 p-2 rounded-md transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left text-gray-900 hover:text-gray-600 py-3 text-lg font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => handleLinkClick("#contact")}
                  className="w-full bg-black text-white px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-black/90 transition-all duration-200"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
