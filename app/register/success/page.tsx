import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Mail } from "lucide-react"

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">Arogya Health Bot</h1>
              <p className="text-sm text-slate-600">Your AI Healthcare Assistant</p>
            </div>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Registration Successful!</CardTitle>
              <CardDescription>Please check your email to verify your account</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-slate-600">
                We've sent a verification email to your registered email address. Please click the verification link in
                the email to activate your account.
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/login">Go to Login</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
