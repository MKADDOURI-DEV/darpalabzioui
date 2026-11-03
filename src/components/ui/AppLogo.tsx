'use client';

import React, { memo, useMemo } from 'react';
import AppIcon from './AppIcon';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string; // Image source (optional, overrides variant)
  variant?: 'dark' | 'light'; // dark = for light backgrounds, light = for dark backgrounds
  iconName?: string; // Icon name when no image
  size?: number; // Size for icon/image
  className?: string; // Additional classes
  onClick?: () => void; // Click handler
}

const AppLogo = memo(function AppLogo({
  src,
  variant = 'light',
  iconName = 'SparklesIcon',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const LOGO_RATIO = 1075 / 1882; // width / height of the PNG logo
  const resolvedSrc = src ?? (variant === 'dark' ? '/assets/images/logo.png' : '/assets/images/logo-light.png');

  // Memoize className calculation
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {/* Show image if src provided, otherwise show icon */}
      {resolvedSrc ? (
        <AppImage
          src={resolvedSrc}
          alt="Dar Pa Labzioui - Maison d'hôtes"
          width={Math.round(size * LOGO_RATIO)}
          height={size}
          className="flex-shrink-0 object-contain"
          style={{ height: size, width: 'auto' }}
          priority={true}
          unoptimized={resolvedSrc.endsWith('.svg')}
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}
    </div>
  );
});

export default AppLogo;
