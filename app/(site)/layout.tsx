import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// Homepage: the site header sits over the hero, so the wall shows behind it.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header overlay />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer stage />
    </>
  );
}
