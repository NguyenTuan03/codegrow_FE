import LoginForm from '@/app/(auth)/login/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Suspense>
                <LoginForm />
                {/* <Logout /> */}
            </Suspense>
        </div>
    );
}
