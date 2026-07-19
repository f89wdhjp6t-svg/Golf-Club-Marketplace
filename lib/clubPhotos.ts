import { clubIconFor } from "./clubIcons";

/**
 * Real cropped product photos, supplied directly by the user and bundled
 * locally (no external hosting, so nothing to verify or break). Falls back
 * to the type illustration for any club type we don't have a real photo
 * for yet.
 */
const REAL_PHOTO: Record<string, string> = {
  Driver: "/clubs/photos/driver.jpg",
  "Iron Set": "/clubs/photos/iron-set.jpg",
  "Iron (Single)": "/clubs/photos/iron-set.jpg",
  "Utility Iron": "/clubs/photos/iron-set.jpg",
  Hybrid: "/clubs/photos/hybrid.jpg",
  Putter: "/clubs/photos/putter.jpg",
};

export function clubPhotoFor(type: string): string {
  return REAL_PHOTO[type] || clubIconFor(type);
}
