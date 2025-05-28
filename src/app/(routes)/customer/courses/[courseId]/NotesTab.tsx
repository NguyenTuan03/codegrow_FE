// @/components/NotesTab.tsx
'use client';

import { Button } from '@/components/ui/button';

export default function NotesTab() {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-[#EEF1EF] dark:border-[#657ED4]/30">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Ghi chú của bạn
                </h3>
                <Button className="bg-[#657ED4] hover:bg-[#354065] text-white">
                    + Thêm ghi chú mới
                </Button>
            </div>

            <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-medium text-xl text-gray-800 dark:text-gray-200">
                                Khái niệm TDD quan trọng
                            </h4>
                            <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                                Module 1 - Introduction to TDD
                            </p>
                        </div>
                        <span className="text-base text-gray-400">2 ngày trước</span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        TDD là viết test trước khi viết code. Quy trình: Red - Green - Refactor. Đảm
                        bảo code luôn được test và dễ bảo trì.
                    </p>
                    <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">
                            Chỉnh sửa
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900"
                        >
                            Xóa
                        </Button>
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-medium text-xl text-gray-800 dark:text-gray-200">
                                Các loại test trong TDD
                            </h4>
                            <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                                Module 2 - TDD Principles
                            </p>
                        </div>
                        <span className="text-base text-gray-400">1 tuần trước</span>
                    </div>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                        1. Unit Test: Test từng hàm/class riêng lẻ 2. Integration Test: Test sự kết
                        hợp giữa các component 3. End-to-End Test: Test toàn bộ luồng ứng dụng
                    </p>
                    <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">
                            Chỉnh sửa
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900"
                        >
                            Xóa
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
