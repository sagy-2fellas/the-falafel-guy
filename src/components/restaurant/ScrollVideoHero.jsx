import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Phone, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const LOGO_SRC = '/image_1774566475171_khgncb.png';

// Pre-extracted JPG frames for both platforms
const DESKTOP_FRAME_PATH = '/desktop-hero-frames/ezgif-frame-';
const DESKTOP_FRAME_COUNT = 80;
const MOBILE_FRAME_PATH = '/ezgif-580dc0767016926f-jpg/ezgif-frame-';
const MOBILE_FRAME_COUNT = 80;

const DESKTOP_CONFIG = {
  frames: DESKTOP_FRAME_COUNT,
  scrollHeight: 350, // vh
};

const MOBILE_CONFIG = {
  frames: MOBILE_FRAME_COUNT,
  scrollHeight: 200, // vh — completes in ~one full scroll
};

export default function ScrollVideoHero({ onScrollToContact }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textBlocksRef = useRef([]);
  const logoCtaRef = useRef(null);
  const introRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const overlayRef = useRef(null);
  const framesRef = useRef([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const isMobile = useIsMobile();

  // Wait for isMobile to resolve (starts as undefined)
  const isMobileResolved = typeof isMobile === 'boolean';
  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;

  // Load pre-extracted JPG frames (same approach for both mobile and desktop)
  useEffect(() => {
    if (!isMobileResolved) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let cancelled = false;

    const framePath = isMobile ? MOBILE_FRAME_PATH : DESKTOP_FRAME_PATH;
    const totalFrames = config.frames;
    const loadedFrames = new Array(totalFrames);
    let loaded = 0;
    let firstFrameShown = false;

    // Set up canvas size to match viewport at retina resolution
    const setupCanvas = (imgW, imgH) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      ctx.scale(dpr, dpr);
    };

    // Draw image with "cover" behavior — crop to fill, no stretching
    const drawCover = (img) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio = imgW / imgH;
      const vpRatio = vw / vh;

      let sx, sy, sw, sh;
      if (imgRatio > vpRatio) {
        // Image is wider — crop sides
        sh = imgH;
        sw = imgH * vpRatio;
        sx = (imgW - sw) / 2;
        sy = 0;
      } else {
        // Image is taller — crop top/bottom
        sw = imgW;
        sh = imgW / vpRatio;
        sx = 0;
        sy = (imgH - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, vw, vh);
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(3, '0');
      img.src = `${framePath}${num}.jpg`;
      img.onload = () => {
        if (cancelled) return;
        loadedFrames[i] = img;
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));

        // Show first frame immediately — don't wait for all to load
        if (i === 0 && !firstFrameShown) {
          firstFrameShown = true;
          setupCanvas(img.naturalWidth, img.naturalHeight);
          drawCover(img);
        }

        if (loaded === totalFrames) {
          framesRef.current = loadedFrames;
          setIsReady(true);
        }
      };
    }

    return () => { cancelled = true; };
  }, [isMobileResolved, isMobile]);

  // Scroll handler with smooth interpolation
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    const frames = framesRef.current;
    const totalFrames = frames.length;

    // Text blocks — no overlap: each fully exits before the next enters
    const TEXT_BLOCKS = [
      { start: 0.05, end: 0.25 },
      { start: 0.28, end: 0.48 },
      { start: 0.51, end: 0.68 },
    ];
    const LOGO_CTA = { start: 0.68, end: 0.95 };

    // Smoothing: track target vs current fraction
    let targetFraction = 0;
    let currentFraction = 0;
    let lastFrameIndex = -1;
    let animId = 0;
    let lastTime = 0;
    const SMOOTH_SPEED = isMobile ? 6 : 10;

    // Draw image with "cover" behavior — crop to fill viewport, no stretching
    const drawCover = (img) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio = imgW / imgH;
      const vpRatio = vw / vh;

      let sx, sy, sw, sh;
      if (imgRatio > vpRatio) {
        sh = imgH;
        sw = imgH * vpRatio;
        sx = (imgW - sw) / 2;
        sy = 0;
      } else {
        sw = imgW;
        sh = imgW / vpRatio;
        sx = 0;
        sy = (imgH - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, vw, vh);
    };

    const updateVisuals = (fraction) => {
      // Paint frame with cover crop
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(fraction * (totalFrames - 1))));
      if (frameIndex !== lastFrameIndex) {
        drawCover(frames[frameIndex]);
        lastFrameIndex = frameIndex;
      }

      // Once the hero container is fully off-screen, hide fixed elements
      // so they don't bleed through transparent areas (e.g. footer).
      // Use visibility instead of opacity to avoid a black flash —
      // the z-10 content naturally covers them as the user scrolls.
      const containerBottom = container.getBoundingClientRect().bottom;
      const heroOffScreen = containerBottom <= 0;
      const hiddenStyle = heroOffScreen ? 'hidden' : 'visible';

      canvas.style.visibility = hiddenStyle;
      if (overlayRef.current) overlayRef.current.style.visibility = hiddenStyle;

      // Hide canvas once the logo/banner is fully visible
      const bannerVisible = fraction >= 0.73;
      canvas.style.opacity = bannerVisible ? '0' : '1';
      if (overlayRef.current) overlayRef.current.style.opacity = bannerVisible ? '0' : '1';

      // Intro tagline — visible longer so users can read it
      if (introRef.current) {
        introRef.current.style.visibility = hiddenStyle;
        if (fraction <= 0.04) {
          introRef.current.style.opacity = '1';
        } else if (fraction <= 0.12) {
          introRef.current.style.opacity = String(1 - (fraction - 0.04) / 0.08);
        } else {
          introRef.current.style.opacity = '0';
        }
      }

      // Text blocks
      textBlocksRef.current.forEach((el, i) => {
        if (!el) return;
        el.style.visibility = hiddenStyle;
        const { start, end } = TEXT_BLOCKS[i];
        if (fraction >= start && fraction <= end) {
          const p = (fraction - start) / (end - start);

          let opacity;
          if (p < 0.1) {
            opacity = p / 0.1;
          } else if (p > 0.92) {
            opacity = (1 - p) / 0.08;
          } else {
            opacity = 1;
          }

          const ty = -80 + (p * 200);
          el.style.opacity = Math.max(0, Math.min(1, opacity));
          el.style.transform = `translateY(${ty}px)`;
        } else {
          el.style.opacity = '0';
          el.style.transform = fraction < start ? 'translateY(-80px)' : 'translateY(120px)';
        }
      });

      // Logo + CTA
      if (logoCtaRef.current) {
        logoCtaRef.current.style.visibility = hiddenStyle;
        const start = LOGO_CTA.start;
        if (fraction >= start) {
          const fadeRange = 0.08;
          const p = Math.min(1, (fraction - start) / fadeRange);
          const ty = (1 - p) * 40;
          logoCtaRef.current.style.opacity = p;
          logoCtaRef.current.style.transform = `translateY(${ty}px)`;
          logoCtaRef.current.style.pointerEvents = p > 0.3 ? 'auto' : 'none';
        } else {
          logoCtaRef.current.style.opacity = '0';
          logoCtaRef.current.style.transform = 'translateY(40px)';
          logoCtaRef.current.style.pointerEvents = 'none';
        }
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = fraction < 0.05 ? '1' : String(Math.max(0, 1 - fraction * 10));
      }
    };

    // Continuous rAF loop — smoothly interpolates toward the target scroll position
    const tick = (time) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016; // cap at 50ms
      lastTime = time;

      // Time-based lerp — consistent smoothing regardless of device frame rate
      const diff = targetFraction - currentFraction;
      if (Math.abs(diff) > 0.0001) {
        currentFraction += diff * (1 - Math.exp(-SMOOTH_SPEED * dt));
        updateVisuals(currentFraction);
      }
      animId = requestAnimationFrame(tick);
    };

    // Scroll listener just updates the target — no heavy work
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      targetFraction = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    updateVisuals(0);
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, [isReady, isMobile]);

  return (
    <>
      {/* Loading screen with logo */}
      {!isReady && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            <img
              src={LOGO_SRC}
              alt="The Falafel Guy"
              style={{ maxWidth: '280px', width: '60%', marginBottom: '2rem', opacity: 0.9 }}
              draggable={false}
            />
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-[#F8D09F] rounded-full"
                style={{ width: `${loadProgress}%`, transition: 'width 0.1s linear' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Fixed fullscreen canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }}
      />

      {/* Scroll container */}
      <div ref={containerRef} style={{ position: 'relative', zIndex: 2, height: `${config.scrollHeight}vh` }}>

        {/* Intro tagline — visible on load */}
        <div
          ref={introRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 8%',
            willChange: 'opacity',
          }}
        >
          <h1 style={{ color: '#F8D09F' }} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            The Falafel Guy
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-light">
            Sea Point's Authentic Middle Eastern Streatery
          </p>
        </div>

        {/* Text block 1 — left */}
        <div
          ref={el => (textBlocksRef.current[0] = el)}
          style={{ position: 'fixed', top: '50%', left: 0, zIndex: 3, padding: '0 8%', textAlign: 'left', opacity: 0, willChange: 'transform, opacity' }}
        >
          <h2 style={{ color: '#F8D09F' }} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Not Just The Best Deal
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 font-light">The Real Deal</p>
        </div>

        {/* Text block 2 — right */}
        <div
          ref={el => (textBlocksRef.current[1] = el)}
          style={{ position: 'fixed', top: '50%', right: 0, zIndex: 3, padding: '0 8%', textAlign: 'right', opacity: 0, willChange: 'transform, opacity' }}
        >
          <h2 style={{ color: '#F8D09F' }} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            HALAAL
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 font-light">
            Authentic Middle Eastern Streatery
          </p>
        </div>

        {/* Text block 3 — left */}
        <div
          ref={el => (textBlocksRef.current[2] = el)}
          style={{ position: 'fixed', top: '50%', left: 0, zIndex: 3, padding: '0 8%', textAlign: 'left', opacity: 0, willChange: 'transform, opacity' }}
        >
          <h2 style={{ color: '#F8D09F' }} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Served Fresh
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 font-light">
            In the heart of Sea Point
          </p>
        </div>

        {/* Logo + CTA buttons — appear together */}
        <div
          ref={logoCtaRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            willChange: 'transform, opacity',
            pointerEvents: 'none',
          }}
        >
          {/* Logo */}
          <img
            src={LOGO_SRC}
            alt="The Falafel Guy"
            style={{ maxWidth: '500px', width: '80%', marginBottom: '2.5rem' }}
            draggable={false}
          />

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-6">
            <Button
              onClick={() => window.open('https://thefalafelguy.5loyalty.com/', '_blank')}
              className="w-full sm:w-auto text-black font-semibold px-6 sm:px-8 py-3 sm:py-6 text-xs sm:text-base rounded-none transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)', border: 'none' }}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              ORDER FOR PICKUP
            </Button>

            <Button
              onClick={() => window.open('https://www.ubereats.com/store/the-falafel-guy-sea-point/7dkurdw6VSaDuiiHHUImgg?diningMode=DELIVERY', '_blank')}
              className="w-full sm:w-auto text-black font-semibold px-6 sm:px-8 py-3 sm:py-6 text-xs sm:text-base rounded-none transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)', border: 'none' }}
            >
              <Bike className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              UBER EATS
            </Button>

            <Button
              onClick={onScrollToContact}
              variant="outline"
              className="w-full sm:w-auto border-2 text-white font-semibold px-6 sm:px-8 py-3 sm:py-6 text-xs sm:text-base rounded-none transition-all duration-300 transform hover:scale-105"
              style={{ borderColor: '#F8D09F', backgroundColor: 'transparent' }}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              CONTACT US
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/60 text-xs tracking-widest uppercase">Scroll to explore</p>
            <div className="w-5 h-8 border-2 border-[#F8D09F]/50 rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 bg-[#F8D09F] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
