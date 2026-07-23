export function getFilterStyle(isActive: boolean, color: string) {
  if (isActive) {
    return {
      backgroundColor: `${color}15`,
      color,
      border: `1px solid ${color}50`,
      borderLeftWidth: "3px" as const,
      borderLeftColor: color,
    };
  }
  return {
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.4)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
}
