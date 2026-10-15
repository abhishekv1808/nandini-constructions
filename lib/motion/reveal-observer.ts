/**
 * One IntersectionObserver for every `[data-reveal]` element on the page, so <Reveal> and
 * <SplitHeading> stay Server Components with zero per-instance JS. A MutationObserver picks up
 * elements added later (route changes, client-rendered content). Reveals run once.
 */
const SELECTOR = '[data-reveal]:not([data-revealed])';

export function startRevealObserver(): () => void {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', '');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
  );

  const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));

  let frame = 0;
  const mo = new MutationObserver(() => {
    if (!frame)
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
  });

  scan();
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    io.disconnect();
    mo.disconnect();
    if (frame) cancelAnimationFrame(frame);
  };
}
