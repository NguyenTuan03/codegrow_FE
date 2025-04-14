'use client';
import { Auth } from '@/lib/components/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
    _id: string;
    role: string;
    name: string;
    email: string;
}
export default function Page() {
    const router = useRouter();
    const auth = useContext(Auth);
    const searchParams = useSearchParams();
    useEffect(() => {
        const token: string | null = searchParams.get('token');
        let jwtdecode: JwtPayload | undefined;

        if (token) {
            try {
                jwtdecode = jwtDecode<JwtPayload>(token);
                console.log(jwtdecode);
            } catch (e) {
                console.error('JWT decode error:', e);
            }
        }

        if (jwtdecode) {
            auth?.loginUser({
                id: jwtdecode._id,
                role: jwtdecode.role,
                fullname: jwtdecode.name,
                email: jwtdecode.email,
            });
        }
    }, [searchParams, router]);
    useEffect(() => {
        if (!auth || !auth.userAuth) {
            router.replace('/login');
            return;
        }

        switch (auth.userAuth.role) {
            case 'admin':
                router.replace('/admin');
                break;
            case 'mentor':
                router.replace('/mentor');
                break;
            case 'qaqc':
                router.replace('/qaqc');
                break;
            case 'customer':
                router.replace('/customer');
                break;
            default:
                router.replace('/login');
                break;
        }
    }, [auth?.userAuth, router]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="text-center space-y-6 max-w-md">
                {/* Animated spinner */}
                <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    </div>
                </div>

                {/* Loading text with animation */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-800">
                        <span className="animate-pulse inline-block">
                            {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
                                <span
                                    key={index}
                                    className={`inline-block animate-bounce delay-${index * 100}`}
                                >
                                    {letter}
                                </span>
                            ))}
                        </span>
                    </h1>
                    <p className="text-gray-600">We are preparing your dashboard...</p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-[45%]"></div>
                </div>

                {/* Optional decorative elements */}
                <div className="flex justify-center space-x-2 pt-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 bg-blue-400 rounded-full animate-bounce`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
