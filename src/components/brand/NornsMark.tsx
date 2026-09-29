import { MARK_PATH, MARK_VIEWBOX } from "@/brand/mark";

type NornsMarkProps = {
  /**
   * `solid`   — the mark as built.
   * `contour` — only its outline, as drawn before it is built.
   */
  variant?: "solid" | "contour";
  className?: string;
  /** Provide a label only where the mark carries meaning on its own. */
  label?: string;
};

export function NornsMark({ variant = "solid", className, label }: NornsMarkProps) {
  const isContour = variant === "contour";

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={MARK_PATH}
        fillRule="evenodd"
        fill={isContour ? "none" : "currentColor"}
        stroke={isContour ? "currentColor" : "none"}
        strokeWidth={isContour ? 1 : undefined}
        vectorEffect={isContour ? "non-scaling-stroke" : undefined}
        pathLength={isContour ? 1 : undefined}
      />
    </svg>
  );
}
