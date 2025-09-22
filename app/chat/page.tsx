"use client"

import { ChatInterface } from "@/components/chat-interface"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ChatInterface />
      </div>
    </div>
  )
}
