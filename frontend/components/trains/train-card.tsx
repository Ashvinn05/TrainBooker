"use client"

import type { Train } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, TrainIcon } from "lucide-react"
import { formatDate, formatTime, formatDuration } from "@/lib/utils"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { LoginDialog } from "@/components/auth/login-dialog"

interface TrainCardProps {
  train: Train
}

export default function TrainCard({ train }: TrainCardProps) {
  const { data: session } = useSession()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const departureDate = new Date(train.departureTime)
  const arrivalDate = new Date(train.arrivalTime)

  const handleBookClick = () => {
    if (!session) {
      setShowLoginDialog(true)
      return
    }

    // If user is logged in, proceed to booking page
    window.location.href = `/trains/${train.id}`
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center mb-2 md:mb-0">
                <TrainIcon className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-bold text-lg">{train.name}</h3>
                {train.availableSeats > 0 ? (
                  <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    {train.availableSeats} seats available
                  </span>
                ) : (
                  <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Sold out</span>
                )}
              </div>
              <div className="text-lg font-bold text-green-600">₹{train.price.toFixed(2)}</div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex-1">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-green-600"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{formatTime(departureDate)}</p>
                    <p className="text-gray-600">{train.from}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(departureDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-7 border-l-2 border-dashed border-gray-300 h-8 my-1"></div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-red-600"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{formatTime(arrivalDate)}</p>
                    <p className="text-gray-600">{train.to}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(arrivalDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formatDuration(departureDate, arrivalDate)}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {train.stops === 0 ? "Direct" : `${train.stops} ${train.stops === 1 ? "stop" : "stops"}`}
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 p-4 flex justify-end">
          {session ? (
            <Link href={`/trains/${train.id}`}>
              <Button disabled={train.availableSeats === 0} className="group">
                {train.availableSeats > 0 ? "Book Seats" : "Sold Out"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <Button onClick={handleBookClick} disabled={train.availableSeats === 0} className="group">
              {train.availableSeats > 0 ? "Book Seats" : "Sold Out"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  )
}
