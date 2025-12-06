'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface User {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
}

export default function UsersManagement() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) { router.push('/admin/login'); return }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') { router.push('/'); return }
    setUser(parsedUser)
    fetchUsers()
  }, [router])

  useEffect(() => { filterUsers() }, [users, searchQuery, roleFilter])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) { console.error('Error fetching users:', error) } finally { setLoading(false) }
  }

  const filterUsers = () => {
    let filtered = [...users]
    if (roleFilter !== 'all') filtered = filtered.filter(u => u.role === roleFilter)
    if (searchQuery) filtered = filtered.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredUsers(filtered)
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!confirm('Change role?')) return
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: newRole }) })
      if (!res.ok) throw new Error('Failed')
      await fetchUsers()
    } catch (error) { console.error(error); alert('Failed') }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Delete user?')) return
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      await fetchUsers()
    } catch (error) { console.error(error); alert('Failed') }
  }

  const stats = { total: users.length, admins: users.filter(u => u.role === 'admin').length, regularUsers: users.filter(u => u.role === 'user').length }

  if (!user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900">Users Management</h1></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"><p className="text-sm font-medium text-gray-600">Total Users</p><p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"><p className="text-sm font-medium text-gray-600">Admins</p><p className="text-3xl font-bold text-red-600 mt-2">{stats.admins}</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"><p className="text-sm font-medium text-gray-600">Regular Users</p><p className="text-3xl font-bold text-green-600 mt-2">{stats.regularUsers}</p></div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg"><option value="all">All Roles</option><option value="user">Users</option><option value="admin">Admins</option></select>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div> : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)} disabled={u._id === user?.id} className="text-xs px-3 py-1 rounded-full font-semibold border-0 cursor-pointer bg-gray-100">
                          <option value="user">User</option><option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => handleDelete(u._id)} disabled={u._id === user?.id} className="text-red-600 hover:text-red-900 font-medium">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
