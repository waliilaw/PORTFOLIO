"use client"
import { useEffect, useState } from 'react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const hasShownAlert = sessionStorage.getItem('hasShownAlert')
    
    if (!hasShownAlert) {
      setShowModal(true)
      sessionStorage.setItem('hasShownAlert', 'true')
    }
  }, [])

  return (
    <>
      {children}
      
      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-4">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Welcome!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This website is currently in building phase. Some features might not work as expected.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
} 