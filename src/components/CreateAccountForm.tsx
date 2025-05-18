'use client'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Link from 'next/link'
import { createUser } from '@/lib/services/user-services';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai";

const CreateAccountForm = () => {
  const { push } = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [creationError, setCreationError] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const inputsFilled = user.email !== "" && user.password !== "";

  const changeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value.trim(),
    });

    if (creationError) {
      setCreationError(false);
    }
  };

  const handleCreateUser = async () => {
    setCreatingAccount(true);

    try {
      const newUser = { email: user.email, password: user.password };


      if (await createUser(newUser)) {
        push("/login");
      } else {
        setCreationError(true);
      }
    } catch {
      setCreationError(true);
    }

    setCreatingAccount(false);
  };

  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            className={creationError ? "text-red-500" : ""}
          >
            Your email
          </Label>
        </div>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          required
          value={user.email}
          onChange={changeUser}
          color={creationError ? 'failure' : ''}
          className={creationError ? "border-red-500" : ""}
        />
        {
          creationError && (
            <p className="text-red-500 text-sm"><span className='font-medium'>Oops!</span> Email may already be in use.</p>
          )
        }
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor="password">
            Your password
          </Label>
        </div>
        <Input
          id="password"
          type="password"
          required
          value={user.password}
          onChange={changeUser}
          className={creationError ? "border-red-500" : ""}
        />
      </div>
      <Button
        onClick={handleCreateUser}
        disabled={!inputsFilled || creatingAccount}
      >
        {creatingAccount ? (
          <>
            <AiOutlineLoading className="h-6 w-6 animate-spin mr-3" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
      <div className="flex w-75">
        <p>Already have one?</p>
        <Link href="/login" className="ml-2 text-blue-700 hover:underline">
          Login here :&#41;
        </Link>
      </div>
    </>
  )
}

export default CreateAccountForm