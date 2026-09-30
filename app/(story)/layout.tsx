// Story pages: no site header; the story header's back link returns to the
// homepage section the reader came from.
export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {children}
    </main>
  );
}
