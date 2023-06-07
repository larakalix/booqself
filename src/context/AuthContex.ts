// import React, { createContext, useState, useContext, useEffect } from 'react

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {

//     const logout = () => {
//         Cookies.remove('token')
//         setUser(null)
//         delete api.defaults.headers.Authorization
//         window.location.pathname = '/login'
//     }

//     return (
//         <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading: isLoading, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// };
