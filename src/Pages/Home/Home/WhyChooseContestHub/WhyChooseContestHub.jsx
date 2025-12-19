import { ShieldCheck, Gavel, Globe, Zap, BadgeCheck } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'All payments are protected and processed securely via Stripe.',
  },
  {
    icon: Gavel,
    title: 'Fair Judging',
    desc: 'Transparent and unbiased judging process for every contest.',
  },
  {
    icon: Globe,
    title: 'Global Community',
    desc: 'Join creators and developers from all around the world.',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    desc: 'Winners receive payouts quickly without delays.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Creators',
    desc: 'All contest creators are verified for authenticity.',
  },
];

const WhyChooseContestHub = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose <span className="text-indigo-600">ContestHub?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A trusted platform where creativity meets opportunity.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseContestHub;
