'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface Package {
  _id: string
  title: string
  description?: string
  category: string
  difficulty: string
  location: string
  duration: string
  price: number
  image?: string
  features: string[]
  included: string[]
  excluded: string[]
  isActive: boolean
  createdAt: string
}

export default function PackagesManagement() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Basic Course', difficulty: 'Easy', location: 'Bir Billing, Himachal Pradesh', duration: '', price: 0, image: '', features: '', included: '', excluded: '', isActive: true
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) { router.push('/admin/login'); return }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') { router.push('/'); return }
    setUser(parsedUser)
    fetchPackages()
  }, [router])

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/admin/packages')
      const data = await res.json()
      setPackages(Array.isArray(data) ? data : [])
    } catch (error) { console.error('Error fetching packages:', error) } finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = editingPackage ? `/api/admin/packages/${editingPackage._id}` : '/api/admin/packages'
      const method = editingPackage ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Failed to save package')
      await fetchPackages()
      setShowModal(false)
      resetForm()
    } catch (error) { console.error('Error saving package:', error); alert('Failed to save package') } finally { setLoading(false) }
  }

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg)
    setFormData({
      title: pkg.title, description: pkg.description || '', category: pkg.category, difficulty: pkg.difficulty, location: pkg.location, duration: pkg.duration, price: pkg.price, image: pkg.image || '', features: pkg.features.join(', '), included: pkg.included.join(', '), excluded: pkg.excluded.join(', '), isActive: pkg.isActive
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return
    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete package')
      await fetchPackages()
    } catch (error) { console.error('Error deleting package:', error); alert('Failed to delete package') }
  }

  const handleToggleActive = async (pkg: Package) => {
    try {
      const res = await fetch(`/api/admin/packages/${pkg._id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pkg, isActive: !pkg.isActive, features: pkg.features.join(', '), included: pkg.included.join(', '), excluded: pkg.excluded.join(', ') })
      })
      if (!res.ok) throw new Error('Failed to toggle status')
      await fetchPackages()
    } catch (error) { console.error('Error toggling status:', error); alert('Failed to toggle status') }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', category: 'Basic Course', difficulty: 'Easy', location: 'Bir Billing, Himachal Pradesh', duration: '', price: 0, image: '', features: '', included: '', excluded: '', isActive: true })
    setEditingPackage(null)
  }

  if (!user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div></div>

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900">Packages Management</h1></div>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">All Packages ({packages.length})</h2>
          <button onClick={() => { resetForm(); setShowModal(true) }} className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-lg">+ Add New Package</button>
        </div>
        {loading ? <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div></div> : packages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mt-4">No packages added yet</p>
            <button onClick={() => { resetForm(); setShowModal(true) }} className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Add First Package</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
                {pkg.image ? <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500"></div>}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3"><span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{pkg.category}</span></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-2xl font-bold text-orange-600">₹{pkg.price.toLocaleString()}</p>
                  <div className="flex gap-2 pt-4 border-t border-gray-200 mt-4">
                    <button onClick={() => handleEdit(pkg)} className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Edit</button>
                    <button onClick={() => handleDelete(pkg._id)} className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-900">{editingPackage ? 'Edit Package' : 'Add New Package'}</h2><button onClick={() => setShowModal(false)} className="text-gray-400">X</button></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Category *</label><input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label><input type="text" required value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Price *</label><input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                <div className="flex gap-3 pt-4"><button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button><button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg">{loading ? 'Saving...' : 'Save'}</button></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
