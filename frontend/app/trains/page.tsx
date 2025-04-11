import TrainList from "@/components/trains/train-list"
import { getTrains } from "@/lib/data"

export default async function TrainsPage() {
  const trains = await getTrains()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Available Trains</h1>
        <TrainList trains={trains} />
      </div>
    </div>
  )
}
