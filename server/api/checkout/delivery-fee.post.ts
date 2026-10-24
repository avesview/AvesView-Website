export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { address } = body

  if (!address) {
    throw createError({ statusCode: 400, message: 'Address required' })
  }

  // Warehouse coordinates
  const warehouseLat = config.warehouseLat as number
  const warehouseLng = config.warehouseLng as number
  const costPerMile = parseFloat(config.deliveryCostPerMile as string) || 1.00

  // Geocode address using Nominatim (free, no API key)
  let destLat: number, destLng: number
  try {
    const encodedAddr = encodeURIComponent(address)
    const geoResult = await $fetch<any[]>(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddr}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'AvesView-Website/1.0 (info@avesview.com)',
        }
      }
    )

    if (!geoResult || geoResult.length === 0) {
      throw createError({ statusCode: 422, message: 'Address not found. Please check your address and try again.' })
    }

    destLat = parseFloat(geoResult[0].lat)
    destLng = parseFloat(geoResult[0].lon)
  } catch (err: any) {
    if (err.statusCode) throw err
    throw createError({ statusCode: 422, message: 'Could not geocode address. Please try again.' })
  }

  // Haversine formula for straight-line distance
  const R = 6371 // Earth's radius in km
  const dLat = toRad(destLat - warehouseLat)
  const dLng = toRad(destLng - warehouseLng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(warehouseLat)) * Math.cos(toRad(destLat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distanceKm = R * c
  const distanceMiles = distanceKm * 0.621371

  const fee = Math.round(distanceMiles * costPerMile * 100) / 100

  // Get current cost_per_mile from DB if available
  // (We'll use runtime config fallback)

  return {
    miles: Math.round(distanceMiles * 10) / 10,
    fee,
    costPerMile,
    address: body.address,
  }
})

function toRad(deg: number) {
  return deg * (Math.PI / 180)
}
