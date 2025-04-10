"use client";
import Link from 'next/link';
import React from 'react';

const AdminPage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin panel. Manage your application here.</p>
            <div>
                <button onClick={() => alert('Users Management')}>Manage Users</button>
                <Link href={'/settings'}>Settings</Link>
                <button onClick={() => alert('Reports')}>View Reports</button>
            </div>
        </div>
    );
};

export default AdminPage;