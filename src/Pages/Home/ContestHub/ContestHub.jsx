import useTheme from '../../../hooks/useTheme';


import SubscribeHeader from './SubscribeHeader';

import SubscribeSection from './SubscribeSection';

const ContestHub = () => {
  const { theme } = useTheme();

  return (
    <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8  transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto">
       <SubscribeHeader/>
        <SubscribeSection theme={theme} />
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes slideUpIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes linearFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default ContestHub;
