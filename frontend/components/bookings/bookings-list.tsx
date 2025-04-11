"use client"

import { useState, useEffect } from "react"
import { getUserBookings, cancelBooking } from "@/lib/bookings"
import type { Booking } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingCard from "@/components/bookings/booking-card"
import { useToast } from "@/components/ui/use-toast"

interface BookingsListProps {
  userId: string
}

export default function BookingsList({ userId }: BookingsListProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadBookings() {
      try {
        const userBookings = await getUserBookings(userId)
        setBookings(userBookings)
      } catch (error) {
        console.error("Failed to load bookings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [userId])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const success = await cancelBooking(bookingId)

      if (success) {
        // Update the local state
        setBookings((prevBookings) =>
          prevBookings.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" } : booking)),
        )

        toast({
          title: "Booking Cancelled",
          description: "Your booking has been successfully cancelled.",
        })
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error)
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter bookings by status
  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "confirmed" && new Date(booking.departureTime) > new Date(),
  )

  const pastBookings = bookings.filter(
    (booking) => booking.status === "completed" || new Date(booking.departureTime) <= new Date(),
  )

  const cancelledBookings = bookings.filter((booking) => booking.status === "cancelled")

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
        <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
      </div>
    )
  }

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
        <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-4">
        {upcomingBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">You don't have any upcoming bookings.</p>
          </div>
        ) : (
          upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} showCancelButton={true} />
          ))
        )}
      </TabsContent>

      <TabsContent value="past" className="space-y-4">
        {pastBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">You don't have any past bookings.</p>
          </div>
        ) : (
          pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} showCancelButton={false} />)
        )}
      </TabsContent>

      <TabsContent value="cancelled" className="space-y-4">
        {cancelledBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">You don't have any cancelled bookings.</p>
          </div>
        ) : (
          cancelledBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} showCancelButton={false} />
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}
