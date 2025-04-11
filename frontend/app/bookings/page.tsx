import { redirect } from "next/navigation"
import BookingsList from "@/components/bookings/bookings-list"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function BookingsPage() {
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("Error getting session:", error)
  }

  if (!session) {
    redirect("/auth/signin?callbackUrl=/bookings")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Bookings</h1>
        <BookingsList userId={session.user?.id as string} />
      </div>
    </div>
  )
}
