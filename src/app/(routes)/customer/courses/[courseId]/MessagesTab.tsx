// @/components/MessagesTab.tsx
'use client';

import { Button } from '@/components/ui/button';

export default function MessagesTab() {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-[#EEF1EF] dark:border-[#657ED4]/30">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Thảo luận
            </h3>

            <div className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <textarea
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-[#657ED4] focus:border-[#657ED4] dark:focus:ring-[#5AD3AF] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        rows={3}
                        placeholder="Đặt câu hỏi hoặc tham gia thảo luận..."
                    ></textarea>
                    <div className="mt-3 flex justify-end">
                        <Button className="bg-[#657ED4] hover:bg-[#354065] text-white">
                            Đăng câu hỏi
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                                HT
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                        Hoàng Trung
                                    </h4>
                                    <span className="text-xs text-gray-400">3 giờ trước</span>
                                </div>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">
                                    Ai có thể giải thích rõ hơn về khái niệm `Red-Green-Refactor`
                                    không? Mình chưa hiểu phần Refactor lắm.
                                </p>
                                <div className="mt-3 flex gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 dark:text-gray-400"
                                    >
                                        3 Trả lời
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 dark:text-gray-400"
                                    >
                                        Trả lời
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                                LM
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                        Linh Mai
                                    </h4>
                                    <span className="text-xs text-gray-400">1 ngày trước</span>
                                </div>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">
                                    Có công cụ nào hỗ trợ TDD cho JavaScript không? Mọi người có thể
                                    chia sẻ kinh nghiệm không?
                                </p>
                                <div className="mt-3 flex gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 dark:text-gray-400"
                                    >
                                        5 Trả lời
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 dark:text-gray-400"
                                    >
                                        Trả lời
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
