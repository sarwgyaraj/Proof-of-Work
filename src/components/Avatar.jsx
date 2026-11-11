import React, { useState } from 'react';

// Generates consistent initials from full name
export function getInitials(name) {
  if (!name) return 'PW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Consistent deterministic background gradient based on name string (Modern Earthy tones)
export function getAvatarBgGradient(name) {
  const gradients = [
    'from-brand-600 to-amber-700 text-brand-50',
    'from-violet-600 to-emerald-700 text-violet-50',
    'from-emerald-600 to-teal-800 text-emerald-50',
    'from-stone-700 to-neutral-800 text-slate-100',
    'from-amber-600 to-orange-800 text-amber-50',
    'from-rose-600 to-stone-700 text-rose-50'
  ];
  if (!name) return gradients[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

/**
 * Avatar Component with robust graceful fallback to clean initials.
 * Guarantees that even if external image servers fail or block images,
 * a clean, professional initials-based badge is displayed without breaking UI layout.
 */
export default function Avatar({ src, name, alt, className = '', imgClassName = '', size = 'md' }) {
  const [hasError, setHasError] = useState(false);

  const initials = getInitials(name || alt);
  const bgGradient = getAvatarBgGradient(name || alt);

  // If no source or image loading errored, show initials
  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center font-bold tracking-wider select-none bg-gradient-to-tr ${bgGradient} ${className}`}
        title={name || alt}
        aria-label={name || alt}
      >
        <span className="font-mono">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || name || 'Profile Avatar'}
      onError={() => setHasError(true)}
      className={`object-cover ${className} ${imgClassName}`}
    />
  );
}

