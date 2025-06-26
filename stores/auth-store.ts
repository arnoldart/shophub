"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  password?: string
}

interface AuthState {
  user: User | null
  loggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  // setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      loggedIn: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        try {
          const currentUser = get().user

          if(currentUser && currentUser.email === email && currentUser.password === password) {
            set({ isLoading: false, loggedIn: true })
            return true
          }

          set({ isLoading: false, loggedIn: false })
          return false
        } catch (error) {
          set({ isLoading: false, loggedIn: false })
          return false
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({isLoading: true})
        try {
          if(email && password && name) {
            const user: User = {
              id: "1",
              name: name,
              email: email,
              password: password,
            }
            set({ user, isLoading: false, loggedIn: true }) // Set loggedIn true after successful register
            return true
          }

          set({ isLoading: false, loggedIn: false })
          return false
        } catch (error) {
          set({ isLoading: false, loggedIn: false })
          return false
        }
      },

      logout: () => {
        set({ user: null, loggedIn: false }) // Set loggedIn false when logout
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, loggedIn: state.loggedIn }), // Persist both user and loggedIn
    }
  )
)

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       isLoading: false,

//       login: async (email: string, password: string): Promise<boolean> => {
//         set({ isLoading: true })
        
//         try {
//           // Mock login - replace with real authentication
//           if (email && password) {
//             const user = {
//               id: "1",
//               name: "John Doe",
//               email: email,
//             }
//             set({ user, isLoading: false })
//             return true
//           }
//           set({ isLoading: false })
//           return false
//         } catch (error) {
//           set({ isLoading: false })
//           return false
//         }
//       },

//       register: async (name: string, email: string, password: string): Promise<boolean> => {
//         set({ isLoading: true })
        
//         try {
//           // Mock registration - replace with real authentication
//           if (name && email && password) {
//             const user = {
//               id: "1",
//               name: name,
//               email: email,
//             }
//             set({ user, isLoading: false })
//             return true
//           }
//           set({ isLoading: false })
//           return false
//         } catch (error) {
//           set({ isLoading: false })
//           return false
//         }
//       },

//       logout: () => {
//         set({ user: null })
//       },

//       setUser: (user: User | null) => {
//         set({ user })
//       },
//     }),
//     {
//       name: 'auth-storage', // localStorage key
//       partialize: (state) => ({ user: state.user }), // Only persist user data
//     }
//   )
// )
