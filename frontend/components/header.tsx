"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Train, Ticket } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Train className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-bold text-xl">TrainBooker</span>
              </Link>
            </div>
            <nav className="ml-6 flex items-center space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/") ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <Link
                href="/trains"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/trains") ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Trains
              </Link>
              {session && (
                <Link
                  href="/bookings"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/bookings") ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="flex items-center">
                    <Ticket className="h-4 w-4 mr-1" />
                    My Bookings
                  </span>
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    {session.user?.name || session.user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookings" className="cursor-pointer">
                      <Ticket className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button variant="default" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
