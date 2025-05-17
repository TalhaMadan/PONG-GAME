import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// This would be stored in an environment variable in a real app
const JWT_SECRET = "your-secret-key"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, username, email, password } = body

    if (action === "register") {
      // Check if user already exists
      const existingUser = await db.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      })

      if (existingUser) {
        return NextResponse.json({ error: "Username or email already exists" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const user = await db.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      })

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json(userWithoutPassword)
    } else if (action === "login") {
      // Find user
      const user = await db.user.findFirst({
        where: {
          username,
        },
      })

      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Create JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" })

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        user: userWithoutPassword,
        token,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

