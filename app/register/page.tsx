'use client'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Register = () => {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!username) {
      toast.error('Username field cannot be empty')
      return
    }

    if (!password) {
      toast.error('password cannot be empty')
      return
    }

    try {
      const registerResult = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      })

      if (registerResult.status >= 400) {
        const errorMessage: { message: string } = await registerResult.json()
        toast.error(errorMessage.message)
        return
      }

      if (registerResult.status >= 200 && registerResult.status < 300) {
        const registerData: { message: string } = await registerResult.json()

        toast.success(registerData.message)
        router.replace('/login')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        toast.error('Some error occurred, check console for more information')
      }
    }
  }

  return (
    <div className="w-full flex justify-center items-center gap-6" style={{ height: 'calc(100vh - 84px)' }}>
      <form
        className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-2xl shadow-2xl w-96 mx-auto relative overflow-hidden border border-white/20"
        onSubmit={handleSubmit}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-xl"></div>

        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">Register</h2>

        <div className="space-y-5">
          <input
            type="text"
            className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-sm"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />

          <input
            type="password"
            className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 active:scale-95 transform transition-all shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="inline-block h-px w-16 bg-white/30"></span>
        </div>
      </form>
    </div>
  )
}

export default Register
