 > TASK                                                                 │
│   Wire the homepage “Begin” CTA to a new page /begin (black            │
│   background) that loads this YouTube embed full-bleed and auto-plays  │
│   :https://www.youtube.com/embed/-qbKcdy5s-U?si=63uCuQKKTPv8qakwUse    │
│   App Router (Next.js), Tailwind, and responsive iframe best           │
│   practices.                                                           │
│                                                                        │
│   REQUIREMENTS                                                         │
│       •    Create app/begin/page.tsx: full-screen black background,    │
│   centered responsive player.                                          │
│       •    Use autoplay-safe params:                                   │
│   autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1.              │
│       •    Ensure the iframe is responsive (16:9 wrapper) and fills    │
│   width on mobile/desktop.                                             │
│       •    Update the homepage CTA to navigate to /begin (anchor link  │
│   preferred).                                                          │
│       •    No layout shift, no scrollbars around the video. Keep text  │
│   white if any.                                                        │
│       •    Accessibility: title on iframe, proper <a> for CTA, focus   │
│   order intact.                                                        │
│                                                                        │
│   CODE CHANGES                                                         │
│       1.    Create app/begin/page.tsx// app/begin/page.tsx             │
│   export default function BeginPage() {                                │
│     const src =                                                        │
│       "https://www.youtube.com/embed/-qbKcdy5s-U?si=63uCuQKKTPv8qakw&  │
│   autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1";             │
│                                                                        │
│     return (                                                           │
│       <main className="min-h-[100svh] bg-black text-white flex         │
│   items-center justify-center p-0">                                    │
│         <div className="relative w-full max-w-6xl aspect-video">       │
│           <iframe                                                      │
│             className="absolute inset-0 h-full w-full"                 │
│             src={src}                                                  │
│             title="GLADIATOR LIPO — intro video"                       │
│             allow="accelerometer; autoplay; clipboard-write;           │
│   encrypted-media; gyroscope; picture-in-picture; web-share"           │
│             allowFullScreen                                            │
│           />                                                           │
│         </div>                                                         │
│       </main>                                                          │
│     );                                                                 │
│   }    2.    Update homepage CTA to link to /begin                     │
│   (Wherever the “Begin” button is rendered on the hero page)  
<a
  href="/begin"
  className="mt-8 inline-block rounded-md border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition"
>
  Begin
</a>
	3.	(Optional) Ensure Spline stays behind content on the homepage
(Already done if using a fixed background; keep CTA as a normal <a> so it’s keyboard-accessible.)

NOTES
	•	iOS/Chrome auto-play requires the video to start muted; the user can enable sound manually after playback begins.
	•	If you prefer programmatic navigation, you can wrap the CTA in a client component and call router.push('/begin'), but a plain <a href="/begin"> is simpler and accessible.

ACCEPTANCE
	•	Click “Begin” → navigates to /begin.
	•	Page is black; video fills a centered 16:9 area and starts playing muted.
	•	No scrollbars or layout jump when the iframe loads.
	•	Works on mobile (plays inline, not full-screen takeover).

⸻

If you also want the video to cover the entire viewport (edge-to-edge) instead of a centered container, swap the wrapper with:
<main className="min-h-[100svh] bg-black">
  <div className="fixed inset-0">
    <iframe
      className="absolute inset-0 h-full w-full"
      src={src}
      title="GLADIATOR LIPO — intro video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
</main>