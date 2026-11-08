"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BRUSH = 26;
const REVEAL_AT = 0.48;

function paintFoil(ctx, width, height) {
  const wash = ctx.createLinearGradient(0, 0, width, height);
  wash.addColorStop(0, "#c9a14a");
  wash.addColorStop(0.28, "#f3de9a");
  wash.addColorStop(0.52, "#b88932");
  wash.addColorStop(0.78, "#e8c86a");
  wash.addColorStop(1, "#a67c2a");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "#fff6d2";
  ctx.lineWidth = 7;
  for (let x = -height; x < width + height; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#6b3e1e";
  for (let i = 0; i < 90; i += 1) {
    const px = ((i * 67) % width) + 0.5;
    const py = ((i * 41) % height) + 0.5;
    ctx.fillRect(px, py, 1.2, 1.2);
  }
  ctx.restore();
}

export default function ScratchDate({ date }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hint, setHint] = useState(true);
  const [done, setDone] = useState(false);

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || done) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    paintFoil(ctx, width, height);
  }, [done]);

  useEffect(() => {
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    return () => window.removeEventListener("resize", sizeCanvas);
  }, [sizeCanvas]);

  const point = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const box = canvas.getBoundingClientRect();
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  };

  const scratch = (from, to) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !to) return;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH;
    ctx.beginPath();
    if (from) ctx.moveTo(from.x, from.y);
    else ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, BRUSH / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const clearedAmount = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return 0;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    const step = 16;
    for (let i = 3; i < data.length; i += step) {
      if (data[i] < 40) clear += 1;
    }
    return clear / (data.length / step);
  };

  const finishIfReady = () => {
    if (clearedAmount() < REVEAL_AT) return;
    const canvas = canvasRef.current;
    if (canvas) canvas.style.opacity = "0";
    window.setTimeout(() => setDone(true), 320);
  };

  const onPointerDown = (event) => {
    if (done) return;
    drawing.current = true;
    setHint(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    const next = point(event);
    last.current = next;
    scratch(next, next);
  };

  const onPointerMove = (event) => {
    if (!drawing.current || done) return;
    const next = point(event);
    scratch(last.current, next);
    last.current = next;
    if (clearedAmount() >= REVEAL_AT) finishIfReady();
  };

  const onPointerUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    finishIfReady();
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto mt-2 min-h-[3.4rem] w-full select-none"
    >
      <p className="px-2 py-2.5 font-serif text-[1.15rem] leading-snug text-brown">
        {date}
      </p>
      {done ? null : (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1] h-full w-full cursor-grab touch-none rounded-sm transition-opacity duration-300 active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
          {hint ? (
            <p className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center font-display text-[0.58rem] font-medium uppercase tracking-[0.32em] text-[#5c3a16]/80">
              Scratch to reveal
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
