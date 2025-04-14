import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8888/:path*', // Proxy đến backend
            },
        ];
    },
};

export default nextConfig;
