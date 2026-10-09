
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Sector Information
const CURRENT_FOCUS = "Oil and gas operators";

const sectors = [
  CURRENT_FOCUS,
  "Regulators and public institutions",
  "Multi-site businesses",
  "Data-heavy operations",
  "More coming",
];

const defaultTopRow = [...sectors, ...sectors];

const defaultBottomRow = [
  ...sectors.slice(2),
  ...sectors.slice(0, 2),
  ...sectors.slice(2),
  ...sectors.slice(0, 2),
];

// Sector Card Styling
const tileStyle = {
  backgroundImage:
    "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
  boxShadow:
    "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
};

// Individual Sector Tile
const SectorTile = ({ name }) => (
  <div
    className="flex flex-col items-center justify-center gap-1.5 h-24 px-8 rounded-3xl flex-shrink-0 text-lg text-[#202020]"
    style={{
      ...tileStyle,
      fontFamily: "Figtree, sans-serif",
    }}
  >
    {name === CURRENT_FOCUS && (
      <span className="px-2 py-0.5 rounded-full bg-[#202020] text-white text-[11px] font-medium leading-4 tracking-wide uppercase">
        Current focus
      </span>
    )}

    <span>{name}</span>
  </div>
);

// Scrolling Carousel Row
const CarouselRow = ({ items, speed, position }) => {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    let animationId;
    let offset = 0;
    let lastTime = null;

    const animate = (timestamp) => {
      if (lastTime === null) lastTime = timestamp;

      // Normalize speed across different refresh rates
      const delta = Math.min(timestamp - lastTime, 64);
      lastTime = timestamp;

      // Measure the first duplicated group.
      const firstGroup = row.firstElementChild;
      const loopWidth = firstGroup
        ? firstGroup.getBoundingClientRect().width + 24
        : 0;

      if (loopWidth > 0) {
        offset = (offset + speed * (delta / 16.667)) % loopWidth;
        row.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, items]);

  return (
    <div
      className={`absolute ${position} flex w-max whitespace-nowrap`}
      aria-hidden="true"
    >
      <div
        ref={rowRef}
        className="flex w-max gap-6 will-change-transform"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-6 shrink-0"
          >
            {items.map((name, index) => (
              <SectorTile
                key={`${copy}-${index}`}
                name={name}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Building For Section
const Target = ({
  buttonText = "Get in touch",
  buttonHref = "#contact",
  title = "Building for",
  subtitle = "Organisations where operations are complex, regulated and data heavy. We are starting with oil and gas.",
  topRow = defaultTopRow,
  bottomRow = defaultBottomRow,
}) => {
  return (
    <section
      id="sectors"
      className="w-full py-24 bg-white scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[680px] mx-auto px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="flex flex-col items-center mb-20"
        >
          <div className="flex flex-col items-center gap-4">

            <h2
              className="text-[40px] leading-tight font-normal text-[#222222] text-center tracking-tight mb-0"
              style={{
                fontFamily: "Figtree, sans-serif",
                fontWeight: 400,
              }}
            >
              {title}
            </h2>

            <p
              className="text-lg leading-7 text-[#666666] text-center max-w-[600px] mt-2"
              style={{
                fontFamily: "Figtree, sans-serif",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Get in Touch Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="flex gap-3 mt-6"
          >
            <a
              href={buttonHref}
              className="inline-block px-5 py-2.5 rounded-full bg-white text-[#222222] text-[15px] font-medium leading-6 text-center whitespace-nowrap transition-all duration-75 ease-out w-[182px] cursor-pointer hover:shadow-lg"
              style={{
                boxShadow:
                  "0 -1px 0 0 rgb(181, 181, 181) inset, -1px 0 0 0 rgb(227, 227, 227) inset, 1px 0 0 0 rgb(227, 227, 227) inset, 0 1px 0 0 rgb(227, 227, 227) inset",
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.06) 80%, rgba(255, 255, 255, 0.12))",
              }}
            >
              {buttonText}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Accessible Sector List */}
      <ul className="sr-only">
        {sectors.map((sector) => (
          <li key={sector}>
            {sector}
            {sector === CURRENT_FOCUS
              ? " (current focus)"
              : ""}
          </li>
        ))}
      </ul>

      {/* Animated Sector Carousel */}
      <div
        className="relative h-[268px] -mt-6 overflow-hidden"
        aria-hidden="true"
      >
        {/* Top Scrolling Row */}
        <CarouselRow
          items={topRow}
          speed={0.5}
          position="top-6"
        />

        {/* Bottom Scrolling Row */}
        <CarouselRow
          items={bottomRow}
          speed={0.65}
          position="top-[148px]"
        />

        {/* Left Fade */}
        <div
          className="absolute inset-y-0 left-0 w-24 sm:w-60 z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0))",
          }}
        />

        {/* Right Fade */}
        <div
          className="absolute inset-y-0 right-0 w-24 sm:w-60 z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255, 255, 255, 0), rgb(255, 255, 255))",
          }}
        />
      </div>
    </section>
  );
};

export default Target;
