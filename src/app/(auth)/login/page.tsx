/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,  
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Routes } from '@/lib/config/Routes';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
export default function login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Card style={{padding:'30px'}} className="w-full max-w-md rounded-[2rem] shadow-xl bg-white border-0">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold">Log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className='mb-2'>
            <Label className='mb-2' htmlFor="email">Username / Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div>
            <Label className='mb-2' htmlFor="password">Password</Label>
              <div className='relative'>
              <Input
                autoComplete=''
                id="password"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                className="pr-10"
              />
                <Button
                  type="button"
                  className="absolute right-2 top-[50%] text-gray-400 translate-y-[-50%]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to the{' '}
            <a href="#" className="underline">
              Terms of use
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
          <Button className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full mt-2">
            Log in
          </Button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-sm underline font-medium">
            Forget your password
          </a>
          <p className="text-sm mt-2">
            Don’t have an account?{' '}
            <Link href={Routes.register} className="underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2 pt-2">
        <div className="flex items-center w-full px-6 gap-4">
          <div className="border-t border-gray-300 flex-grow" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="border-t border-gray-300 flex-grow" />
        </div>
        <Button className="mt-2">
        <GoogleButton
          onClick={() => { console.log('Google button clicked') }}
        />
        </Button>
      </CardFooter>
    </Card>
  );
}
