import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const sectors = [
  { name: "Petroleum", icon: "petroleum", focus: true },
  { name: "Agriculture", icon: "agriculture" },
  { name: "Healthcare", icon: "healthcare" },
  { name: "Finance", icon: "finance" },
  { name: "Transport", icon: "transport" },
  { name: "Public administration", icon: "government" },
];

const defaultTopRow = [...sectors, ...sectors];
const defaultBottomRow = [
  ...sectors.slice(3),
  ...sectors.slice(0, 3),
  ...sectors.slice(3),
  ...sectors.slice(0, 3),
];

const benefits = [
  "Understand what is actually happening",
  "Detect discrepancies and losses earlier",
  "Allocate resources more effectively",
  "Identify patterns and opportunities",
  "Make better operational and strategic decisions",
];

const FONT = { fontFamily: "Figtree, sans-serif" };

const icons = {
  petroleum: (
    <>
      <path d="M12 3.2c3.3 4 6 7.1 6 10.3a6 6 0 1 1-12 0c0-3.2 2.7-6.3 6-10.3z" />
      <path d="M9.2 14.2a3 3 0 0 0 2.3 2.6" />
    </>
  ),
  agriculture: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.3-2.4-5.6-6-5.6 0 3.6 2.4 5.6 6 5.6z" />
      <path d="M12 11c0-3 2.2-5.4 6-5.4 0 3.4-2.2 5.4-6 5.4z" />
    </>
  ),
  healthcare: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
  finance: (
    <>
      <rect x="4" y="11" width="4" height="9" rx="1" />
      <rect x="10" y="5" width="4" height="15" rx="1" />
      <rect x="16" y="8" width="4" height="12" rx="1" />
    </>
  ),
  transport: (
    <>
      <path d="M3 6h11v10H3z" />
      <path d="M14 9h4l3 3v4h-7" />
      <circle cx="7.5" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </>
  ),
  government: (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
      <path d="M3 20h18" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
};

const Icon = ({ name, size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {icons[name]}
  </svg>
);

const tileShadow =
  "inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04), 0 4px 8px -2px rgba(0,0,0,0.06), 0 12px 24px -8px rgba(0,0,0,0.08)";
const focusShadow =
  "inset 0 1px 0 rgba(255,255,255,0.16), 0 0 0 1px rgba(0,0,0,1), 0 8px 16px -4px rgba(0,0,0,0.25), 0 20px 32px -12px rgba(0,0,0,0.35)";

const SectorTile = ({ sector }) => {
  const focus = sector.focus;
  return (
    <div
      className={`relative flex items-center gap-3.5 h-24 pl-5 pr-8 rounded-[22px] flex-shrink-0 text-lg ${
        focus ? "text-white" : "text-[#202020]"
      }`}
      style={{
        ...FONT,
        boxShadow: focus ? focusShadow : tileShadow,
        backgroundImage: focus
          ? "linear-gradient(180deg, #2a2a2a 0%, #000000 100%)"
          : "linear-gradient(180deg, #ffffff, #fafafa)",
      }}
    >
      {focus && (
        <span
          className="absolute -top-3 left-5 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[#202020]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.12)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-60 animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
          </span>
          Current focus
        </span>
      )}
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          focus ? "bg-white/10 ring-1 ring-white/15" : "bg-[#f4f4f5] ring-1 ring-black/5"
        }`}
      >
        <Icon name={sector.icon} />
      </span>
      <span className="font-medium tracking-tight">{sector.name}</span>
    </div>
  );
};

const CarouselRow = ({ items, speed, position, direction = 1, pausedRef }) => {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id;
    let offset = 0;
    let last = null;

    const tick = (t) => {
      if (last === null) last = t;
      const delta = Math.min(t - last, 64);
      last = t;

      const group = row.firstElementChild;
      const loop = group ? group.getBoundingClientRect().width + 24 : 0;

      if (loop > 0) {
        if (!pausedRef.current) offset = (offset + speed * (delta / 16.667)) % loop;
        const x = direction === 1 ? -offset : offset - loop;
        row.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [speed, items, direction, pausedRef]);

  return (
    <div className={`absolute ${position} flex w-max whitespace-nowrap`}>
      <div ref={rowRef} className="flex w-max gap-6 will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-6 shrink-0">
            {items.map((sector, i) => (
              <SectorTile key={`${copy}-${i}`} sector={sector} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Target = ({
  buttonText = "Get in touch",
  buttonHref = "#contact",
  title = "Building for",
  subtitle = "Across these sectors, organisations often operate with fragmented information and incomplete visibility.",
  topRow = defaultTopRow,
  bottomRow = defaultBottomRow,
}) => {
  const pausedRef = useRef(false);

  return (
    <section id="sectors" className="w-full py-24 bg-white scroll-mt-20 overflow-hidden">
      <div className="relative">
        {/* Soft grid and glow behind heading and carousel */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,0,0,0.06), transparent 70%), linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 56px 56px, 56px 56px",
            backgroundPosition: "center top",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 40%, #000 35%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 40%, #000 35%, transparent 80%)",
          }}
        />

        <div className="relative max-w-[680px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center mb-20"
          >
            <h2
              className="text-[40px] sm:text-5xl leading-[1.08] text-[#111] text-center tracking-[-0.03em]"
              style={{ ...FONT, fontWeight: 500 }}
            >
              {title}
            </h2>
            <p
              className="text-lg leading-7 text-[#5c5c5c] text-center max-w-[560px] mt-4"
              style={FONT}
            >
              {subtitle}
            </p>
            <a
              href={buttonHref}
              className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              style={{
                ...FONT,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 2px rgba(0,0,0,0.25)",
              }}
            >
              {buttonText}
            </a>
          </motion.div>
        </div>

        <ul className="sr-only">
          {sectors.map((s) => (
            <li key={s.name}>{s.focus ? `${s.name} (current focus)` : s.name}</li>
          ))}
        </ul>

        <div
          className="relative h-[268px] -mt-6 overflow-hidden"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <CarouselRow items={topRow} speed={0.5} position="top-6" direction={1} pausedRef={pausedRef} />
          <CarouselRow items={bottomRow} speed={0.6} position="top-[148px]" direction={-1} pausedRef={pausedRef} />
          <div
            className="absolute inset-y-0 left-0 w-24 sm:w-60 z-10 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(90deg, #fff, rgba(255,255,255,0))" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 sm:w-60 z-10 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0), #fff)" }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[960px] mx-auto px-6 lg:px-8 mt-20"
        style={FONT}
      >
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <h3 className="text-3xl sm:text-[34px] leading-[1.15] font-medium tracking-[-0.025em] text-[#111]">
              LANJ helps organisations:
            </h3>
            <p className="mt-4 text-lg leading-7 text-[#5c5c5c]">
              Sector by sector. Product by product.
            </p>
          </div>
          <ul className="border-t border-black/10">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="border-b border-black/10 py-4 text-lg leading-7 text-[#3a3a3a]"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default Target;