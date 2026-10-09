
import { motion } from "framer-motion";

const Hero = ({
  headline = "LANJ Systems",
  tagline = "Software for complex operations.",
  subheadline = "We build enterprise and institutional software that helps organisations manage operations, workflows, data and decision-making.",
  primaryButtonText = "Explore OpsEye",
  primaryButtonHref = "#products",
  secondaryButtonText = "Get in touch",
  secondaryButtonHref = "#contact",
}) => {
  return (
    <section
      id="home"
      className="w-full px-6 md:px-10 lg:px-16 xl:px-20 pt-32 pb-16"
    >
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">

          {/* Left Content Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
            }}
            className="min-w-0 bg-[#e9e9e9] rounded-[32px] lg:rounded-[40px] p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-end min-h-[480px] lg:min-h-[550px] overflow-hidden"
          >
            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] leading-tight lg:leading-[60px] tracking-tight text-[#202020] max-w-[520px] mb-4"
              style={{
                fontWeight: 500,
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {headline}
            </h1>

            {/* Tagline */}
            <p
              className="text-xl sm:text-2xl leading-8 tracking-tight text-[#202020] max-w-[520px] mb-6"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {tagline}
            </p>

            {/* Subheadline */}
            <p
              className="text-base sm:text-lg leading-7 text-[#404040] max-w-[520px] mb-6"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-2 flex-wrap mt-6 lg:mt-10">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center justify-center text-white bg-black rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-in-out hover:rounded-2xl"
              >
                {primaryButtonText}
              </a>

              <a
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center text-[#202020] border border-[#202020] rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-in-out hover:rounded-2xl"
              >
                {secondaryButtonText}
              </a>
            </div>
          </motion.div>

          {/* Right Image Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
              delay: 0.2,
            }}
            className="min-w-0 bg-white rounded-[32px] lg:rounded-[40px] min-h-[350px] lg:min-h-[550px] overflow-hidden"
            style={{
              backgroundImage: "url('/landpinpg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            role="img"
            aria-label="LANJ Systems hero image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
