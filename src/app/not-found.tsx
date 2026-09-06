import { TextLink } from "@/components/editorial";
export default function NotFound() {
  return (
    <div className="container not-found">
      <h1>Page not found.</h1>
      <p>
        The page may have moved. Explore the research library or return to the
        homepage.
      </p>
      <TextLink href="/">Return home</TextLink>
    </div>
  );
}
