import { redirect } from "next/navigation"
import AuthForm from "@/components/auth/auth-form"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function SignUpPage() {
  // Try-catch to handle potential auth errors gracefully
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("Error getting session:", error)
  }

  if (session) {
    redirect("/trains")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full">
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
