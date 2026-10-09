
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
    <section id="home" className="w-full px-6 lg:px-8 pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-2">

          {/* Left Content Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
            }}
            className="col-span-12 lg:col-span-6 bg-[#e9e9e9] rounded-[40px] p-8 sm:p-12 lg:p-16 flex flex-col justify-end min-h-[480px] lg:aspect-square overflow-hidden"
          >
            {/* Headline */}
            <h1
              className="text-5xl sm:text-[56px] leading-tight sm:leading-[60px] tracking-tight text-[#202020] max-w-[520px] mb-4"
              style={{
                fontWeight: 500,
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {headline}
            </h1>

            {/* Tagline */}
            <p
              className="text-2xl leading-8 tracking-tight text-[#202020] max-w-[520px] mb-6"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {tagline}
            </p>

            {/* Subheadline */}
            <p
              className="text-lg leading-7 text-[#404040] max-w-[520px] mb-6"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-2 flex-wrap mt-10">
              <a
                href={primaryButtonHref}
                className="block cursor-pointer text-white bg-black rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-in-out hover:rounded-2xl"
              >
                {primaryButtonText}
              </a>

              <a
                href={secondaryButtonHref}
                className="block cursor-pointer text-[#202020] border border-[#202020] rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-in-out hover:rounded-2xl"
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
            className="col-span-12 lg:col-span-6 bg-white rounded-[40px] min-h-[350px] lg:aspect-square overflow-hidden"
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
