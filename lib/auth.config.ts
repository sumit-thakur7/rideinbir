import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from './db'
import User from './models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        await connectDB()
        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.password) {
          throw new Error('User not found')
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
          throw new Error('Invalid password')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as string
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}
