export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/); // pisahkan berdasarkan spasi
  const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase() || "");
  return initials.join("");
}
