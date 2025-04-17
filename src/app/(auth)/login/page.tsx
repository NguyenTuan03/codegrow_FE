import LoginForm from '@/app/(auth)/login/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-[#7ECFAF] via-[#C7E6D7] to-[#6C7ED0] dark:from-gray-700 dark:via-gray-700 dark:to-gray-900 transition-colors duration-300">
            <Suspense>
                <LoginForm />
                {/* <Logout /> */}
            </Suspense>
        </div>
    );
}
