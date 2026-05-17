import { useState, useEffect } from 'react';

export type OS = 'macos' | 'windows' | 'other';

export function useOSDetection(): OS {
  const [os, setOs] = useState<OS>('other');

  useEffect(() => {
    const detectOS = (): OS => {
      const platform = (navigator as any).userAgentData?.platform ?? navigator.platform;
      if (/mac|iphone|ipad/i.test(platform)) return 'macos';
      if (/win/i.test(platform)) return 'windows';
      return 'other';
    };

    setOs(detectOS());
  }, []);

  return os;
}
