import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Define the Account type
type Account = {
    fullName: string;
    email: string;
    role: 'mentor' | 'customer' | 'admin';
};

export default function UpdateUser({
    account,
    onUpdate,
    onClose,
}: {
    account: Account;
    onUpdate: (updatedData: Partial<Account>) => void;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState<Partial<Account>>({
        fullName: account.fullName,
        email: account.email,
        role: account.role,
    });

    const handleSubmit = () => {
        onUpdate(formData); // Gọi callback onUpdate với dữ liệu cập nhật
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 " onClick={onClose} />

            {/* Update Form */}
            <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
                <h2 className="text-xl font-bold mb-4">Update Account</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full border rounded px-3 py-2"
                    />
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="w-full border rounded px-3 py-2"
                    />
                    <div className="space-y-4">
                        <label
                            htmlFor="role-select"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Role
                        </label>
                        <select
                            id="role-select"
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value as 'mentor' | 'customer' | 'admin',
                                })
                            }
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="mentor">Mentor</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-500 text-white" onClick={handleSubmit}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
}
