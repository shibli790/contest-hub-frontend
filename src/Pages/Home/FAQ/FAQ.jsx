import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useTheme from '../../../../hooks/useTheme';

const faqs = [
  {
    question: 'How do payments work?',
    answer:
      'All payments are handled securely through Stripe. Once you win a contest, your prize is processed instantly.',
  },
  {
    question: 'How are winners selected?',
    answer:
      'Winners are selected by contest creators based on the contest rules and submission quality.',
  },
  {
    question: 'What is the refund policy?',
    answer:
      'Entry fees are non-refundable once a contest submission deadline has passed.',
  },
];

const FAQ = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      className={`relative py-24 overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-gray-900 to-gray-950'
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      {/* Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-14">
          <h2
            className={`text-4xl md:text-5xl font-extrabold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Frequently Asked Questions
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Everything you need to know before joining ContestHub.
          </p>
        </div>

        {/* ================= FAQ ITEMS ================= */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`group cursor-pointer rounded-2xl p-6 border backdrop-blur-xl
                transition-all duration-300
                ${
                  isDark
                    ? 'bg-gray-900/60 border-gray-700/60 hover:border-indigo-500/40'
                    : 'bg-white/70 border-gray-200 hover:border-indigo-400/40'
                }`}
              >
                {/* Question */}
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    } ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
                  />
                </div>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-4'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p
                    className={`overflow-hidden leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
