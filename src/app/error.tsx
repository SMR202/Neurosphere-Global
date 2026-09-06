"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container not-found">
      <h1>Something interrupted this page.</h1>
      <p>Please try loading it again.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
