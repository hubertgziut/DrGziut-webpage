import type { SiteAsset } from "../content/site";

export function assetUrl(path: SiteAsset) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
