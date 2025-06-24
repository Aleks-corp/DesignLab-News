export default function Header() {
  return (
    <header className="flex gap-[24px] flex-wrap items-center justify-between">
      <h1 className="font-serif text-4xl">UX.News</h1>
      <label>
        Search
        <input type="text" className="border-2" />
      </label>
    </header>
  );
}
