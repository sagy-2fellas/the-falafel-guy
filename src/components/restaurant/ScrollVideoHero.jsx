import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Phone, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const VIDEO_DESKTOP = '/d39094fc052bd24adc6a66289512c0c6_1774563595_pvtwmj6q.mp4';
const VIDEO_MOBILE = '/kling_20260327_作品_shot_1_2s__1926_3.mp4';
const LOGO_SRC = '/image_1774566475171_khgncb.png';

const DESKTOP_CONFIG = {
  frames: 120,
  scrollHeight: 350, // vh
  maxCanvasWidth: null, // use native resolution
};

const MOBILE_CONFIG = {
  frames: 60,
  scrollHeight: 300, // vh — snappier on touch
  maxCanvasWidth: 720, // scale down to 720px wide
};

export default function ScrollVideoHero({ onScrollToContact }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textBlocksRef = useRef([]);
  const logoCtaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const overlayRef = useRef(null);
  const framesRef = useRef([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const isMobile = useIsMobile();

  // Wait for isMobile to resolve (starts as undefined)
  const isMobileResolved = typeof isMobile === 'boolean';
  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  const videoSrc = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;

  // Extract frames from video at load time
  useEffect(() => {
    if (!isMobileResolved) return; // wait for mobile detection

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    video.src = videoSrc;

    let cancelled = false;

    video.addEventListener('loadedmetadata', async () => {
      if (cancelled) return;

      let w = video.videoWidth;
      let h = video.videoHeight;

      // Scale down on mobile to save memory
      if (config.maxCanvasWidth && w > config.maxCanvasWidth) {
        const scale = config.maxCanvasWidth / w;
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }

      canvas.width = w;
      canvas.height = h;

      const duration = video.duration;
      const frames = [];
      const totalFrames = config.frames;

      for (let i = 0; i < totalFrames; i++) {
        if (cancelled) return;
        const time = (i / (totalFrames - 1)) * duration;

        await new Promise((resolve) => {
          const onSeeked = () => {
            video.removeEventListener('seeked', onSeeked);
            resolve();
          };
          video.addEventListener('seeked', onSeeked);
          video.currentTime = time;
        });

        ctx.drawImage(video, 0, 0, w, h);
        const bitmap = await createImageBitmap(canvas);
        frames.push(bitmap);
        setLoadProgress(Math.round(((i + 1) / totalFrames) * 100));
      }

      framesRef.current = frames;
      ctx.drawImage(frames[0], 0, 0, w, h);
      setIsReady(true);
    });

    return () => {
      cancelled = true;
      video.src = '';
    };
  }, [isMobileResolved, isMobile]);

  // Scroll handler — direct DOM, no React state
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

    let ticking = false;
    let lastFrameIndex = -1;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;

        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        const fraction = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;

        // Paint frame
        const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(fraction * (totalFrames - 1))));
        if (frameIndex !== lastFrameIndex) {
          ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
          lastFrameIndex = frameIndex;
        }

        // Hide video background once the logo/banner is fully visible
        const bannerVisible = fraction >= 0.73; // logo fade-in completes around here
        canvas.style.opacity = bannerVisible ? '0' : '1';
        if (overlayRef.current) overlayRef.current.style.opacity = bannerVisible ? '0' : '1';

        // Text blocks — continuously slide from top to bottom, scroll-driven position
        textBlocksRef.current.forEach((el, i) => {
          if (!el) return;
          const { start, end } = TEXT_BLOCKS[i];
          if (fraction >= start && fraction <= end) {
            const p = (fraction - start) / (end - start);

            // Opacity: quick fade in at start, slow fade out at end
            let opacity;
            if (p < 0.1) {
              opacity = p / 0.1;
            } else if (p > 0.92) {
              opacity = (1 - p) / 0.08;
            } else {
              opacity = 1;
            }

            // Position: slides from top of screen to bottom, driven by scroll
            // At p=0 starts at -80px (above), at p=1 ends at +120px (below)
            const ty = -80 + (p * 200);

            el.style.opacity = Math.max(0, Math.min(1, opacity));
            el.style.transform = `translateY(${ty}px)`;
          } else {
            el.style.opacity = '0';
            el.style.transform = fraction < start ? 'translateY(-80px)' : 'translateY(120px)';
          }
        });

        // Logo + CTA (fade in, stay visible until next section covers)
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
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isReady]);

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
        style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.4)', pointerEvents: 'none' }}
      />

      {/* Scroll container */}
      <div ref={containerRef} style={{ position: 'relative', zIndex: 2, height: `${config.scrollHeight}vh` }}>

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
