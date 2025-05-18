'use client'

import { createContext, useContext, useEffect, useState } from "react";

interface LoginContext {
    isLoggedIn: boolean;
    setIsLoggedIn: (bool: boolean) => void;
}

const LoginContext = createContext<LoginContext>({
    isLoggedIn: false,
    setIsLoggedIn: (bool: boolean) => '',
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            let loggedIn = false;

            if(localStorage.getItem('user')) loggedIn = true;
            if(sessionStorage.getItem('user')) loggedIn = true;
        
            setIsLoggedIn(loggedIn);
        }

        checkLogin();
    }, [])

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children} 
        </LoginContext.Provider>
        
    )
}

export const useLoginContext = () => useContext(LoginContext);