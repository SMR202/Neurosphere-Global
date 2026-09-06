import Link from "next/link";
import { Brand } from "./brand";
import { navigation } from "@/data/site";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <Brand />
          <nav aria-label="Footer">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NeuroSphere Global</p>
          <a href="#main">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
