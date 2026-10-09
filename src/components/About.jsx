
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 pt-16">
        <div className="grid grid-cols-12 gap-5 gap-y-16">

          {/* Left Content */}
          <div className="col-span-12 md:col-span-6 relative z-10">

            {/* Animated Section Label */}
            <div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-black mb-12 px-2"
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

            {/* Main Heading */}
            <h2
              className="text-3xl sm:text-[40px] font-normal leading-tight tracking-tight text-[#202020] mb-6"
              style={{
                fontFamily: "Figtree, sans-serif",
                fontWeight: 400,
              }}
            >
              LANJ Systems is a software company based in
              Accra, Ghana,{" "}
              <span className="opacity-40">
                building enterprise and institutional software
                for organisations that run complex operations.
              </span>
            </h2>

            {/* Description */}
            <div
              className="flex flex-col gap-4"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              <p className="text-lg leading-6 text-[#202020] opacity-60 m-0">
                We focus on systems that bring operational data
                together, make it reliable, and turn it into
                intelligence people can act on.
              </p>

              <p className="text-lg leading-6 text-[#202020] opacity-60 m-0">
                We design around the realities of the markets
                we serve, from patchy connectivity to mixed
                equipment and manual processes, so our software
                works where it is actually used.
              </p>
            </div>

            {/* Explore Button */}
            <a
              href="#products"
              className="relative inline-flex justify-center items-center leading-4 text-center cursor-pointer whitespace-nowrap outline-none font-medium h-9 text-[#232730] bg-white/50 backdrop-blur-sm shadow-[0_1px_1px_0_rgba(255,255,255,0),0_0_0_1px_rgba(87,90,100,0.12)] transition-all duration-200 ease-in-out rounded-lg px-4 mt-8 text-sm group hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(87,90,100,0.18)]"
            >
              <span className="relative z-10 flex items-center gap-1">
                Explore OpsEye

                <ArrowRight className="w-4 h-4 -mr-1 transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Right Animated Data Visualization */}
          <div
            className="col-span-12 md:col-span-6"
            aria-hidden="true"
          >
            <div className="relative w-full h-[416px] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[416px] pointer-events-none">
                <div className="relative w-full h-full">

                  {dataPoints.map((point) => (
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
                              height: [
                                0,
                                point.height,
                                point.height,
                              ],
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
                        top: `${point.top}px`,
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
                              : `${point.height - 8}px`,
                        }}
                      />
                    </motion.div>
                  ))}

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
