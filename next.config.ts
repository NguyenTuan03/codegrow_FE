import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['codegrow-content.s3.ap-southeast-1.amazonaws.com', 'lh3.googleusercontent.com'],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8888/:path*',
            },
        ];
    },
};

export default nextConfig;
