
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const FONT = { fontFamily: "Figtree, sans-serif" };

const EASE = [0.645, 0.045, 0.355, 1];

// Fixed network coordinates
const NODES = [
  [100, 180],
  [230, 95],
  [370, 165],
  [530, 80],
  [700, 140],
  [880, 65],
  [970, 230],
  [70, 365],
  [245, 310],
  [410, 360],
  [570, 265],
  [750, 330],
  [910, 405],
  [145, 540],
  [310, 610],
  [475, 515],
  [635, 590],
  [800, 530],
  [960, 630],
  [380, 25],
  [620, 435],
  [85, 675],
  [845, 220],
  [525, 675],
];

const CONNECTIONS = [
  [0, 1], [0, 7], [0, 8],
  [1, 2], [1, 8], [1, 19],
  [2, 3], [2, 8], [2, 9],
  [3, 4], [3, 10], [3, 19],
  [4, 5], [4, 10], [4, 11],
  [5, 6], [5, 22],
  [6, 12], [6, 22],
  [7, 8], [7, 13],
  [8, 9], [8, 13], [8, 14],
  [9, 10], [9, 15], [9, 20],
  [10, 11], [10, 20],
  [11, 12], [11, 17], [11, 20],
  [12, 17], [12, 18],
  [13, 14], [13, 21],
  [14, 15],
  [15, 16], [15, 20], [15, 23],
  [16, 17], [16, 23],
  [17, 18],
];

const DATA_PATHS = [
  [1, 2],
  [2, 9],
  [3, 10],
  [4, 11],
  [6, 12],
  [8, 9],
  [9, 15],
  [10, 20],
  [11, 17],
  [15, 16],
];

// Moving data signal
const DataPacket = ({ from, to, index }) => {
  const [x1, y1] = NODES[from];
  const [x2, y2] = NODES[to];

  return (
    <motion.circle
      r={2.5}
      fill="white"
      initial={{
        cx: x1,
        cy: y1,
        opacity: 0,
      }}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 4 + (index % 4),
        delay: index * 0.8,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "linear",
      }}
      style={{
        filter: "drop-shadow(0 0 4px white)",
      }}
    />
  );
};

// Animated network background
const DataNetwork = ({
  reduceMotion,
  springX,
  springY,
}) => {
  const HUBS = [2, 9, 10, 11, 15, 20];

  return (
    <div
      className="
        absolute inset-0
        z-0
        pointer-events-none
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      {/* Network visual */}
      <motion.div
        className="
          absolute
          top-[0%] -right-[55%]
          w-[150%] h-[65%]
          sm:-right-[35%]
          sm:w-[120%]
          lg:top-[-5%]
          lg:-right-[8%]
          lg:w-[80%]
          lg:h-[110%]
        "
        style={{
          x: springX,
          y: springY,
          WebkitMaskImage:
            "radial-gradient(ellipse at 60% 45%, black 15%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse at 60% 45%, black 15%, transparent 80%)",
        }}
      >
        <svg
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          <defs>
            <radialGradient id="lanj-network-glow">
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity="0.24"
              />
              <stop
                offset="100%"
                stopColor="white"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* Network connections */}
          {CONNECTIONS.map(([from, to], index) => {
            const [x1, y1] = NODES[from];
            const [x2, y2] = NODES[to];

            return (
              <motion.line
                key={`connection-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth={1}
                strokeOpacity={0.24}
                initial={false}
                animate={{
                  opacity: 1,
                }}
              />
            );
          })}

          {/* Network nodes */}
          {NODES.map(([x, y], index) => {
            const isHub = HUBS.includes(index);

            return (
              <g key={`node-${index}`}>
                {isHub && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={30}
                    fill="url(#lanj-network-glow)"
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                    }}
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            opacity: [0.35, 0.9, 0.35],
                            scale: [0.9, 1.15, 0.9],
                          }
                    }
                    transition={{
                      duration: 5 + (index % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                <circle
                  cx={x}
                  cy={y}
                  r={isHub ? 3.5 : 2}
                  fill="white"
                  fillOpacity={isHub ? 0.85 : 0.55}
                />

                {isHub && (
                  <circle
                    cx={x}
                    cy={y}
                    r={9}
                    fill="none"
                    stroke="white"
                    strokeWidth={0.8}
                    strokeOpacity={0.3}
                  />
                )}
              </g>
            );
          })}

          {/* Animated data signals */}
          {!reduceMotion &&
            DATA_PATHS.map(([from, to], index) => (
              <DataPacket
                key={`packet-${index}`}
                from={from}
                to={to}
                index={index}
              />
            ))}
        </svg>
      </motion.div>

      {/* Ambient light */}
      <motion.div
        className="
          absolute
          -top-[35%] right-[-15%]
          w-[95%] h-[95%]
          rounded-full
          blur-[100px]
        "
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 45%, transparent 70%)",
        }}
        animate={
          reduceMotion
            ? {}
            : {
                opacity: [0.35, 0.65, 0.35],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Text contrast overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/90
          via-black/35
          to-transparent
          lg:bg-gradient-to-r
          lg:from-black/95
          lg:via-black/60
          lg:to-transparent
        "
      />
    </div>
  );
};

const Hero = ({
  headline = "LANJ Systems",
  tagline = "Data infrastructure for Africa’s most complex industries.",
  subheadline = "Messy processes. Fragmented data. Broken systems. We build the infrastructure that fixes them.",
  primaryButtonText = "Explore OpsEye",
  primaryButtonHref = "#products",
  secondaryButtonText = "Get in touch",
  secondaryButtonHref = "#contact",
}) => {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 35,
    damping: 25,
  });

  const springY = useSpring(mouseY, {
    stiffness: 35,
    damping: 25,
  });

  const handlePointerMove = (event) => {
    if (
      reduceMotion ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 24);
    mouseY.set(y * 24);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // All content remains visible by default.
  // Entrance animations never start at opacity 0.
  const textAnimation = reduceMotion
    ? {}
    : {
        initial: { opacity: 1, y: 12 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="home"
      className="
        w-full
        px-4 sm:px-6 md:px-10
        lg:px-16 xl:px-20
        pt-28 lg:pt-32
        pb-12 lg:pb-16
      "
    >
      <div className="w-full mx-auto">
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="
            relative isolate
            w-full min-w-0
            overflow-hidden
            flex flex-col justify-end
            bg-black
            rounded-[32px] lg:rounded-[40px]
            p-7 sm:p-12
            lg:p-16 xl:p-20
            min-h-[calc(100svh-9rem)]
            sm:min-h-[580px]
            lg:min-h-[650px]
            xl:min-h-[700px]
          "
        >
          {/* Animated network background */}
          <DataNetwork
            reduceMotion={reduceMotion}
            springX={springX}
            springY={springY}
          />

          {/* HERO CONTENT */}
          <div
            className="
              relative z-20
              w-full max-w-[820px]
              text-white
            "
            style={{
              opacity: 1,
              visibility: "visible",
            }}
          >
            {/* Eyebrow */}
            <motion.div
              {...textAnimation}
              transition={{
                duration: 0.7,
                delay: 0.05,
                ease: EASE,
              }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.span
                className="
                  w-[7px] h-[7px]
                  rounded-full bg-white
                  shadow-[0_0_12px_rgba(255,255,255,0.55)]
                "
                animate={
                  reduceMotion
                    ? {}
                    : {
                        opacity: [1, 0.4, 1],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <span
                className="
                  text-white/55
                  text-[11px] sm:text-xs
                  uppercase tracking-[0.22em]
                "
                style={FONT}
              >
                Engineering connected systems
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...textAnimation}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: EASE,
              }}
              className="
                text-5xl sm:text-6xl
                lg:text-[76px]
                xl:text-[88px]
                leading-[1.05]
                tracking-[-0.045em]
                text-white
                max-w-[800px]
                mb-6
              "
              style={{
                ...FONT,
                fontWeight: 500,
              }}
            >
              {headline}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              {...textAnimation}
              transition={{
                duration: 0.8,
                delay: 0.22,
                ease: EASE,
              }}
              className="
                text-xl sm:text-2xl
                lg:text-[30px]
                leading-[1.3]
                tracking-tight
                text-white
                max-w-[720px]
                mb-5
              "
              style={FONT}
            >
              {tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              {...textAnimation}
              transition={{
                duration: 0.8,
                delay: 0.32,
                ease: EASE,
              }}
              className="
                text-base sm:text-lg
                lg:text-[19px]
                leading-7 lg:leading-8
                text-white/65
                max-w-[620px]
              "
              style={FONT}
            >
              {subheadline}
            </motion.p>

            {/* Buttons - original labels restored */}
            <motion.div
              {...textAnimation}
              transition={{
                duration: 0.8,
                delay: 0.42,
                ease: EASE,
              }}
              className="
                flex flex-col sm:flex-row
                gap-2
                mt-8 lg:mt-10
              "
            >
              {/* Primary button */}
              <motion.a
                href={primaryButtonHref}
                whileHover={
                  reduceMotion
                    ? {}
                    : { y: -2 }
                }
                whileTap={
                  reduceMotion
                    ? {}
                    : { scale: 0.98 }
                }
                className="
                  inline-flex
                  w-full sm:w-auto
                  items-center justify-center
                  rounded-full
                  px-[18px] py-[15px]
                  text-base leading-4
                  whitespace-nowrap
                  bg-white text-black
                  transition-[border-radius]
                  duration-150 ease-in-out
                  hover:rounded-2xl
                "
                style={FONT}
              >
                {primaryButtonText}
              </motion.a>

              {/* Secondary button */}
              <motion.a
                href={secondaryButtonHref}
                whileHover={
                  reduceMotion
                    ? {}
                    : { y: -2 }
                }
                whileTap={
                  reduceMotion
                    ? {}
                    : { scale: 0.98 }
                }
                className="
                  inline-flex
                  w-full sm:w-auto
                  items-center justify-center
                  rounded-full
                  px-[18px] py-[15px]
                  text-base leading-4
                  whitespace-nowrap
                  border border-white/40
                  text-white
                  transition-all duration-150
                  ease-in-out
                  hover:border-white/75
                  hover:rounded-2xl
                "
                style={FONT}
              >
                {secondaryButtonText}
              </motion.a>
            </motion.div>
          </div>

          {/* Bottom-right branding */}
          <div
            className="
              absolute bottom-10 right-12
              hidden lg:flex
              items-center gap-3
              text-white/30
              text-[10px]
              tracking-[0.2em]
              uppercase
              pointer-events-none
              z-10
            "
            style={FONT}
            aria-hidden="true"
          >
            <span>LANJ / SYSTEMS</span>
            <span className="w-8 h-px bg-white/20" />
            <span>001</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
