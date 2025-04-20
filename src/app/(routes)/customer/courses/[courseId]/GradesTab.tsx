// @/components/GradesTab.tsx
'use client';

export default function GradesTab() {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-[#EEF1EF] dark:border-[#657ED4]/30">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Điểm số của bạn
            </h3>

            <div className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                        Tổng quan điểm số
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Điểm trung bình
                            </p>
                            <p className="text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                                8.5
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Bài tập đã hoàn thành
                            </p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                3/5
                            </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Xếp hạng</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                Top 20%
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                        Chi tiết điểm số
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Bài học
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Loại
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Điểm
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Bài kiểm tra 1
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        Trắc nghiệm
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        9.0
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400">
                                            Hoàn thành
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
