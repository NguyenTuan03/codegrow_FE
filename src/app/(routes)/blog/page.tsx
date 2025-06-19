'use client';

import Customerheader from '@/lib/components/layout/header/Customerheader';
import React, { useState, useEffect } from 'react';

interface article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    author: string;
    source: {
        name: string;
        id: string;
    };
}
const NewsPage = () => {
    const [news, setNews] = useState<article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Using your provided API key directly (for demo purposes only)
    const apiKey = '593d09b7078748db9c25576d621b08e6'; // Replace with environment variable in production

    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log('Fetching news with API key:', apiKey); // Debug API key
                const url = `https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=${apiKey}&pageSize=20`;
                console.log('Fetching news with URL:', url); // Debug URL
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Raw API response:', data); // Debug raw response
                if (data.status === 'ok') {
                    console.log('Total results:', data.totalResults); // Debug total results
                    console.log('Articles data:', data.articles); // Debug articles
                    setNews(data.articles || []);
                } else {
                    throw new Error('API error: ' + data.message);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [apiKey]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <Customerheader />
            <h1 className="text-3xl mt-20 font-bold mb-6 text-gray-800">Latest News About Apple</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                        >
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            )}
                            <h2 className="text-xl font-semibold mt-2 text-gray-700">
                                {article.title}
                            </h2>
                            <p className="text-gray-600 mt-2 line-clamp-3">{article.description}</p>
                            {article.author && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Author: {article.author}
                                </p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                                Source: {article.source.name || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Published: {new Date(article.publishedAt).toLocaleDateString()}
                            </p>
                            {article.content && (
                                <p className="text-gray-700 mt-2 line-clamp-4">{article.content}</p>
                            )}
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 mt-2 inline-block hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-10">
                        No news available. Total results: {error ? error : '0'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default NewsPage;
