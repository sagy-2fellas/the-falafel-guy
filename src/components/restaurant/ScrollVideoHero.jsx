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

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(3, '0');
      img.src = `${framePath}${num}.jpg`;
      img.onload = () => {
        if (cancelled) return;
        loadedFrames[i] = img;
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          framesRef.current = loadedFrames;
          // Scale canvas for retina — crisp rendering on high-DPI screens
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = loadedFrames[0].naturalWidth;
          const h = loadedFrames[0].naturalHeight;
          canvas.width = w * dpr;
          canvas.height = h * dpr;
          ctx.scale(dpr, dpr);
          ctx.drawImage(loadedFrames[0], 0, 0, w, h);
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

    const TEXT_BLOCKS = [
      { start: 0.02, end: 0.30 },
      { start: 0.25, end: 0.50 },
      { start: 0.45, end: 0.68 },
    ];
    const LOGO_CTA = { start: 0.65, end: 0.95 };

    // Smoothing: track target vs current fraction
    let targetFraction = 0;
    let currentFraction = 0;
    let lastFrameIndex = -1;
    let animId = 0;
    let lastTime = 0;
    // Time-based smoothing — consistent across different frame rates
    // Lower = silkier glide. 6 on mobile gives a butter-smooth feel.
    const SMOOTH_SPEED = isMobile ? 6 : 10;

    // Draw at logical (pre-dpr-scale) dimensions — dpr scaling is handled by ctx.scale
    const drawW = frames[0]?.naturalWidth || canvas.width;
    const drawH = frames[0]?.naturalHeight || canvas.height;

    const updateVisuals = (fraction) => {
      // Paint frame
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(fraction * (totalFrames - 1))));
      if (frameIndex !== lastFrameIndex) {
        ctx.drawImage(frames[frameIndex], 0, 0, drawW, drawH);
        lastFrameIndex = frameIndex;
      }

      // Hide canvas once the logo/banner is fully visible
      const bannerVisible = fraction >= 0.73;
      canvas.style.opacity = bannerVisible ? '0' : '1';
      if (overlayRef.current) overlayRef.current.style.opacity = bannerVisible ? '0' : '1';

      // Intro tagline
      if (introRef.current) {
        if (fraction <= 0.02) {
          introRef.current.style.opacity = '1';
        } else if (fraction <= 0.08) {
          introRef.current.style.opacity = String(1 - (fraction - 0.02) / 0.06);
        } else {
          introRef.current.style.opacity = '0';
        }
      }

      // Text blocks
      textBlocksRef.current.forEach((el, i) => {
        if (!el) return;
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
      {/* Loading screen */}
      {!isReady && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#F8D09F]/30 border-t-[#F8D09F] rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-white/60 text-sm mb-2">Loading experience...</p>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-[#F8D09F] rounded-full"
                style={{ width: `${loadProgress}%`, transition: 'width 0.1s linear' }}
              />
            </div>
            <p className="text-white/40 text-xs mt-2">{loadProgress}%</p>
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
          objectFit: 'cover',
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
