import { Header } from "@/components/Header";

// Homepage: site header (wordmark + in-page nav) above the content.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
