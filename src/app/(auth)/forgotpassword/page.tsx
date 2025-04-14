'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Gọi API gửi email reset password
            console.log('Sending reset password email to:', email);
            toast({
                description: 'Reset password email sent successfully!',
            });
        } catch (error) {
            toast({
                description: 'Failed to send reset password email. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-semibold text-center mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading} className="w-full bg-blue-500 text-white">
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
            </form>
        </div>
    );
};

export default ForgotPassword;
