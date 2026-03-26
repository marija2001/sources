import { useEffect, useState } from "react";

const useHeaderColor = () => {
  const [headerColor, setHeaderColor] = useState(
    "rgba(19, 17, 16, 0.42)"
  );

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 8) {
        setHeaderColor("#302e2e");
      } else {
        setHeaderColor("rgba(19, 17, 16, 0.42)");
      }
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return headerColor;
};

export default useHeaderColor;
