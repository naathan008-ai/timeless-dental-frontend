import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll every possible scroll target to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll any element with overflow that might be the container
    const scrollableElements = document.querySelectorAll(
      '[data-scroll-container], main, .scroll-container'
    );
    scrollableElements.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;