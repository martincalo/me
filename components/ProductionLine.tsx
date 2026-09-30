"use client";

import { useEffect, useRef } from "react";
import s from "./ProductionLine.module.css";

const cx = (...names: string[]) => names.join(" ");

/**
 * Stations OP10–OP30 on a conveyor under an MES data line (story header for
 * the automation page). The server HTML is the static state; once hydrated the
 * animation runs only while in view, and never with reduced motion.
 */
export function ProductionLine({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.playing = String(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={cx(s.root, className)}
      viewBox="0 0 480 300"
      aria-hidden="true"
      focusable="false"
      data-playing="false"
    >
      <Line />
    </svg>
  );
}

function Line() {
  const stations = [100, 240, 380];

  return (
    <>
      {/* MES data line */}
      <text className={s.label} x="20" y="40">
        MES
      </text>
      <line className={s.line} x1="20" y1="56" x2="460" y2="56" />
      <rect className={cx(s.accent, s.anim, s.packet)} x="22" y="53" width="10" height="6" rx="2" />

      {stations.map((x, i) => (
        <g key={x}>
          <line className={s.dashed} x1={x} y1="64" x2={x} y2="126" />
          <circle className={cx(s.line, s.stageFill)} cx={x} cy="56" r="7" />
          <circle
            className={cx(s.accent, s.anim, s.light)}
            cx={x}
            cy="56"
            r="3.5"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
          {/* Station frame and tool */}
          <rect className={s.line} x={x - 42} y="126" width="84" height="60" rx="6" />
          <text className={cx(s.label, s.detail)} x={x - 32} y="146">
            {`OP${(i + 1) * 10}`}
          </text>
          <g className={cx(s.anim, s.tool)} style={{ animationDelay: `${-i}s` }}>
            <line className={s.line} x1={x} y1="186" x2={x} y2="200" />
            <rect className={s.ink} x={x - 8} y="198" width="16" height="4" rx="1" />
          </g>
        </g>
      ))}

      {/* Parts on the conveyor */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          className={cx(s.accent, s.anim, s.part)}
          x="24"
          y="208"
          width="16"
          height="14"
          rx="2"
          style={{ animationDelay: `${-i * 3}s` }}
        />
      ))}

      {/* Conveyor belt and rollers */}
      <rect className={s.line} x="20" y="222" width="440" height="20" rx="10" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} className={cx(s.anim, s.roller, i % 2 ? s.detail : "")}>
          <circle className={s.faint} cx={42 + i * 44} cy="232" r="5" />
          <line className={s.faint} x1={42 + i * 44} y1="228" x2={42 + i * 44} y2="236" />
        </g>
      ))}
      <line className={cx(s.faint, s.detail)} x1="20" y1="266" x2="460" y2="266" />
    </>
  );
}
