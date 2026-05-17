import React from 'react';
import styles from './AtriumMark.module.css';

export interface AtriumMarkProps {
  size: number;
  context: 'dark' | 'light' | 'button';
  className?: string;
  style?: React.CSSProperties;
}

export const AtriumMark: React.FC<AtriumMarkProps> = ({
  size,
  context,
  className = '',
  style,
}) => {
  const colorMap = {
    dark: '#D4856A',
    light: '#8C3D28',
    button: '#F7F3EF',
  };

  const color = colorMap[context];

  // Stroke width based on rendered size
  let strokeWidth: number | undefined;
  let showCenter = true;

  if (size <= 12) {
    showCenter = false;
    strokeWidth = undefined;
  } else if (size <= 16) {
    strokeWidth = 4;
  } else if (size <= 20) {
    strokeWidth = 3.5;
  } else if (size <= 32) {
    strokeWidth = 3;
  } else if (size <= 48) {
    strokeWidth = 2.2;
  } else {
    strokeWidth = 1.8;
  }

  const cornerSize = 19;
  const centerPos = 23;
  const centerSize = 26;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${styles.mark} ${className}`}
      style={{ display: 'block', overflow: 'hidden', ...style }}
    >
      {/* Top-left corner */}
      <rect x="0" y="0" width={cornerSize} height={cornerSize} fill={color} />
      {/* Top-right corner */}
      <rect x="53" y="0" width={cornerSize} height={cornerSize} fill={color} />
      {/* Bottom-left corner */}
      <rect x="0" y="53" width={cornerSize} height={cornerSize} fill={color} />
      {/* Bottom-right corner */}
      <rect x="53" y="53" width={cornerSize} height={cornerSize} fill={color} />
      {/* Center square (stroke only) */}
      {showCenter && (
        <rect
          x={centerPos}
          y={centerPos}
          width={centerSize}
          height={centerSize}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      )}
    </svg>
  );
};

export default AtriumMark;
