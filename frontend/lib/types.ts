export interface Train {
  id: string
  name: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  price: number
  availableSeats: number
  stops: number
}

export interface Booking {
  id?: string
  userId: string
  trainId: string
  trainName: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  seatCount: number
  seatNumbers: number[]
  price: number
  bookingDate: string
  status: "confirmed" | "cancelled" | "completed"
}
