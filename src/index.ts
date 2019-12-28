import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const MediaQueryEnum = {
  xs: {
    maxWidth: 575,
    matchMedia: '(max-width: 575px)',
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
    matchMedia: '(min-width: 576px) and (max-width: 767px)',
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
    matchMedia: '(min-width: 768px) and (max-width: 991px)',
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
    matchMedia: '(min-width: 992px) and (max-width: 1199px)',
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
    matchMedia: '(min-width: 1200px) and (max-width: 1599px)',
  },
  xxl: {
    minWidth: 1600,
    matchMedia: '(min-width: 1600px)',
  },
};

export type MediaQueryKey = keyof typeof MediaQueryEnum;

/**
 * loop query screen className
 * Array.find will throw a error
 * `Rendered more hooks than during the previous render.`
 * So should use Array.forEach
 */
export const getScreenClassName = () => {
  let className: MediaQueryKey = 'md';

  const mediaQueryKey = (Object.keys(MediaQueryEnum) as MediaQueryKey[]).find(key => {
    const { matchMedia } = MediaQueryEnum[key];
    if (window.matchMedia(matchMedia).matches) {
      return true;
    }
    return false;
  });
  className = (mediaQueryKey as unknown) as MediaQueryKey;
  return className;
};

const useMedia = () => {
  const isMd = useMediaQuery(MediaQueryEnum.md);
  const isLg = useMediaQuery(MediaQueryEnum.lg);
  const isXxl = useMediaQuery(MediaQueryEnum.xxl);
  const isXl = useMediaQuery(MediaQueryEnum.xl);
  const isSm = useMediaQuery(MediaQueryEnum.sm);
  const isXs = useMediaQuery(MediaQueryEnum.xs);
  const [colSpan, setColSpan] = useState<keyof typeof MediaQueryEnum>(getScreenClassName());

  useEffect(() => {
    if (isXxl) {
      setColSpan('xxl');
      return;
    }
    if (isXl) {
      setColSpan('xl');
      return;
    }
    if (isLg) {
      setColSpan('lg');
      return;
    }
    if (isMd) {
      setColSpan('md');
      return;
    }
    if (isSm) {
      setColSpan('sm');
      return;
    }
    if (isXs) {
      setColSpan('xs');
      return;
    }
    setColSpan('md');
  }, [isMd, isLg, isXxl, isXl, isSm, isXs]);

  return colSpan;
};

export default useMedia;
