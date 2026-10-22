"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: never hide server HTML or require motion to read it. */
export function MotionDirector() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const active = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          const siblings = Array.from(
            node.parentElement?.children ?? [],
          ).filter((e) => e.hasAttribute("data-reveal"));
          const delay = Math.min(Math.max(0, siblings.indexOf(node)) * 70, 210);
          const animation = node.animate(
            [
              { opacity: 0.5, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 760,
              delay,
              easing: "cubic-bezier(.2,.7,.2,1)",
              fill: "backwards",
            },
          );
          active.add(animation);
          animation.onfinish = () => active.delete(animation);
          observer.unobserve(node);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => {
        if (!node.querySelector("[data-reveal], form")) observer.observe(node);
    });
    const stop = () => {
      if (reduce.matches) {
        observer.disconnect();
        active.forEach((a) => a.cancel());
      }
    };
    reduce.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      active.forEach((a) => a.cancel());
      reduce.removeEventListener("change", stop);
    };
  }, [pathname]);
  return null;
}
