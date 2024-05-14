import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// function to always display the pages from the top when navigating
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}