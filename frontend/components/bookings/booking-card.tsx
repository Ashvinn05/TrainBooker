"use client"

import { useState } from "react"
import type { Booking } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Train, CreditCard, Users, AlertTriangle } from "lucide-react"
import { formatDate, formatTime } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BookingCardProps {
  booking: Booking
  onCancel?: (bookingId: string) => void
  showCancelButton?: boolean
}

export default function BookingCard({ booking, onCancel, showCancelButton = false }: BookingCardProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const departureDate = new Date(booking.departureTime)
  const arrivalDate = new Date(booking.arrivalTime)
  const bookingDate = new Date(booking.bookingDate)

  const handleCancelClick = () => {
    setConfirmDialogOpen(true)
  }

  const confirmCancel = () => {
    if (booking.id && onCancel) {
      onCancel(booking.id)
    }
    setConfirmDialogOpen(false)
  }

  const getStatusBadge = () => {
    switch (booking.status) {
      case "confirmed":
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Confirmed</span>
      case "cancelled":
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Cancelled</span>
      case "completed":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Completed</span>
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center mb-2 md:mb-0">
                <Train className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-bold text-lg">{booking.trainName}</h3>
                <div className="ml-3">{getStatusBadge()}</div>
              </div>
              <div className="text-lg font-bold text-green-600">₹{booking.price.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    <strong>From:</strong> {booking.from}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    <strong>Departure:</strong> {formatDate(departureDate)}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    <strong>Time:</strong> {formatTime(departureDate)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    <strong>To:</strong> {booking.to}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    <strong>Arrival:</strong> {formatDate(arrivalDate)}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    <strong>Time:</strong> {formatTime(arrivalDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  <strong>Seats:</strong> {booking.seatCount} ({booking.seatNumbers.join(", ")})
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <CreditCard className="h-4 w-4 mr-2" />
                <span>
                  <strong>Booking ID:</strong> {booking.id?.substring(0, 8) || "N/A"}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  <strong>Booked on:</strong> {formatDate(bookingDate)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        {showCancelButton && booking.status === "confirmed" && (
          <CardFooter className="bg-gray-50 p-4 flex justify-end">
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
              onClick={handleCancelClick}
            >
              Cancel Booking
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center p-4 bg-amber-50 text-amber-800 rounded-md">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="text-sm">Cancellation may be subject to fees depending on the timing.</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Yes, Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
