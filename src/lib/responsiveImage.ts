import { responsiveImages } from './responsiveImages';

/**
 * Returns src/srcSet/sizes for an <img>: the original JPG stays as `src` (fallback) and the
 * generated WebP variants (scripts/build-responsive-images.sh) are offered via srcSet.
 */
export function responsiveImageProps(src: string, sizes: string) {
  const base = import.meta.env.BASE_URL;
  const key = src.startsWith(base) ? `/${src.slice(base.length)}` : src;
  const variant = responsiveImages[key];
  if (!variant) return { src };
  const prefix = base.replace(/\/$/, '');
  return {
    src,
    srcSet: `${prefix}${variant.small} 640w, ${prefix}${variant.large} ${variant.largeWidth}w`,
    sizes,
  };
}
