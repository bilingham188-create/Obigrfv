import React, { useEffect, useRef } from 'react';
import { SoundMood } from '../types/montage';

interface AtmosphericCanvasProps {
  mood: SoundMood;
  isShaking: boolean;
  isPlaying: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'ash' | 'ember';
}

export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = ({ mood, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = mood === 'cataclysm-explosion' ? 75 : mood === 'warning-rumble' ? 35 : mood === 'eerie-silence' ? 25 : 12;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isEmber = mood === 'cataclysm-explosion' && Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isEmber ? Math.random() * 3 + 1.5 : Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.3) * (mood === 'cataclysm-explosion' ? 3.5 : 1.2),
        speedY: isEmber ? -(Math.random() * 2 + 1) : Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        color: isEmber
          ? `rgb(255, ${Math.floor(Math.random() * 120 + 80)}, 30)`
          : `rgba(200, 195, 190, ${Math.random() * 0.5 + 0.2})`,
        type: isEmber ? 'ember' : 'ash'
      });
    }

    let lightningTimer = 0;
    let lightningAlpha = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Random lightning flash during cataclysm scene
      if (mood === 'cataclysm-explosion') {
        lightningTimer++;
        if (lightningTimer > 180 && Math.random() < 0.03) {
          lightningAlpha = 0.45;
          lightningTimer = 0;
        }
        if (lightningAlpha > 0) {
          ctx.fillStyle = `rgba(220, 235, 255, ${lightningAlpha})`;
          ctx.fillRect(0, 0, width, height);
          lightningAlpha *= 0.82;
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.type === 'ember') {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255, 100, 20, 0.8)';
          ctx.fillStyle = p.color;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = p.color;
        }

        ctx.fill();

        if (isPlaying) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          } else if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          if (p.x > width + 10) {
            p.x = -10;
          } else if (p.x < -10) {
            p.x = width + 10;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mood, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
};
