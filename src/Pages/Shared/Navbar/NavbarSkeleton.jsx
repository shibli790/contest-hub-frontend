import Container from "../../../Components/Container";

const NavbarSkeleton = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 min-h-16 py-1.5 bg-background border-b border-border/80">
      <Container>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Navigation Links Skeleton - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Right Side Actions Skeleton */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Skeleton */}
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>

            {/* Profile/Auth Skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="hidden sm:block w-16 h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Mobile Menu Toggle Skeleton */}
            <div className="md:hidden w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavbarSkeleton;
