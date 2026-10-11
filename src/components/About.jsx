
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Seeded random generator for consistent animation positions
const createSeededRandom = (initialSeed) => {
  let seed = initialSeed;

  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
};

const generateDataPoints = () => {
  const random = createSeededRandom(42);
  const points = [];
  const baseLeft = 1;
  const spacing = 32;

  for (let i = 0; i < 50; i++) {
    const direction = i % 2 === 0 ? "down" : "up";
    const height = Math.floor(random() * 120) + 88;
    const top =
      direction === "down"
        ? random() * 150 + 250
        : random() * 100 - 80;

    points.push({
      id: i,
      left: baseLeft + i * spacing,
      top,
      height,
      direction,
      delay: i * 0.035,
    });
  }

  return points;
};

const dataPoints = generateDataPoints();

const barGradient =
  "rgb(200, 200, 200) 0%, rgb(200, 200, 200) 10%, rgba(160, 160, 160, 0.1) 40%, rgba(160, 160, 160, 0) 75%";

const FONT = {
  fontFamily: "Figtree, sans-serif",
};

// Desktop and mobile data visualization
const DataVisualization = ({
  isVisible,
  compact = false,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        compact ? "h-[120px]" : "h-[416px]"
      }`}
      aria-hidden="true"
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 pointer-events-none ${
          compact
            ? "top-0 w-[680px] h-[120px]"
            : "top-0 w-[680px] h-[416px]"
        }`}
      >
        <div className="relative w-full h-full">
          {dataPoints.map((point) => {
            // Compact visualization for mobile
            const height = compact
              ? point.height * 0.35
              : point.height;

            const top = compact
              ? point.direction === "down"
                ? 10
                : 60 - height
              : point.top;

            return (
              <motion.div
                key={point.id}
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={
                  isVisible
                    ? {
                        opacity: [0, 1, 1],
                        height: [0, height, height],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  delay: point.delay,
                  ease: [0.5, 0, 0.01, 1],
                }}
                className="absolute w-1.5 rounded-[3px]"
                style={{
                  left: `${point.left}px`,
                  top: `${top}px`,
                  background:
                    point.direction === "down"
                      ? `linear-gradient(${barGradient})`
                      : `linear-gradient(to top, ${barGradient})`,
                }}
              >
                {/* Animated Dot */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={
                    isVisible
                      ? { opacity: [0, 1] }
                      : {}
                  }
                  transition={{
                    duration: 0.3,
                    delay: point.delay + 1.7,
                  }}
                  className="absolute -left-[1px] w-2 h-2 bg-black rounded-full"
                  style={{
                    top:
                      point.direction === "down"
                        ? "0px"
                        : `${height - 8}px`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-white scroll-mt-20"
    >
      <div className="w-full mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-14 pb-8 md:pt-24 md:pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="relative z-10 min-w-0">

            {/* Animated Section Label */}
            <div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-black mb-7 md:mb-12 px-2"
              style={{
                fontFamily:
                  "'Geist Mono', ui-monospace, monospace",
              }}
            >
              <div className="flex items-center gap-0.5 overflow-hidden">

                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="block whitespace-nowrap overflow-hidden text-black relative z-10"
                >
                  About us
                </motion.span>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: typingComplete
                      ? [1, 0, 1, 0]
                      : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="block w-1.5 h-3 bg-black ml-0.5 relative z-10 rounded-sm"
                />

              </div>
            </div>

            {/* Main Heading - Original Two-Tone Style */}
            <h2
              className="text-[30px] sm:text-[36px] md:text-[40px] font-normal leading-[1.15] md:leading-tight tracking-tight text-[#202020] mb-6"
              style={{
                ...FONT,
                fontWeight: 400,
              }}
            >
              LANJ Systems builds data infrastructure for Africa's most complex industries.{" "}
              <span className="opacity-40">
                focused on turning fragmented, unreliable and
                underused information into structured data,
                dependable systems and actionable intelligence.
              </span>
            </h2>

            {/* Description */}
            <div
              className="flex flex-col gap-4"
              style={FONT}
            >
              <p className="text-base sm:text-lg leading-7 sm:leading-6 text-[#202020] opacity-60 m-0">
                We take messy, fragmented processes and turn
                them into clean, structured, queryable data
                that helps organisations make better decisions.
              </p>

              <p className="text-base sm:text-lg leading-7 sm:leading-6 text-[#202020] opacity-60 m-0">
                We don't just build software to solve isolated
                problems. We build systems that improve how
                industries operate, how resources are managed
                and how economies grow.
              </p>
            </div>

            {/* Explore Button - Preserved */}
            <a
              href="#products"
              className="relative inline-flex justify-center items-center leading-4 text-center cursor-pointer whitespace-nowrap outline-none font-medium h-9 text-[#232730] bg-white/50 backdrop-blur-sm shadow-[0_1px_1px_0_rgba(255,255,255,0),0_0_0_1px_rgba(87,90,100,0.12)] transition-all duration-200 ease-in-out rounded-lg px-4 mt-7 md:mt-8 text-sm group hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(87,90,100,0.18)]"
            >
              <span className="relative z-10 flex items-center gap-1">
                Explore OpsEye

                <ArrowRight className="w-4 h-4 -mr-1 transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </a>

          </div>

          {/* Desktop Animated Data Visualization */}
          <div className="relative hidden md:block min-w-0">
            <DataVisualization
              isVisible={isVisible}
            />
          </div>

          {/* Mobile Compact Data Visualization */}
          <div className="relative md:hidden min-w-0 mt-2 overflow-hidden">
            <DataVisualization
              isVisible={isVisible}
              compact
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
