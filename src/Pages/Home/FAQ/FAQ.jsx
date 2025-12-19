import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useTheme from '../../../hooks/useTheme';

const faqs = [
  {
    question: '💳 How do payments work?',
    answer:
      'All payments are securely processed through Stripe. If you win a contest, your reward is transferred instantly to your account.',
  },
  {
    question: '🏆 How are winners selected?',
    answer:
      'Winners are chosen by contest creators based on predefined rules, creativity, and submission quality.',
  },
  {
    question: '🔄 What is the refund policy?',
    answer:
      'Entry fees are non-refundable once the contest deadline has passed, as the judging process begins immediately.',
  },
];

const FAQ = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className={`relative py-28 overflow-hidden`}>
      <div className="relative max-w-4xl mx-auto px-4">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <span
            className={`inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold
            ${
              isDark
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'bg-indigo-100 text-indigo-600'
            }`}
          >
            ❓ Support Center
          </span>

          <h2
            className={`text-4xl md:text-5xl font-extrabold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Frequently Asked{' '}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>{' '}
          </h2>

          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Quick answers to the most common questions about ContestHub.
          </p>
        </div>

        {/* ===== FAQ STACK ===== */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`relative rounded-3xl p-6 md:p-7 border transition-all duration-500
                ${
                  isDark
                    ? 'bg-gray-900/70 border-gray-700/60'
                    : 'bg-white/80 border-gray-200'
                }
                ${isOpen ? 'shadow-xl scale-[1.01]' : 'shadow-md'}
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3
                    className={`text-lg md:text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {faq.question}
                  </h3>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                    ${
                      isOpen
                        ? 'bg-indigo-500 text-white rotate-180'
                        : isDark
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-4'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p
                    className={`overflow-hidden leading-relaxed text-base ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>

                {/* Accent Line */}
                <div
                  className={`absolute left-0 top-6 bottom-6 w-1 rounded-full transition-opacity
                  ${
                    isOpen
                      ? 'opacity-100 bg-gradient-to-b from-indigo-500 to-purple-500'
                      : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
