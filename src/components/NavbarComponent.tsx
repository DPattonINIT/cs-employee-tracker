'use client'

import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/lib/context/context';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const NavbarComponent = () => {
    const { isLoggedIn, setIsLoggedIn } = useAppContext();

    const { push } = useRouter();

    const [name, setName] = useState('');

    const logout = () => {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
        }
        if (sessionStorage.getItem('user')) {
            sessionStorage.removeItem('user');
        }

        setIsLoggedIn(false);

        push('/login');
    }

    useEffect(() => {
        const getUser = () => {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user')!);
            }

            if (sessionStorage.getItem('user')) {
                return JSON.parse(sessionStorage.getItem('user')!);
            }
        }

        if (isLoggedIn) {
            const user = getUser();

            setName(user.email.split('@')[0]);
        }
    }, [isLoggedIn])

    return (
        <div className="absolute top-0 w-full flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">Employee Tracker</h1>
            {isLoggedIn && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="border px-4 py-2 rounded-md hover:cursor-pointer">{name}</DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className='hover:cursor-pointer' onClick={logout}>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default NavbarComponent