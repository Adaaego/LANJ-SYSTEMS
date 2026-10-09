
import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

// Default FAQ Content
const defaultFAQs = [
  {
    question: "Does LANJ build software for specific industries?",
    answer:
      "We build enterprise and institutional software for organisations with complex operations. Our current focus is Ghana's downstream petroleum sector through OpsEye, and we will expand to other areas as we learn where our approach adds the most value.",
  },
  {
    question: "Does LANJ work with regulators?",
    answer:
      "Yes. We build tools that give regulators clearer visibility into operations and reporting, and we are open to conversations with regulatory bodies.",
  },
  {
    question: "Does LANJ work where connectivity is unreliable?",
    answer:
      "Yes. We design for real conditions, including power and network interruptions, so data is captured and synced reliably.",
  },
  {
    question: "Is OpsEye available now?",
    answer:
      "OpsEye is currently in development and being validated with industry stakeholders. Get in touch if you would like to learn more or take part.",
  },
];

const Faq = ({
  title = "Frequently asked questions",
  faqs = defaultFAQs,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqId = useId();

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="w-full py-24 px-6 md:px-10 lg:px-16 xl:px-20 bg-white scroll-mt-20"
    >
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Section Heading */}
          <div className="lg:col-span-4">
            <h2
              className="text-3xl sm:text-[40px] leading-tight font-normal text-[#202020] tracking-tight lg:sticky lg:top-24"
              style={{
                fontFamily: "Figtree, sans-serif",
                fontWeight: 400,
              }}
            >
              {title}
            </h2>
          </div>

          {/* FAQ Questions */}
          <div className="lg:col-span-8 min-w-0">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `${faqId}-answer-${index}`;

              return (
                <div
                  key={`${faq.question}-${index}`}
                  className="border-b border-[#e5e5e5] last:border-b-0"
                >
                  {/* Question Button */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span
                      className="text-lg leading-7 text-[#202020] pr-8"
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {faq.question}
                    </span>

                    {/* Animated Plus Icon */}
                    <motion.span
                      animate={{
                        rotate: isOpen ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="flex-shrink-0"
                    >
                      <Plus
                        className="w-6 h-6 text-[#202020]"
                        strokeWidth={1.5}
                      />
                    </motion.span>
                  </button>

                  {/* Expandable Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        id={answerId}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-8 sm:pr-12">
                          <p
                            className="text-lg leading-6 text-[#666666]"
                            style={{
                              fontFamily: "Figtree, sans-serif",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Faq;
