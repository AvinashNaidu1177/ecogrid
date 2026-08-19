'use client';

import React, { useState, useEffect, Component, ReactNode } from 'react';
import Spline from '@splinetool/react-spline';
import { FallbackGrid3D } from './FallbackGrid3D';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("Spline 3D Scene Runtime Notice (rendering Fallback 3D Grid):", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SplineCanvasProps {
  sceneUrl?: string;
  onSceneLoaded?: () => void;
}

export function SplineCanvas({ 
  sceneUrl = "https://prod.spline.design/BnUV6Mx0JWo8K7xx/scene.splinecode",
  onSceneLoaded 
}: SplineCanvasProps) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(motionQuery.matches);

      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // On mobile or reduced motion, skip 3D webgl rendering for battery/performance savings
  if (hasError || isReducedMotion || isMobile) {
    return <FallbackGrid3D />;
  }

  return (
    <SplineErrorBoundary fallback={<FallbackGrid3D />}>
      <div className="relative w-full h-[450px] lg:h-[550px] rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950/80 shadow-2xl">
        {!loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
            <div className="flex flex-col items-center space-y-3" aria-live="polite">
              <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
              <span className="text-xs font-mono text-emerald-400 animate-pulse">
                Loading city intelligence 3D scene…
              </span>
            </div>
          </div>
        )}
        <Spline
          scene={sceneUrl}
          onLoad={() => {
            setLoaded(true);
            if (onSceneLoaded) onSceneLoaded();
          }}
          onError={() => {
            setHasError(true);
            setLoaded(true);
          }}
          className="w-full h-full"
        />
      </div>
    </SplineErrorBoundary>
  );
}
