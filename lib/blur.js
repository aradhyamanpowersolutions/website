import blurMap from './blur.json';

/**
 * 20px inline placeholders, generated at build-prep time from the source photos.
 * Passed to next/image as `blurDataURL` so a colour-accurate blur paints on the
 * first frame instead of an empty box. Roughly 400 bytes each.
 *
 * Returns undefined for images that have no placeholder yet, in which case the
 * caller must not set placeholder="blur".
 */
export function blurFor(src) {
  return blurMap[src];
}

export function imagePlaceholder(src) {
  const blurDataURL = blurMap[src];
  return blurDataURL ? { placeholder: 'blur', blurDataURL } : {};
}
