'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../components/AdminLayout'

interface Pilot {
  _id: string
  name: string
  role: string
  photo?: string
  experience: string
  totalFlights: number
  location: string
  specialization?: string
  rating: number
  status: 'online' | 'busy' | 'offline'
  instagram?: string
  bio?: string
  certifications: string[]
  isActive: boolean
}

export default function PilotsManagement() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [pilots, setPilots] = useState<Pilot[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPilot, setEditingPilot] = useState<Pilot | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: '',
    experience: '',
    totalFlights: 0,
    location: 'Bir, Himachal Pradesh',
    specialization: '',
    rating: 4.5,
    status: 'online',
    instagram: '',
    bio: '',
    certifications: '',
    isActive: true
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/admin/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/')
      return
    }

    setUser(parsedUser)
    fetchPilots()
  }, [router])

  const fetchPilots = async () => {
    try {
      const res = await fetch('/api/admin/pilots')
      const data = await res.json()
      setPilots(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching pilots:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingPilot
        ? `/api/admin/pilots/${editingPilot._id}`
        : '/api/admin/pilots'
      
      const method = editingPilot ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed to save pilot')

      await fetchPilots()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error('Error saving pilot:', error)
      alert('Failed to save pilot')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (pilot: Pilot) => {
    setEditingPilot(pilot)
    setFormData({
      name: pilot.name,
      role: pilot.role,
      photo: pilot.photo || '',
      experience: pilot.experience,
      totalFlights: pilot.totalFlights,
      location: pilot.location,
      specialization: pilot.specialization || '',
      rating: pilot.rating,
      status: pilot.status,
      instagram: pilot.instagram || '',
      bio: pilot.bio || '',
      certifications: pilot.certifications.join(', '),
      isActive: pilot.isActive
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pilot?')) return

    try {
      const res = await fetch(`/api/admin/pilots/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete pilot')

      await fetchPilots()
    } catch (error) {
      console.error('Error deleting pilot:', error)
      alert('Failed to delete pilot')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      photo: '',
      experience: '',
      totalFlights: 0,
      location: 'Bir, Himachal Pradesh',
      specialization: '',
      rating: 4.5,
      status: 'online',
      instagram: '',
      bio: '',
      certifications: '',
      isActive: true
    })
    setEditingPilot(null)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pilots Management</h1>
          <p className="text-gray-600 mt-1">Manage your pilot team</p>
        </div>

        {/* Add Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            All Pilots ({pilots.length})
          </h2>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg"
          >
            + Add New Pilot
          </button>
        </div>

        {/* Pilots Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : pilots.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-lg mt-4">No pilots added yet</p>
            <button
              onClick={() => {
                resetForm()
                setShowModal(true)
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add First Pilot
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pilots.map((pilot) => (
              <div key={pilot._id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="p-6">
                  {/* Pilot Photo */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {pilot.photo ? (
                        <img
                          src={pilot.photo}
                          alt={pilot.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-600">
                            {pilot.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{pilot.name}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          pilot.status === 'online' ? 'bg-green-100 text-green-800' :
                          pilot.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {pilot.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pilot Info */}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600"><span className="font-medium">Role:</span> {pilot.role}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Experience:</span> {pilot.experience}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Total Flights:</span> {pilot.totalFlights}+</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> {pilot.location}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">{pilot.rating}/5</span>
                    </div>
                    {pilot.specialization && (
                      <p className="text-sm text-purple-600">🏅 {pilot.specialization}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEdit(pilot)}
                      className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pilot._id)}
                      className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-8">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingPilot ? 'Edit Pilot' : 'Add New Pilot'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Senior Pilot"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                    <input
                      type="url"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                    <input
                      type="text"
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., 5+ years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Flights</label>
                    <input
                      type="number"
                      value={formData.totalFlights}
                      onChange={(e) => setFormData({ ...formData, totalFlights: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Acro Expert"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="online">Online</option>
                      <option value="busy">Busy</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="@username"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="Brief bio about the pilot..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certifications (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.certifications}
                      onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="USPA A License, APPI Instructor, etc."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active Pilot
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      resetForm()
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
                  >
                    {loading ? 'Saving...' : editingPilot ? 'Update Pilot' : 'Add Pilot'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
