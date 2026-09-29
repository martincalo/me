"use client";

import { useEffect, useRef } from "react";
import s from "./AnimatedBackground.module.css";

type Variant = "meter" | "production-line";

const cx = (...names: string[]) => names.join(" ");

/**
 * Decorative SVG illustration. The server HTML is the static state; once
 * hydrated, animations run only while the illustration is in view.
 */
export function AnimatedBackground({ variant }: { variant: Variant }) {
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
      className={s.root}
      viewBox="0 0 480 300"
      aria-hidden="true"
      focusable="false"
      data-playing="false"
    >
      {variant === "meter" ? <Meter /> : <ProductionLine />}
    </svg>
  );
}

function Meter() {
  const digits = ["0", "4", "2", "7"];
  const barHeights = [70, 118, 92, 150, 104, 128];

  return (
    <>
      <defs>
        <clipPath id="meter-digit">
          <rect x="130" y="70" width="22" height="28" />
        </clipPath>
        <clipPath id="meter-window">
          <rect x="44" y="148" width="108" height="26" rx="13" />
        </clipPath>
      </defs>

      {/* Housing */}
      <rect className={s.line} x="24" y="36" width="148" height="228" rx="14" />
      <text className={s.label} x="44" y="60">
        kWh
      </text>

      {/* Counter: four fixed digits + one rolling */}
      {digits.map((d, i) => (
        <g key={i}>
          <rect className={s.faint} x={42 + i * 22} y="70" width="22" height="28" />
          <text className={s.digit} x={48 + i * 22} y="90">
            {d}
          </text>
        </g>
      ))}
      <rect className={s.accentStroke} x="130" y="70" width="22" height="28" />
      <g clipPath="url(#meter-digit)">
        <g className={cx(s.anim, s.roll)}>
          {Array.from({ length: 11 }, (_, n) => (
            <text key={n} className={s.digit} x="136" y={90 + n * 28}>
              {n % 10}
            </text>
          ))}
        </g>
      </g>

      {/* Disc window with the rotating disc's mark */}
      <rect className={s.line} x="44" y="148" width="108" height="26" rx="13" />
      <g clipPath="url(#meter-window)">
        <rect className={cx(s.accent, s.anim, s.discMark)} x="46" y="152" width="10" height="18" rx="2" />
      </g>

      {/* Terminals */}
      <g className={s.detail}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} className={s.faint} x={52 + i * 26} y="226" width="14" height="22" rx="3" />
        ))}
      </g>

      {/* Readings streaming out as data points */}
      <line className={s.dashed} x1="172" y1="161" x2="296" y2="161" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          className={cx(s.accent, s.anim, s.point)}
          cx="180"
          cy="161"
          r="3.5"
          style={{ animationDelay: `${-i * 0.48}s` }}
        />
      ))}

      {/* Pulsing bars */}
      <line className={s.faint} x1="304" y1="250" x2="460" y2="250" />
      {barHeights.map((h, i) => (
        <rect
          key={i}
          className={cx(s.anim, s.bar, i % 2 ? s.accent : s.ink)}
          x={312 + i * 24}
          y={250 - h}
          width="14"
          height={h}
          rx="2"
          style={{ animationDelay: `${-i * 0.37}s`, opacity: i % 2 ? 1 : 0.85 }}
        />
      ))}
    </>
  );
}

function ProductionLine() {
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
