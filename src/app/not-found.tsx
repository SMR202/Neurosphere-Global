import { Action, Intro } from "@/components/site/primitives";
export default function NotFound() {
  return (
    <>
      <Intro
        title="This page is not available."
        description="It may be opening soon. Go to the home page or join the waitlist."
      >
        <div className="hero-actions">
          <Action href="/">Go to the home page</Action>
          <Action href="/join" secondary>
            Join the waitlist
          </Action>
        </div>
      </Intro>
    </>
  );
}
