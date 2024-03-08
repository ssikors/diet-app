import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth/next"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"
import { Adapter } from "next-auth/adapters"

export const authOptions : AuthOptions = {
  adapter: <Adapter>PrismaAdapter(prisma), //
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ]
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}