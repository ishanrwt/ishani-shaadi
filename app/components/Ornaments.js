export function GoldDivider() {
  return (
    <div
      className="mx-auto flex w-full max-w-[220px] items-center justify-center gap-2.5 py-2"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/80" />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1.4L10.3 7.7L16.6 9L10.3 10.3L9 16.6L7.7 10.3L1.4 9L7.7 7.7L9 1.4Z"
          stroke="#C9A14A"
          strokeWidth="0.9"
          fill="#C9A14A"
          fillOpacity="0.35"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/80" />
    </div>
  );
}

export function LotusOrnament({ className = "" }) {
  return (
    <svg
      className={`gold-shimmer mx-auto text-gold ${className}`}
      width="42"
      height="28"
      viewBox="0 0 42 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 25C21 25 12 18 12 11.5C12 8.5 14.2 6.5 16.8 7.2C17.6 4.4 19.4 3 21 3C22.6 3 24.4 4.4 25.2 7.2C27.8 6.5 30 8.5 30 11.5C30 18 21 25 21 25Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M21 25C21 25 16.5 16 17 10.5"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path
        d="M21 25C21 25 25.5 16 25 10.5"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path
        d="M21 25V8"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.55"
      />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-gold"
    >
      <path
        d="M12 22s7-7.2 7-12.2A7 7 0 1 0 5 9.8C5 14.8 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="9.8" r="2.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function OrnamentalArch({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 280"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Outer closed arch frame */}
      <path
        d="M28 268V90C28 42 72 16 160 16C248 16 292 42 292 90V268H28Z"
        stroke="#C9A14A"
        strokeWidth="1.4"
        opacity="0.85"
      />
      {/* Inner closed arch frame */}
      <path
        d="M40 256V94C40 52 78 28 160 28C242 28 280 52 280 94V256H40Z"
        stroke="#C9A14A"
        strokeWidth="0.7"
        opacity="0.45"
      />
      {/* Bottom ornamental base line */}
      <path
        d="M28 268H292"
        stroke="#C9A14A"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <path
        d="M40 256H280"
        stroke="#C9A14A"
        strokeWidth="0.7"
        opacity="0.45"
      />
      <circle cx="160" cy="16" r="3.5" fill="#C9A14A" fillOpacity="0.7" />
      <circle cx="28" cy="268" r="2.2" fill="#C9A14A" fillOpacity="0.65" />
      <circle cx="292" cy="268" r="2.2" fill="#C9A14A" fillOpacity="0.65" />
      {[40, 70, 100, 130, 160, 190, 220, 250, 280].map((x) => (
        <circle
          key={x}
          cx={x}
          cy={x === 160 ? 28 : 38}
          r="1.4"
          fill="#C9A14A"
          opacity="0.55"
        />
      ))}
      {[70, 120, 160, 200, 250].map((x) => (
        <circle key={`base-${x}`} cx={x} cy="268" r="1.3" fill="#C9A14A" opacity="0.5" />
      ))}
    </svg>
  );
}

export function FloralCorner({ className = "", flip = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M18 122C28 96 42 78 68 62C86 50 98 36 104 18"
        stroke="#2F5A3D"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <path
        d="M34 118C44 98 58 86 82 74"
        stroke="#C9A14A"
        strokeWidth="0.9"
        opacity="0.65"
      />
      <ellipse cx="72" cy="58" rx="14" ry="10" fill="#D4789A" opacity="0.75" transform="rotate(-28 72 58)" />
      <ellipse cx="54" cy="78" rx="11" ry="8" fill="#E8A0B8" opacity="0.7" transform="rotate(-12 54 78)" />
      <ellipse cx="88" cy="42" rx="9" ry="7" fill="#D4789A" opacity="0.65" transform="rotate(-40 88 42)" />
      <circle cx="66" cy="56" r="3" fill="#F0C14B" opacity="0.8" />
      <path
        d="M40 102C48 92 52 84 50 74"
        stroke="#2F5A3D"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M26 110C18 98 14 84 22 72"
        stroke="#2F5A3D"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function EventIcon({ type = "baraat", className = "" }) {
  if (type === "sangeet") {
    return (
      <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="16" stroke="#C9A14A" strokeWidth="1" opacity="0.5" />
        <path d="M14 12V24L24 18L14 12Z" fill="#C9A14A" fillOpacity="0.75" />
        <circle cx="24" cy="22" r="3.5" stroke="#C9A14A" strokeWidth="1.1" />
      </svg>
    );
  }

  if (type === "doli") {
    return (
      <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="16" stroke="#C9A14A" strokeWidth="1" opacity="0.5" />
        <path
          d="M10 22C10 22 12 14 18 14C24 14 26 22 26 22"
          stroke="#C9A14A"
          strokeWidth="1.2"
        />
        <path d="M12 22H24V25H12V22Z" fill="#C9A14A" fillOpacity="0.55" />
        <path d="M18 14V10" stroke="#C9A14A" strokeWidth="1.2" />
        <circle cx="18" cy="9" r="1.5" fill="#C9A14A" />
      </svg>
    );
  }

  return (
    <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="16" stroke="#C9A14A" strokeWidth="1" opacity="0.5" />
      <path
        d="M11 23V15C11 12 13.5 10 18 10C22.5 10 25 12 25 15V23"
        stroke="#C9A14A"
        strokeWidth="1.2"
      />
      <path d="M9 23H27V26H9V23Z" fill="#C9A14A" fillOpacity="0.5" />
      <path d="M18 10V7" stroke="#C9A14A" strokeWidth="1.1" />
    </svg>
  );
}

export function PeacockPair({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 80" fill="none" aria-hidden="true">
      <path
        d="M20 55C28 40 42 28 58 32C68 34 72 42 70 50C78 42 90 40 98 48"
        stroke="#C9A14A"
        strokeWidth="1.1"
        opacity="0.8"
      />
      <circle cx="58" cy="30" r="3" fill="#2F5A3D" opacity="0.7" />
      <path
        d="M180 55C172 40 158 28 142 32C132 34 128 42 130 50C122 42 110 40 102 48"
        stroke="#C9A14A"
        strokeWidth="1.1"
        opacity="0.8"
      />
      <circle cx="142" cy="30" r="3" fill="#2F5A3D" opacity="0.7" />
      <circle cx="100" cy="52" r="5" fill="#C9A14A" fillOpacity="0.55" />
    </svg>
  );
}

export function GreenBorderMotif({ className = "" }) {
  return (
    <div
      className={`h-2 w-full bg-[linear-gradient(90deg,#1f3d2a_0%,#1f3d2a_40%,transparent_40%,transparent_50%,#1f3d2a_50%,#1f3d2a_90%,transparent_90%)] bg-[length:14px_100%] opacity-80 ${className}`}
      aria-hidden="true"
    />
  );
}
