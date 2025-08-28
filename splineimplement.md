TASK
My hero should use the latest Spline scene (no extra text/buttons). Use this URL:
https://prod.spline.design/6s3QjaKZREdGtVKe/scene.splinecode

ISSUE
I’m still seeing old UI because of cache and leftover overlay components.

DO THIS
	1.	Replace the hero with @splinetool/react-spline/next, full-screen, fixed behind content.
	2.	Bust cache by appending a version query (updateable string).
	3.	Remove any HTML overlays that contain “GLADIATOR LIPO”, “BEGIN”, etc.
	4.	Add a prefers-reduced-motion fallback image.
	5.	Ensure no CLS, mobile-friendly.

CODE CHANGES TO MAKE
	•	Create/replace app/page.tsx with:
    // app/page.tsx
import Spline from '@splinetool/react-spline/next';

const SCENE_URL =
  'https://prod.spline.design/6s3QjaKZREdGtVKe/scene.splinecode?v=rev1'; // bump rev on each publish

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Spline background */}
      <div className="fixed inset-0">
        <Spline scene={SCENE_URL} />
      </div>

      {/* Reduced-motion poster */}
      <img
        src="/poster.jpg"
        alt=""
        className="fixed inset-0 w-full h-full object-cover hidden motion-reduce:block"
      />

      {/* (No overlay text or buttons) */}
      <div className="h-[100svh]" />
    </main>
  );
}
	•	Ensure global styles (Tailwind) don’t add filters to <main> or ancestors.

CLEANUP
	•	Search the repo for these strings and delete their components/usages if present:
	•	GLADIATOR LIPO
	•	Innovation. Science. Art.
	•	Begin
	•	HeroOverlay, HeroSpline, or any custom hero overlay files

VERIFY
	•	Hard reload: Cmd/Ctrl+Shift+R.
	•	If still stale: stop dev server, delete .next folder, restart.
	•	Confirm the Spline Public URL shows no text; then ensure the app matches.

OPTIONAL FALLBACK (if React wrapper misbehaves)
Provide an alternate page using the web component:
// app/page.tsx (alt)
import Script from 'next/script';
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.52/build/spline-viewer.js" />
      <spline-viewer
        url="https://prod.spline.design/6s3QjaKZREdGtVKe/scene.splinecode?v=rev1"
        style={{ position:'fixed', inset:0, width:'100%', height:'100%' }}
      />
      <img src="/poster.jpg" alt="" className="fixed inset-0 w-full h-full object-cover hidden motion-reduce:block" />
      <div className="h-[100svh]" />
    </main>
  );
}
SUCCESS CRITERIA
	•	No Spline text/buttons visible.
	•	Scene fills the viewport, no layout shift.
	•	Poster shows when prefers-reduced-motion is on.
	•	Cache bust works by changing ?v=revN.