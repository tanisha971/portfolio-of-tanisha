import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = (window.scrollY / totalHeight) * 100;

      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9999] h-1 w-full bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-white to-gray-400 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}