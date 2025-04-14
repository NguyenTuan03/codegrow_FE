'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface VerifyGmailDialogProps {
    token: string | null; // Token được truyền từ trang Login
    onClose: () => void; // Hàm đóng dialog
}

const VerifyGmailDialog: React.FC<VerifyGmailDialogProps> = ({ token, onClose }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (!token) {
            toast({
                description: 'Token is missing. Please try again.',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);

        try {                        

            toast({
                description: 'Verification successful!',
            });

            // Chuyển hướng đến trang home
            router.push('/');
        } catch (error) {
            console.error('Verification failed:', error);
            toast({
                description: 'Verification failed. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
            onClose(); // Đóng dialog sau khi xử lý xong
        }
    };

    return (
        <Dialog open={!!token} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Verify Your Gmail</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-600 mb-6">
                    Click the button below to verify your Gmail account.
                </p>
                <Button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white"
                >
                    {loading ? 'Verifying...' : 'Verify Gmail'}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default VerifyGmailDialog;
