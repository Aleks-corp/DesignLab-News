export default function BtnBack({ handleBack }: { handleBack: () => void }) {
  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 h-8 mb-8 text-muted hover:text-hover transition text-base cursor-pointer"
      style={{ width: "fit-content" }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span>Повернутись назад</span>
    </button>
  );
}
