// app/password/reset/page.tsx
import ResetPasswordForm from './ResetPasswordForm';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset Password',
};

interface PageProps {
    searchParams: {
        token?: string;
    };
}

export default function Page({ searchParams }: PageProps) {
    if (!searchParams.token) {
        return <div className="text-red-500 p-4 text-center">Invalid reset link</div>;
    }

    return <ResetPasswordForm token={searchParams.token} />;
}
