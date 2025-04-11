import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Train } from "lucide-react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function HomePage() {
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("Error getting session:", error)
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Train Ticket Booking</h1>
          <p className="text-gray-600 mb-8">
            Welcome to our train booking platform. Explore available trains and book your tickets easily.
          </p>
          <div className="space-y-4">
            <Link href="/trains" className="w-full">
              <Button className="w-full group">
                View Available Trains
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="flex gap-4">
              <Link href="/auth/signin" className="w-full">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" className="w-full">
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Train className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {session.user?.name}</h1>
        <p className="text-gray-600 mb-8">Browse available trains and book your tickets easily.</p>
        <Link href="/trains">
          <Button className="w-full group">
            View Available Trains
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
