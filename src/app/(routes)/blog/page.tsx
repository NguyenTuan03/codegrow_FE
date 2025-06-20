'use client';

import Customerheader from '@/lib/components/layout/header/Customerheader';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { format } from 'date-fns'; // For date formatting

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
    author: string | null;
    source: {
        name: string;
        id: string | null;
    };
}

const NewsPage = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

    useEffect(() => {
        const fetchNews = async () => {
            if (!apiKey) {
                setError('API key is missing. Please configure the environment.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const url = `https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=${apiKey}&pageSize=20`;
                const response = await fetch(url);
                console.log('check res', response);
                if (!response.ok) {
                    if (response.status === 426) {
                        throw new Error(
                            'Upgrade Required: The News API may require a newer version or plan. Please check the API documentation.',
                        );
                    }
                    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                if (data.status === 'ok') {
                    setNews(data.articles || []);
                } else {
                    throw new Error('API error: ' + data.message);
                }
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred while fetching news.',
                );
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [apiKey]);

    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <Customerheader />
            <h1 className="text-3xl mt-20 font-bold mb-6 text-gray-900 dark:text-gray-100">
                Latest News About Apple
            </h1>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                        >
                            <Skeleton className="w-full h-48 rounded-t-lg" />
                            <Skeleton className="h-6 w-3/4 mt-2" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-1/2 mt-1" />
                            <Skeleton className="h-4 w-1/3 mt-1" />
                            <Skeleton className="h-4 w-2/3 mt-2" />
                            <Skeleton className="h-4 w-1/4 mt-2" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-center text-red-500 dark:text-red-400 text-base font-medium">
                    {error}
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {news.length > 0 ? (
                        news.map((article) => (
                            <motion.div
                                key={article.url}
                                variants={itemVariants}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
                            >
                                {article.urlToImage ? (
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title || 'News article image'}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            No Image
                                        </span>
                                    </div>
                                )}
                                <h2 className="text-xl font-semibold mt-2 text-gray-900 dark:text-gray-100 line-clamp-2">
                                    {article.title || 'Untitled Article'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                                    {article.description || 'No description available.'}
                                </p>
                                {article.author && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Author: {article.author}
                                    </p>
                                )}
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Source: {article.source.name || 'Unknown'}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Published:{' '}
                                    {article.publishedAt
                                        ? format(new Date(article.publishedAt), 'MMM d, yyyy')
                                        : 'Unknown'}
                                </p>
                                {article.content && (
                                    <p className="text-gray-700 dark:text-gray-200 mt-2 line-clamp-4">
                                        {article.content}
                                    </p>
                                )}
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#657ED4] dark:text-[#5AD3AF] mt-2 inline-block hover:underline font-medium"
                                    aria-label={`Read full article: ${article.title || 'News article'}`}
                                >
                                    Read more
                                </a>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400 text-base font-medium">
                            No news available at the moment.
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default NewsPage;
