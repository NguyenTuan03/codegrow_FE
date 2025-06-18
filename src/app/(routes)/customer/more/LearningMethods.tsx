// @/components/LearningMethods.tsx
'use client';

import Image from 'next/image';

export default function LearningMethods() {
    return (
        <div className="space-y-12 ml-60 mt-10   transition-colors duration-300 ">
            {/* One-on-One Learning */}
            <div className="grid md:grid-cols-2 gap-8  items-center">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold ">One-On-One Learning</h2>
                    <ul className="space-y-2 text-xl text-gray-600 dark:text-gray-400">
                        {[
                            'Personalized Mentorship – Learn at your own pace',
                            'Flexible Scheduling – Choose when and how you learn',
                            'Tailored Experience – Customized content',
                            'Direct Feedback – One-on-one interaction',
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="w-2 h-2  bg-[#657ED4] dark:bg-[#5AD3AF] rounded-full"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <Image
                    src="/undraw_online-learning_tgmv (1).svg"
                    alt="1-on-1 learning"
                    width={400}
                    height={300}
                    className="object-cover rounded-lg shadow-md"
                />
            </div>

            {/* Group Learning */}
            <div className="grid md:grid-cols-2 gap-8  items-center">
                <Image
                    src="/undraw_work-chat_hc3y.svg"
                    alt="group learning"
                    width={400}
                    height={300}
                    className="object-cover rounded-lg shadow-md md:order-first"
                />
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold ">Group Learning</h2>
                    <ul className="space-y-2 text-xl text-gray-600 dark:text-gray-400">
                        {[
                            'Interactive Discussions – Engage in knowledge-sharing',
                            'Peer-to-Peer Support – Collaborate with others',
                            'Cost-Effective – Budget-friendly learning',
                            'Engaging Group Activities – Team-based exercises',
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#657ED4] dark:bg-[#5AD3AF] rounded-full"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
