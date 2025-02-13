'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AdminNav() {
  return (
    <nav className="bg-gray-900 p-4 mb-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link 
            href="/admin"
            className="text-white hover:text-gray-300"
          >
            Create Post
          </Link>
          <Link 
            href="/admin/manage"
            className="text-white hover:text-gray-300"
          >
            Manage Posts
          </Link>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  )
} 