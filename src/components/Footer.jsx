
import { Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const iconLinkClass =
  "w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#202020] hover:border-[#202020] transition-colors duration-150";

const Footer = ({
  tagline = "Software for complex operations.",
  location = "Accra, Ghana",
  email = "hello@lanjsystems.com",
  linkedin = "",
  copyrightText = "© 2026 LANJ Systems. All rights reserved.",
}) => {
  return (
    <footer
      id="contact"
      className="w-full bg-[#fafafa] border-t border-[#e5e5e5] scroll-mt-20"
    >
      <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-20 py-16">

        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12"
        >

          {/* Company Information */}
          <div>

            {/* LANJ Logo */}
            <a
              href="#home"
              className="inline-flex items-center mb-4"
              aria-label="LANJ Systems - Back to top"
            >
              <img
                src="/lanj-logo.png"
                alt="LANJ Systems"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </a>

            {/* Tagline */}
            <p
              className="text-sm leading-5 text-[#666666] max-w-xs"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {tagline}
            </p>

            {/* Location */}
            <p
              className="flex items-center gap-1.5 text-sm leading-5 text-[#666666] mt-4"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              <MapPin
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              />
              {location}
            </p>
          </div>

          {/* Contact Information - Inline */}
          <div className="flex items-center gap-4">

            {/* Email Address */}
            <a
              href={`mailto:${email}`}
              className="text-sm text-[#666666] hover:text-[#202020] transition-colors duration-150 whitespace-nowrap"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {email}
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3">

              {/* LinkedIn */}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                  aria-label="LANJ Systems on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              )}

              {/* Email Icon */}
              <a
                href={`mailto:${email}`}
                className={iconLinkClass}
                aria-label="Email LANJ Systems"
              >
                <Mail className="w-4 h-4" />
              </a>

            </div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="pt-8 border-t border-[#e5e5e5]"
        >
          <p
            className="text-sm text-[#666666] text-center md:text-left"
            style={{
              fontFamily: "Figtree, sans-serif",
            }}
          >
            {copyrightText}
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
