const TYPE_ICON: Record<string, string> = {
  Driver: "/clubs/driver.svg",
  "Iron Set": "/clubs/iron-set.svg",
  "Iron (Single)": "/clubs/iron-set.svg",
  "Utility Iron": "/clubs/iron-set.svg",
  Wedge: "/clubs/wedge.svg",
  "Fairway Wood": "/clubs/fairway-wood.svg",
  Hybrid: "/clubs/hybrid.svg",
  Putter: "/clubs/putter.svg",
};

export function clubIconFor(type: string): string {
  return TYPE_ICON[type] || "/clubs/generic.svg";
}
