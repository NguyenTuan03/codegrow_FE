'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                description: 'Passwords do not match.',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);

        try {
            // Gọi API để đặt lại mật khẩu
            console.log('Resetting password to:', password);
            toast({
                description: 'Password reset successfully!',
            });
            router.push('/login'); // Chuyển hướng về trang login
        } catch (error) {
            toast({
                description: 'Failed to reset password. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-semibold text-center mb-4">Reset Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading} className="w-full bg-blue-500 text-white">
                    {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;
