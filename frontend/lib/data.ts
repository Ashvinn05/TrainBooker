import type { Train } from "@/lib/types"

const currentDate = new Date()

const getFutureDate = (daysFromNow: number, hours: number, minutes: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

const trains: Train[] = [
  {
    id: "1",
    name: "Rajdhani Express",
    from: "New Delhi",
    to: "Mumbai Central",
    departureTime: getFutureDate(1, 16, 35),
    arrivalTime: getFutureDate(2, 8, 15),
    price: 2450,
    availableSeats: 45,
    stops: 5,
  },
  {
    id: "2",
    name: "Shatabdi Express",
    from: "Chennai",
    to: "Bengaluru",
    departureTime: getFutureDate(0, 14, 15),
    arrivalTime: getFutureDate(0, 20, 45),
    price: 1250,
    availableSeats: 28,
    stops: 2,
  },
  {
    id: "3",
    name: "Duronto Express",
    from: "Kolkata",
    to: "New Delhi",
    departureTime: getFutureDate(2, 23, 10),
    arrivalTime: getFutureDate(3, 15, 30),
    price: 3100,
    availableSeats: 62,
    stops: 0,
  },
  {
    id: "4",
    name: "Vande Bharat Express",
    from: "Ahmedabad",
    to: "Mumbai Central",
    departureTime: getFutureDate(1, 6, 0),
    arrivalTime: getFutureDate(1, 12, 45),
    price: 1750,
    availableSeats: 0,
    stops: 3,
  },
  {
    id: "5",
    name: "Tejas Express",
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: getFutureDate(3, 8, 30),
    arrivalTime: getFutureDate(3, 16, 15),
    price: 1850,
    availableSeats: 15,
    stops: 4,
  },
  {
    id: "6",
    name: "Gatimaan Express",
    from: "New Delhi",
    to: "Agra",
    departureTime: getFutureDate(0, 8, 10),
    arrivalTime: getFutureDate(0, 9, 50),
    price: 750,
    availableSeats: 32,
    stops: 1,
  },
  {
    id: "7",
    name: "Humsafar Express",
    from: "Mumbai Central",
    to: "Goa",
    departureTime: getFutureDate(4, 23, 55),
    arrivalTime: getFutureDate(5, 11, 30),
    price: 1350,
    availableSeats: 54,
    stops: 6,
  },
  {
    id: "8",
    name: "Jan Shatabdi Express",
    from: "Pune",
    to: "Mumbai",
    departureTime: getFutureDate(2, 7, 15),
    arrivalTime: getFutureDate(2, 10, 30),
    price: 450,
    availableSeats: 76,
    stops: 3,
  },
]

export async function getTrains(): Promise<Train[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return trains.filter((train) => new Date(train.departureTime) >= currentDate)
}

export async function getTrainById(id: string): Promise<Train | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return trains.find((train) => train.id === id)
}
