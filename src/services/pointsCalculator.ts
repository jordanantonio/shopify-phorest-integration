export function calculateLoyaltyPoints(subtotal: number | string): number {
  const parsedSubtotal =
    typeof subtotal === "number" ? subtotal : Number.parseFloat(subtotal);

  if (Number.isNaN(parsedSubtotal) || parsedSubtotal < 0) {
    return 0;
  }

  return Math.floor(parsedSubtotal);
}
