// This is a mock database implementation
// In a real app, you would use Prisma or another ORM

interface User {
  id: string
  username: string
  email: string
  password: string
  createdAt: Date
}

class MockDatabase {
  private users: User[] = []

  user = {
    findFirst: async ({ where }: { where: any }) => {
      if (where.OR) {
        return this.users.find((user) =>
          where.OR.some((condition: any) =>
            Object.entries(condition).every(([key, value]) => user[key as keyof User] === value),
          ),
        )
      }

      return this.users.find((user) => Object.entries(where).every(([key, value]) => user[key as keyof User] === value))
    },
    create: async ({ data }: { data: Omit<User, "id" | "createdAt"> }) => {
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        ...data,
        createdAt: new Date(),
      }
      this.users.push(newUser as User)
      return newUser
    },
  }
}

export const db = new MockDatabase()

