"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface AuthFormProps {
  mode: "signin" | "signup"
  inDialog?: boolean
  onSuccess?: () => void
  callbackUrl?: string
}

export default function AuthForm({ mode, inDialog = false, onSuccess, callbackUrl }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (mode === "signin") {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: callbackUrl || "/trains",
        })

        if (result?.error) {
          setError("Invalid email or password")
          setIsLoading(false)
          return
        }

        if (onSuccess) {
          onSuccess()
        } else if (result?.url) {
          router.push(result.url)
        } else {
          router.push("/trains")
          router.refresh()
        }
      } else {
        // In a real app, you would call your API to create a user
        // For demo purposes, we'll simulate success and redirect to sign in
        // const response = await fetch("/api/auth/register", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name, email, password }),
        // })

        // if (!response.ok) {
        //   const data = await response.json()
        //   throw new Error(data.message || "Failed to register")
        // }

        // Simulate successful registration
        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          } else {
            router.push("/auth/signin")
          }
          setIsLoading(false)
        }, 1000)
        return
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }

    setIsLoading(false)
  }

  const FormContent = (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? mode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </Button>

          {!inDialog && (
            <div className="text-center text-sm mt-4">
              {mode === "signin" ? (
                <p>
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </>
  )

  if (inDialog) {
    return FormContent
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>{mode === "signin" ? "Sign In" : "Create Account"}</CardTitle>
        <CardDescription>
          {mode === "signin"
            ? "Enter your credentials to access your account"
            : "Fill in the details below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>{FormContent}</CardContent>
    </Card>
  )
}
