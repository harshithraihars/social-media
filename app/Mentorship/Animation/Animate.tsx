import { useEffect, useRef, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: string;
  threshold?: number;
  delay?: number;
}

export default function AnimateOnScroll({
  children,
  animation = 'animate-fade-from-bottom',
  threshold = 0.1,
  delay = 0
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(animation);
            entry.target.classList.remove('opacity-0', 'translate-y-16');
            observer.unobserve(entry.target);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element comes into view
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animation, threshold, delay]);

  return (
    <div ref={ref} className="opacity-0 translate-y-16 transition-all duration-700 ease-out">
      {children}
    </div>
  );
}