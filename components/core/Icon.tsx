import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleAlert, Info, Menu, Play, Sparkles, TriangleAlert, X, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "chevron-down": ChevronDown,
  x: X,
  check: Check,
  info: Info,
  "triangle-alert": TriangleAlert,
  "circle-alert": CircleAlert,
  play: Play,
  sparkles: Sparkles,
  menu: Menu,
};

export interface IconProps {
  name?: string;
  size?: number;
  style?: CSSProperties;
  className?: string;
}

export function Icon({ name = "sparkles", size = 18, style, ...rest }: IconProps) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={1.5} style={{ display: "inline-block", flex: "0 0 auto", ...style }} {...rest} />;
}
