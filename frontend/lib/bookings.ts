import { v4 as uuidv4 } from "uuid"
import type { Booking } from "@/lib/types"

const BOOKINGS_KEY = "user_bookings"

export async function saveBooking(booking: Booking): Promise<void> {
  if (typeof window === "undefined") return

  const bookingWithId = {
    ...booking,
    id: booking.id || uuidv4(),
  }

  const existingBookingsJson = localStorage.getItem(BOOKINGS_KEY)
  const existingBookings: Booking[] = existingBookingsJson ? JSON.parse(existingBookingsJson) : []

  const updatedBookings = [...existingBookings, bookingWithId]

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings))
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  if (typeof window === "undefined") return []

  const bookingsJson = localStorage.getItem(BOOKINGS_KEY)
  if (!bookingsJson) return []

  const allBookings: Booking[] = JSON.parse(bookingsJson)
  return allBookings.filter((booking) => booking.userId === userId)
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
  if (typeof window === "undefined") return null

  const bookingsJson = localStorage.getItem(BOOKINGS_KEY)
  if (!bookingsJson) return null

  const allBookings: Booking[] = JSON.parse(bookingsJson)
  return allBookings.find((booking) => booking.id === bookingId) || null
}

export async function cancelBooking(bookingId: string): Promise<boolean> {
  if (typeof window === "undefined") return false

  const bookingsJson = localStorage.getItem(BOOKINGS_KEY)
  if (!bookingsJson) return false

  const allBookings: Booking[] = JSON.parse(bookingsJson)
  const bookingIndex = allBookings.findIndex((booking) => booking.id === bookingId)

  if (bookingIndex === -1) return false

  allBookings[bookingIndex].status = "cancelled"

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(allBookings))

  return true
}
