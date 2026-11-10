import React, { useState } from 'react';

// Generates consistent initials from full name
export function getInitials(name) {
  if (!name) return 'PW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Consistent deterministic background gradient based on name string
export function getAvatarBgGradient(name) {
  const gradients = [
    'from-indigo-600 to-violet-700 text-indigo-100',
    'from-blue-600 to-cyan-700 text-blue-100',
    'from-emerald-600 to-teal-700 text-emerald-100',
    'from-violet-600 to-purple-700 text-violet-100',
    'from-amber-600 to-orange-700 text-amber-100',
    'from-rose-600 to-pink-700 text-rose-100'
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

