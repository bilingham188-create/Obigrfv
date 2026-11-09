import React, { useEffect, useRef } from 'react';
import { FloodSoundMood } from '../types/flood';

interface WaterRainCanvasProps {
  mood: FloodSoundMood;
  isPlaying: boolean;
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export const WaterRainCanvas: React.FC<WaterRainCanvasProps> = ({ mood, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Setup rain drops
    const count = mood === 'flash-flood' ? 140 : mood === 'storm-surge' ? 180 : 80;
    const drops: RainDrop[] = [];

    for (let i = 0; i < count; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 12 + 15,
        opacity: Math.random() * 0.45 + 0.2
      });
    }

    let flashTimer = 0;
    let flashAlpha = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Random lightning flash in storms
      if (mood === 'storm-surge' || mood === 'flash-flood') {
        flashTimer++;
        if (flashTimer > 150 && Math.random() < 0.02) {
          flashAlpha = 0.4;
          flashTimer = 0;
        }
        if (flashAlpha > 0) {
          ctx.fillStyle = `rgba(220, 240, 255, ${flashAlpha})`;
          ctx.fillRect(0, 0, width, height);
          flashAlpha *= 0.82;
        }
      }

      // Draw rain drops
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(180, 215, 245, 0.5)';

      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 3, d.y + d.length);
        ctx.stroke();

        if (isPlaying) {
          d.y += d.speed;
          d.x -= 1.8;

          if (d.y > height) {
            d.y = -20;
            d.x = Math.random() * (width + 100);
          }
        }
      });

      // Bottom water rise gradient shimmer
      const waterGrad = ctx.createLinearGradient(0, height - 30, 0, height);
      waterGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      waterGrad.addColorStop(1, 'rgba(8, 51, 68, 0.4)');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, height - 30, width, 30);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
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
