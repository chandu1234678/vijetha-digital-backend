export function calculateFlexBannerPrice({
  width,
  height,
  material,
  quantity,
}) {
  if (!width || !height || !material || !quantity) return 0;

  const area = (width * height) / 144; // sq ft (inches → feet)

  const materialRates = {
    flex: 25,
    star_flex: 35,
    eco_flex: 20,
  };

  const baseRate = materialRates[material] || 25;

  const price = area * baseRate * quantity;

  return Math.round(price);
}
