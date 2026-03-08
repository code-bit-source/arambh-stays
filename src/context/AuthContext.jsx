import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'aarambh_user'

function getStoredUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getStoredUser)

    const login = useCallback((userData) => {
        setUser(userData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    }, [])

    const signup = useCallback((userData) => {
        setUser(userData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
    }, [])

    const value = useMemo(() => ({
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
    }), [user, login, signup, logout])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return ctx
}
