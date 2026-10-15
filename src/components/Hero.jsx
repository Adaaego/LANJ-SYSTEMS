
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const FONT = { fontFamily: "Figtree, sans-serif" };
const EASE = [0.645, 0.045, 0.355, 1];

// Network geometry is intentionally fixed to avoid
// random layout changes on every render.
const NODES = [
  [100, 180], [230, 95], [370, 165], [530, 80],
  [700, 140], [880, 65], [970, 230],
  [70, 365], [245, 310], [410, 360],
  [570, 265], [750, 330], [910, 405],
  [145, 540], [310, 610], [475, 515],
  [635, 590], [800, 530], [960, 630],
  [380, 25], [620, 435], [85, 675],
  [845, 220], [525, 675],
];

const CONNECTIONS = [
  [0, 1], [0, 7], [0, 8],
  [1, 2], [1, 8], [1, 19],
  [2, 3], [2, 8], [2, 9], [2, 19],
  [3, 4], [3, 10], [3, 19],
  [4, 5], [4, 10], [4, 11], [4, 22],
  [5, 6], [5, 22],
  [6, 12], [6, 22],
  [7, 8], [7, 13], [7, 21],
  [8, 9], [8, 13], [8, 14],
  [9, 10], [9, 15], [9, 20],
  [10, 11], [10, 20],
  [11, 12], [11, 17], [11, 20], [11, 22],
  [12, 17], [12, 18],
  [13, 14], [13, 21],
  [14, 15], [14, 21],
  [15, 16], [15, 20], [15, 23],
  [16, 17], [16, 23],
  [17, 18], [17, 20],
];

// Selected connections carry moving data packets.
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
  [13, 14],
  [15, 16],
  [17, 18],
];

// Entrance animation
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

// Individual moving signal
const DataPacket = ({ from, to, index }) => {
  const [x1, y1] = NODES[from];
  const [x2, y2] = NODES[to];

  return (
    <motion.circle
      r={2.6}
      fill="white"
      initial={{
        cx: x1,
        cy: y1,
        opacity: 0,
      }}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 4 + (index % 4),
        delay: index * 0.85,
        repeat: Infinity,
        repeatDelay: 3 + (index % 3),
        ease: "linear",
      }}
      style={{
        filter: "drop-shadow(0 0 4px white)",
      }}
    />
  );
};

// Animated infrastructure network
const DataNetwork = ({ reduceMotion }) => {
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

  const handleMouseMove = (event) => {
    if (reduceMotion || event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 24);
    mouseY.set(y * 24);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="
        pointer-events-none absolute inset-0
        overflow-hidden z-0
      "
      aria-hidden="true"
    >
      {/* Interactive area, desktop only */}
      <div
        className="
          pointer-events-auto absolute inset-0
          hidden lg:block
        "
        onPointerMove={handleMouseMove}
        onPointerLeave={handleMouseLeave}
      />

      {/* Network viewport */}
      <motion.div
        className="
          absolute
          top-[2%] -right-[65%]
          w-[155%] h-[70%]
          sm:-right-[35%]
          sm:w-[120%]
          lg:top-[-5%]
          lg:-right-[8%]
          lg:w-[80%]
          lg:h-[110%]
          opacity-60
          sm:opacity-70
          lg:opacity-100
        "
        style={{
          x: springX,
          y: springY,
          WebkitMaskImage:
            "radial-gradient(ellipse at 60% 45%, black 12%, transparent 76%)",
          maskImage:
            "radial-gradient(ellipse at 60% 45%, black 12%, transparent 76%)",
        }}
      >
        <svg
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <radialGradient id="lanj-node-glow">
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="white"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* Background connections */}
          {CONNECTIONS.map(([from, to], index) => {
            const [x1, y1] = NODES[from];
            const [x2, y2] = NODES[to];

            return (
              <motion.line
                key={`line-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth={0.9}
                strokeOpacity={0.17}
                initial={{
                  pathLength: reduceMotion ? 1 : 0,
                  opacity: reduceMotion ? 1 : 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.8,
                  delay: reduceMotion
                    ? 0
                    : 0.25 + index * 0.035,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Soft halos and network nodes */}
          {NODES.map(([x, y], index) => {
            const isHub = [2, 9, 10, 11, 15, 20].includes(
              index
            );

            return (
              <g key={`node-${index}`}>
                {isHub && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={28}
                    fill="url(#lanj-node-glow)"
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            opacity: [0.3, 0.9, 0.3],
                            scale: [0.85, 1.2, 0.85],
                          }
                    }
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                    }}
                    transition={{
                      duration: 5 + (index % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHub ? 3.5 : 2}
                  fill="white"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isHub ? 0.85 : 0.45,
                    scale: 1,
                  }}
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                  }}
                  transition={{
                    delay: reduceMotion
                      ? 0
                      : 0.45 + index * 0.045,
                    duration: reduceMotion ? 0 : 0.5,
                  }}
                />

                {isHub && (
                  <circle
                    cx={x}
                    cy={y}
                    r={9}
                    fill="none"
                    stroke="white"
                    strokeWidth={0.8}
                    strokeOpacity={0.25}
                  />
                )}
              </g>
            );
          })}

          {/* Signals travelling through connections */}
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

      {/* Soft depth glow */}
      <motion.div
        className="
          absolute
          top-[-35%] right-[-15%]
          w-[95%] h-[95%]
          rounded-full
          blur-[100px]
          opacity-50
          lg:opacity-70
        "
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.025) 45%, transparent 70%)",
        }}
        animate={
          reduceMotion
            ? {}
            : {
                opacity: [0.3, 0.65, 0.3],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dark fade maintains text readability */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black
          via-black/55
          to-transparent
          lg:bg-gradient-to-r
          lg:from-black
          lg:via-black/80
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.13,
        delayChildren: reduceMotion ? 0 : 0.25,
      },
    },
  };

  const contentVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : itemVariants;

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="
            relative isolate
            w-full min-w-0
            overflow-hidden
            flex flex-col justify-end
            bg-black
            rounded-[32px] lg:rounded-[40px]
            p-7 sm:p-12 lg:p-16 xl:p-20
            min-h-[calc(100svh-9rem)]
            sm:min-h-[580px]
            lg:min-h-[650px]
            xl:min-h-[700px]
          "
        >
          {/* AMBIENT GRID */}
          <div
            className="
              pointer-events-none absolute inset-0
              z-0
            "
            aria-hidden="true"
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

          {/* LIVING DATA NETWORK */}
          <DataNetwork reduceMotion={reduceMotion} />

          {/* CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              relative z-10
              w-full
              max-w-[820px]
              pointer-events-none
            "
          >
            {/* EYEBROW */}
            <motion.div
              variants={contentVariants}
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
                    : { opacity: [1, 0.35, 1] }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <span
                className="
                  text-white/50
                  text-[11px] sm:text-xs
                  uppercase tracking-[0.22em]
                "
                style={FONT}
              >
                Engineering connected systems
              </span>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              variants={contentVariants}
              className="
                text-5xl sm:text-6xl
                lg:text-[76px] xl:text-[88px]
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

            {/* TAGLINE */}
            <motion.p
              variants={contentVariants}
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

            {/* SUBHEADLINE */}
            <motion.p
              variants={contentVariants}
              className="
                text-base sm:text-lg
                lg:text-[19px]
                leading-7 lg:leading-8
                text-white/60
                max-w-[620px]
              "
              style={FONT}
            >
              {subheadline}
            </motion.p>

            {/* ACTION BUTTONS */}
            <motion.div
              variants={contentVariants}
              className="
                flex flex-col sm:flex-row
                gap-3
                mt-8 lg:mt-10
                pointer-events-auto
              "
            >
              <motion.a
                href={primaryButtonHref}
                whileHover={
                  reduceMotion
                    ? {}
                    : { y: -3, scale: 1.02 }
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
                  px-[22px] py-[16px]
                  text-base leading-4
                  whitespace-nowrap
                  bg-white text-black
                  transition-[border-radius]
                  duration-200
                  hover:rounded-2xl
                "
                style={FONT}
              >
                {primaryButtonText}
                <span className="ml-3 text-lg">↗</span>
              </motion.a>

              <motion.a
                href={secondaryButtonHref}
                whileHover={
                  reduceMotion
                    ? {}
                    : { y: -3 }
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
                  px-[22px] py-[16px]
                  text-base leading-4
                  whitespace-nowrap
                  border border-white/35
                  text-white
                  transition-all duration-200
                  hover:border-white/70
                  hover:bg-white/10
                  hover:rounded-2xl
                "
                style={FONT}
              >
                {secondaryButtonText}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* BOTTOM RIGHT DETAIL */}
          <div
            className="
              absolute bottom-10 right-12
              hidden lg:flex
              items-center gap-3
              text-white/25
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
