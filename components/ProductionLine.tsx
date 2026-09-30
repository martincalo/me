"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import s from "./ProductionLine.module.css";

const cx = (...names: string[]) => names.join(" ");

// Geometry (viewBox units): stations every 140, starting 100 in.
const SPACING = 140;
const width = (stations: number) => 200 + SPACING * (stations - 1);

/**
 * Stations OP10, OP20… on a conveyor under an MES data line, with robot arms
 * working between them. The server HTML is the static state; once hydrated the
 * animation runs only while in view, and never with reduced motion.
 *
 * `cover`: a longer line that fills its parent like a background video (sized
 * for a wide, short story header; phones see the middle few stations).
 */
export function ProductionLine({
  className = "",
  cover = false,
}: {
  className?: string;
  cover?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const stations = cover ? 11 : 3;
  const w = width(stations);

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

  // Travel distances scale with the line; durations scale too, so parts and
  // data packets move at the same speed whatever the length.
  const travel = {
    "--part-travel": `${w - 56}px`,
    "--part-duration": `${(9 * (w - 56)) / 424}s`,
    "--packet-travel": `${w - 60}px`,
    "--packet-duration": `${(4.5 * (w - 60)) / 420}s`,
  } as CSSProperties;

  return (
    <svg
      ref={ref}
      className={cx(s.root, cover ? s.cover : "", className)}
      style={travel}
      viewBox={`0 0 ${w} 300`}
      preserveAspectRatio={cover ? "xMidYMid slice" : undefined}
      aria-hidden="true"
      focusable="false"
      data-playing="false"
    >
      <Line stations={stations} w={w} />
    </svg>
  );
}

function Line({ stations, w }: { stations: number; w: number }) {
  const xs = Array.from({ length: stations }, (_, i) => 100 + i * SPACING);
  const partDuration = (9 * (w - 56)) / 424;
  const parts = Math.max(3, Math.round(partDuration / 3));
  const rollers = Math.floor((w - 40) / 44);

  return (
    <>
      {/* MES data line */}
      <text className={s.label} x="20" y="40">
        MES
      </text>
      <line className={s.line} x1="20" y1="56" x2={w - 20} y2="56" />
      {[0, 1].map((i) => (
        <rect
          key={i}
          className={cx(s.accent, s.anim, s.packet)}
          x="22"
          y="53"
          width="10"
          height="6"
          rx="2"
          style={{ animationDelay: `${-i * 2.6}s` }}
        />
      ))}

      {xs.map((x, i) => (
        <g key={x}>
          <line className={s.dashed} x1={x} y1="64" x2={x} y2="126" />
          <circle className={cx(s.line, s.stageFill)} cx={x} cy="56" r="7" />
          <circle
            className={cx(s.accent, s.anim, s.light)}
            cx={x}
            cy="56"
            r="3.5"
            style={{ animationDelay: `${(i % 3) * 0.6}s` }}
          />
          {/* Station frame and tool */}
          <rect
            className={s.line}
            x={x - 42}
            y="126"
            width="84"
            height="60"
            rx="6"
          />
          <text className={cx(s.label, s.detail)} x={x - 32} y="146">
            {`OP${(i + 1) * 10}`}
          </text>
          <g
            className={cx(s.anim, s.tool)}
            style={{ animationDelay: `${-i}s` }}
          >
            <line className={s.line} x1={x} y1="186" x2={x} y2="200" />
            <rect
              className={s.ink}
              x={x - 8}
              y="198"
              width="16"
              height="4"
              rx="1"
            />
          </g>

          {/* Robot arm in the gap after each station (not after the last). */}
          {i < stations - 1 && (
            <RobotArm x={x + SPACING / 2} delay={-i * 0.9} />
          )}
        </g>
      ))}

      {/* Parts on the conveyor */}
      {Array.from({ length: parts }, (_, i) => (
        <rect
          key={i}
          className={cx(s.accent, s.anim, s.part)}
          x="24"
          y="208"
          width="16"
          height="14"
          rx="2"
          style={{ animationDelay: `${(-i * partDuration) / parts}s` }}
        />
      ))}

      {/* Conveyor belt and rollers */}
      <rect
        className={s.line}
        x="20"
        y="222"
        width={w - 40}
        height="20"
        rx="10"
      />
      {Array.from({ length: rollers }, (_, i) => (
        <g key={i} className={cx(s.anim, s.roller, i % 2 ? s.detail : "")}>
          <circle className={s.faint} cx={42 + i * 44} cy="232" r="5" />
          <line
            className={s.faint}
            x1={42 + i * 44}
            y1="228"
            x2={42 + i * 44}
            y2="236"
          />
        </g>
      ))}
      <line
        className={cx(s.faint, s.detail)}
        x1="20"
        y1="266"
        x2={w - 20}
        y2="266"
      />
    </>
  );
}

/** Two-link arm on a base just above the conveyor, swinging over the line. */
function RobotArm({ x, delay }: { x: number; delay: number }) {
  return (
    <g>
      <rect className={s.line} x={x - 9} y="194" width="18" height="8" rx="2" />
      <g className={cx(s.anim, s.arm)} style={{ animationDelay: `${delay}s` }}>
        <line className={s.line} x1={x} y1="194" x2={x} y2="160" />
        <circle className={cx(s.line, s.stageFill)} cx={x} cy="160" r="3.5" />
        <line className={s.line} x1={x} y1="160" x2={x + 16} y2="150" />
        <circle className={s.accent} cx={x + 16} cy="150" r="2.5" />
      </g>
    </g>
  );
}
