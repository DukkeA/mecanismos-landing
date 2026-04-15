type EngineSVGProps = {
  className?: string;
};

export function EngineSVG({ className = "" }: EngineSVGProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-auto w-full ${className}`.trim()}
    >
      <defs>
        <linearGradient id="engine-metal" x1="92" y1="70" x2="520" y2="370" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F5F0" />
          <stop offset="0.42" stopColor="#D0D0D0" />
          <stop offset="1" stopColor="#B8B8B8" />
        </linearGradient>
        <linearGradient id="engine-gold" x1="210" y1="112" x2="436" y2="288" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B8944F" />
          <stop offset="0.5" stopColor="#C9A96E" />
          <stop offset="1" stopColor="#D4B97E" />
        </linearGradient>
      </defs>

      <rect x="86" y="136" width="360" height="178" rx="26" fill="url(#engine-metal)" opacity="0.26" />
      <path d="M133 126h226c18.8 0 34 15.2 34 34v132c0 18.8-15.2 34-34 34H133c-18.8 0-34-15.2-34-34V160c0-18.8 15.2-34 34-34Z" fill="#2D2D2D" opacity="0.92" />
      <path d="M172 92h150c14.4 0 26 11.6 26 26v20H146v-20c0-14.4 11.6-26 26-26Z" fill="#2D2D2D" opacity="0.84" />
      <path d="M135 166h226v119H135z" fill="url(#engine-metal)" opacity="0.94" />
      <path d="M172 114h150c8.8 0 16 7.2 16 16v8H156v-8c0-8.8 7.2-16 16-16Z" fill="url(#engine-gold)" opacity="0.8" />
      <rect x="394" y="168" width="77" height="108" rx="18" fill="#2D2D2D" />
      <rect x="418" y="118" width="36" height="62" rx="12" fill="#B8B8B8" opacity="0.85" />
      <rect x="104" y="196" width="31" height="58" rx="10" fill="#C9A96E" opacity="0.72" />
      <rect x="118" y="94" width="22" height="42" rx="8" fill="#B8B8B8" opacity="0.8" />
      <path d="M456 184h54c17.7 0 32 14.3 32 32v22h-86v-54Z" fill="#C9A96E" opacity="0.9" />
      <path d="M538 214h24c14.4 0 26 11.6 26 26v52h-50V214Z" fill="#2D2D2D" opacity="0.88" />
      <path d="M208 330h194l18 28H190l18-28Z" fill="#2D2D2D" opacity="0.84" />
      <circle cx="195" cy="226" r="30" fill="#F7F5F0" opacity="0.2" />
      <circle cx="195" cy="226" r="18" stroke="#C9A96E" strokeWidth="8" />
      <circle cx="278" cy="226" r="30" fill="#F7F5F0" opacity="0.2" />
      <circle cx="278" cy="226" r="18" stroke="#C9A96E" strokeWidth="8" />
      <circle cx="361" cy="226" r="30" fill="#F7F5F0" opacity="0.2" />
      <circle cx="361" cy="226" r="18" stroke="#C9A96E" strokeWidth="8" />
      <path d="M133 166h228" stroke="#F7F5F0" strokeOpacity="0.16" strokeWidth="3" />
      <path d="M133 286h228" stroke="#2D2D2D" strokeOpacity="0.2" strokeWidth="3" />
      <path d="M430 146v-36h24v36" stroke="#C9A96E" strokeWidth="10" strokeLinecap="round" />
      <path d="M115 294h374" stroke="#B8B8B8" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
      <circle cx="164" cy="176" r="6" fill="#2D2D2D" opacity="0.55" />
      <circle cx="330" cy="176" r="6" fill="#2D2D2D" opacity="0.55" />
      <circle cx="164" cy="278" r="6" fill="#2D2D2D" opacity="0.55" />
      <circle cx="330" cy="278" r="6" fill="#2D2D2D" opacity="0.55" />
    </svg>
  );
}

export default EngineSVG;
