
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Product Information
const product = {
  name: "OpsEye",
  description:
    "An operational and compliance intelligence platform for Ghana's downstream petroleum sector. OpsEye brings operator reporting and operational data together in one place, reconciles the two, and surfaces variances, stock alerts and reporting gaps.",
  features: [
    "Operational reporting",
    "Reconciliation",
    "Compliance monitoring",
  ],
  statement:
    "Built around how Ghana's downstream sector actually operates.",
  href: "#contact",
};

// Feature Badge
const FeatureBadge = ({ name }) => (
  <div className="flex items-center gap-2 bg-white/75 shadow-sm border border-black/5 rounded-lg px-2 py-1 text-sm font-medium text-[#202020]">
    {name}
  </div>
);

// Animated Product Overview Card
const ProductOverviewCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    }}
    className="w-full max-w-[380px] rounded-xl p-6 backdrop-blur-xl"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      boxShadow:
        "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
      filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
    }}
  >
    <div className="flex flex-col space-y-5">

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#202020]">
          OpsEye
        </h4>
        <span className="text-xs text-gray-500">
          In development
        </span>
      </div>

      {/* Feature List */}
      <div className="space-y-4">
        {product.features.map((feature, index) => (
          <div
            key={feature}
            className="flex items-center justify-between p-3 bg-gray-100/60 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  index === 0
                    ? "bg-black"
                    : index === 1
                    ? "bg-neutral-500"
                    : "bg-neutral-300"
                }`}
              />

              <span className="text-sm text-[#202020]">
                {feature}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Variances, stock alerts and reporting gaps
        </div>
      </div>

    </div>
  </motion.div>
);

// Main Products Section
const Products = () => {
  return (
    <section
      id="products"
      className="w-full min-h-screen bg-gradient-to-br from-white via-white to-gray-100/30 flex items-center justify-center py-24 px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-7xl w-full mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-[40px] leading-tight font-normal text-[#202020] mb-6 tracking-tight"
            style={{
              fontFamily: "Figtree, sans-serif",
              fontWeight: 400,
            }}
          >
            Our products
          </h2>
        </div>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Product Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
              opacity: {
                duration: 0.2,
              },
            }}
            className="space-y-8"
          >
            <div className="space-y-6">

              {/* Product Name */}
              <h3
                className="text-[28px] leading-none tracking-tight text-gray-500"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontWeight: 600,
                }}
              >
                {product.name}
              </h3>

              {/* Product Description */}
              <p
                className="text-2xl sm:text-[32px] leading-tight tracking-tight text-[#202020]"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontWeight: 400,
                }}
              >
                {product.description}
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <FeatureBadge
                    key={feature}
                    name={feature}
                  />
                ))}
              </div>

              {/* Product Statement */}
              <blockquote className="border-l-4 border-black pl-6 py-2">
                <p
                  className="text-lg leading-7 text-gray-700 italic"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                  }}
                >
                  "{product.statement}"
                </p>
              </blockquote>

            </div>

            {/* Learn More Button */}
            <a
              href={product.href}
              className="inline-flex items-center gap-1 cursor-pointer text-white bg-black rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-in-out hover:rounded-2xl group"
            >
              Learn more

              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </a>

          </motion.div>

          {/* Right Product Overview */}
          <div className="relative min-h-[350px] lg:h-[500px] flex items-center justify-center">
            <ProductOverviewCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Products;
