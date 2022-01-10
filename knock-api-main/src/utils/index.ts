export const generateVerificationCode = (): number =>
  Math.floor(Math.random() * (999999 - 100000) + 100000);

// Calculate an amount of door token required to purchase a lead.
// When there are more than one list subscribed, take the price
// of the most expensive list.
export const getRequiredDoorToken = (lists: any) => {
  let value = 0
  if (!lists || !lists.length) {
    return value
  }
  lists.forEach((r: any) => {
    if (r.list.property_price > value) {
      value = r.list.property_price
    }
  })
  return value
}
