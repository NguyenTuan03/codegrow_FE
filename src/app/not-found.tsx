'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 text-center">
            <div className="max-w-md space-y-6">
                {/* Animated 404 text */}
                <div className="relative">
                    <h1 className="text-9xl font-bold text-gray-800 opacity-10">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-red-500 animate-bounce">
                            LỖI TO CHÀ BÁ!
                        </h2>
                    </div>
                </div>

                {/* Playful description */}
                <p className="text-xl text-gray-600">Trang bạn tìm kiếm đã đi đâu mất tiêu rồi!</p>
                <p className="text-gray-500">
                    Có lẽ trang này đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
                </p>

                {/* Decorative elements */}
                <div className="flex justify-center space-x-2 py-4">
                    {['🤔', '😅', '🕵️', '🔍'].map((emoji, i) => (
                        <span
                            key={i}
                            className="text-2xl animate-bounce"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {emoji}
                        </span>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                    <Button
                        onClick={() => router.back()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
                    >
                        Quay lại trang trước
                    </Button>
                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-all"
                    >
                        Về trang chủ
                    </Button>
                </div>

                {/* Fun illustration */}
                <div className="pt-8">
                    <div className="relative w-40 h-40 mx-auto">
                        <div className="absolute w-full h-full rounded-full bg-yellow-100 border-4 border-yellow-300"></div>
                        <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-red-400 animate-pulse"></div>
                        <div className="absolute top-1/4 right-1/4 w-6 h-6 rounded-full bg-red-400 animate-pulse"></div>
                        <div className="absolute bottom-1/4 left-1/4 right-1/4 h-2 bg-gray-700 rounded-full animate-wiggle"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
