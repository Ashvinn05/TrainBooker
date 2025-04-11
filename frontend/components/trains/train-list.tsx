"use client"

import { useState } from "react"
import type { Train } from "@/lib/types"
import TrainCard from "@/components/trains/train-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TrainListProps {
  trains: Train[]
}

export default function TrainList({ trains }: TrainListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("departure")

  const filteredTrains = trains.filter(
    (train) =>
      train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.to.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedTrains = [...filteredTrains].sort((a, b) => {
    if (sortBy === "departure") {
      return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
    } else if (sortBy === "arrival") {
      return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime()
    } else if (sortBy === "price") {
      return a.price - b.price
    }
    return 0
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search trains, stations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="departure">Departure Time</SelectItem>
              <SelectItem value="arrival">Arrival Time</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedTrains.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No trains found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sortedTrains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
      )}
    </div>
  )
}
