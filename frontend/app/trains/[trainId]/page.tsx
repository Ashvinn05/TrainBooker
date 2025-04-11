import { redirect, notFound } from "next/navigation"
import { getTrainById } from "@/lib/data"
import SeatBooking from "@/components/booking/seat-booking"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

interface TrainBookingPageProps {
  params: {
    trainId: string
  }
}

export default async function TrainBookingPage({ params }: TrainBookingPageProps) {
  // Try-catch to handle potential auth errors gracefully
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("Error getting session:", error)
  }

  if (!session) {
    redirect(`/auth/signin?callbackUrl=/trains/${params.trainId}`)
  }

  const train = await getTrainById(params.trainId)

  if (!train) {
    notFound()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{train.name}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div>
              <span className="font-medium">From:</span> {train.from}
            </div>
            <div>
              <span className="font-medium">To:</span> {train.to}
            </div>
            <div>
              <span className="font-medium">Departure:</span> {new Date(train.departureTime).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Arrival:</span> {new Date(train.arrivalTime).toLocaleString()}
            </div>
          </div>
        </div>

        <SeatBooking trainId={train.id} />
      </div>
    </div>
  )
}
