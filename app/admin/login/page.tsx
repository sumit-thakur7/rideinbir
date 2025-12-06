'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
      } else {
        // --- YE HAI WO MISSING LINE ---
        // Login hote hi Browser me User Data save karo
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Ab Dashboard par jao
        router.push('/admin')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-red-600">
        <h1 className="text-3xl font-black text-center mb-6 text-gray-800">Admin Portal</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-bold border border-red-200">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-red-500 outline-none transition text-black"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@booking.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              required
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-red-500 outline-none transition text-black"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg"
          >
            {loading ? 'Verifying...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
