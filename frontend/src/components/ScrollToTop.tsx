import { useEffect, useState } from "react";

type Props = {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
};

export default function ScrollToTopBtn({ scrollContainerRef }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = scrollContainerRef?.current || window;

    const handler = () => {
      const y =
        target === window ? window.scrollY : (target as HTMLElement).scrollTop;
      setVisible(y > window.innerHeight);
    };

    target.addEventListener("scroll", handler);

    return () => {
      target.removeEventListener("scroll", handler);
    };
  }, [scrollContainerRef]);

  const scrollUp = () => {
    const target = scrollContainerRef?.current || window;
    if (target === window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      (target as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      aria-label="Вгору"
      onClick={scrollUp}
      className="fixed bottom-8 right-8 z-50 bg-white shadow-lg rounded-full p-3 border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 9 7-7 7 7" />
        <path d="M12 16V2" />
        <circle cx="12" cy="21" r="1" />
      </svg>
    </button>
  );
}
