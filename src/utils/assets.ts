const RAW_ASSET_BASE = (import.meta.env.VITE_ASSET_BASE_URL || '').trim().replace(/\/+$/, '');

/**
 * Resolves static PDF/image asset paths cleanly.
 * Locally (VITE_ASSET_BASE_URL unset), returns root-relative paths (/papers/..., /crops/...).
 * In production on InfinityFree, prefixes with Cloudflare R2 CDN base URL.
 */
export const assetUrl = (path?: string): string => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  if (!RAW_ASSET_BASE) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${RAW_ASSET_BASE}${normalized}`;
};
