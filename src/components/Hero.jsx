import { motion } from "framer-motion";

const FONT = { fontFamily: "Figtree, sans-serif" };

const Hero = ({
  headline = "LANJ Systems",
  tagline = "We build world-class products and data systems that help power Africa differently.",
  subheadline = "We turn fragmented, unreliable and underused information into structured data, dependable systems and actionable intelligence.",
  primaryButtonText = "Explore OpsEye",
  primaryButtonHref = "#products",
  secondaryButtonText = "Get in touch",
  secondaryButtonHref = "#contact",
}) => {
  return (
    <section
      id="home"
      className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-28 lg:pt-32 pb-12 lg:pb-16"
    >
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">
          {/* Content card: black poster on mobile, grey card on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
            className="relative min-w-0 overflow-hidden flex flex-col justify-end bg-black lg:bg-[#e9e9e9] rounded-[32px] lg:rounded-[40px] p-7 sm:p-12 lg:p-14 xl:p-16 min-h-[calc(100svh-9rem)] sm:min-h-[560px] lg:min-h-[550px]"
          >
            {/* Mobile only: soft glow and fading grid in place of the photo */}
            <div
              className="pointer-events-none absolute inset-0 lg:hidden"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255,255,255,0.18), transparent 70%), linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "100% 100%, 40px 40px, 40px 40px",
                WebkitMaskImage: "linear-gradient(to bottom, #000 35%, transparent 90%)",
                maskImage: "linear-gradient(to bottom, #000 35%, transparent 90%)",
              }}
            />

            <div className="relative z-10">
              <h1
                className="text-5xl sm:text-5xl lg:text-[56px] leading-[1.05] lg:leading-[60px] tracking-[-0.03em] text-white lg:text-[#202020] max-w-[520px] mb-5 lg:mb-4"
                style={{ ...FONT, fontWeight: 500 }}
              >
                {headline}
              </h1>

              <p
                className="text-xl sm:text-2xl leading-8 tracking-tight text-white lg:text-[#202020] max-w-[520px] mb-4 lg:mb-6"
                style={FONT}
              >
                {tagline}
              </p>

              <p
                className="text-base sm:text-lg leading-7 text-white/65 lg:text-[#404040] max-w-[520px]"
                style={FONT}
              >
                {subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mt-8 lg:mt-10">
                <a
                  href={primaryButtonHref}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap bg-white text-black lg:bg-black lg:text-white transition-all duration-150 ease-in-out hover:rounded-2xl"
                >
                  {primaryButtonText}
                </a>
                <a
                  href={secondaryButtonHref}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap border border-white/40 text-white lg:border-[#202020] lg:text-[#202020] transition-all duration-150 ease-in-out hover:rounded-2xl"
                >
                  {secondaryButtonText}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Image card: desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1], delay: 0.2 }}
            className="relative hidden lg:block min-w-0 bg-white rounded-[40px] min-h-[550px] overflow-hidden"
            role="img"
            aria-label="LANJ Systems control room"
          >
            <img
              src="/controlroomheroimg.jpeg"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;