// @/components/DeleteConfirmationModal.tsx
'use client';

interface DeleteConfirmationModalProps {
    isDeleteModalOpen: boolean;
    handleCancelDelete: () => void;
    handleDelete: () => void;
}

export default function DeleteConfirmationModal({
    isDeleteModalOpen,
    handleCancelDelete,
    handleDelete,
}: DeleteConfirmationModalProps) {
    if (!isDeleteModalOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl border border-[#EEF1EF] dark:border-[#657ED4]/30">
                <h2 className="text-xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-4">
                    Confirm Deletion
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to delete this course? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleCancelDelete}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
