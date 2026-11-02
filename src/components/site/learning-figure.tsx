import { copy } from "@/content/client";

export function CredentialFigure() {
  return (
    <figure
      className="credential-figure"
      aria-label="Four features of a micro-credential"
    >
      <div>
        {["Short", "Practical", "Assessed", "Stackable"].map((title, i) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>
              {copy(96 + i)
                .split(". ")
                .slice(1)
                .join(". ")}
            </p>
          </article>
        ))}
      </div>
      <figcaption>
        {copy(100).replace("Clear about what it is. ", "")}
      </figcaption>
    </figure>
  );
}
