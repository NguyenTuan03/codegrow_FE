import { Star } from 'lucide-react';

export default function TrainerProfile() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">React JS</h1>
                <h2 className="text-xl text-gray-600">REACTJS - 312</h2>
            </div>

            {/* Trainer Profile */}
            <div className="border-b pb-6 mb-6">
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                    <div>
                        <h3 className="text-2xl font-bold">Raj Mishra</h3>
                        <p className="text-gray-600 italic mb-4">
                            My clients describe my training style as motivating and life-changing.
                        </p>

                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <span className="font-medium">@coaching</span>
                        </div>
                        <div className="text-gray-500 mb-1">San Francisco, CA</div>
                        <div className="text-gray-500 mb-1">Joined April 2021</div>
                        <div className="font-bold">$0 (12)</div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-bold mb-4">About</h3>
                <p className="mb-4">
                    Hi I am excited to guide you on your journey of becoming a healthier you. I want
                    to share my own story to hopefully inspire you to start this next chapter of
                    your life.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {[
                        'Yoga',
                        'Bodybuilding',
                        'Kitchening',
                        'ACE Certification',
                        'NASM Certification',
                        'Meditation Coach',
                    ].map((skill) => (
                        <span
                            key={skill}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm text-center"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 border-b pb-6 mb-6">
                <div>
                    <div className="text-3xl font-bold">351</div>
                    <div className="text-gray-500">Completed Sessions</div>
                </div>
                <div>
                    <div className="text-3xl font-bold">2+</div>
                    <div className="text-gray-500">Years Experience</div>
                </div>
            </div>

            {/* Reviews */}
            <div>
                <h3 className="text-xl font-bold mb-4">6 Reviews</h3>

                {/* Review 1 */}
                <div className="border-b pb-6 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="font-bold">5.0</span>
                    </div>
                    <p className="mb-2">The seller did a fantastic job of designing my website</p>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <span>🔍</span>
                        <span className="font-medium">Emma Pérez</span>
                        <span>December 8, 2019</span>
                    </div>
                    <p className="text-gray-600">
                        Coach Raj is the best trainer I have had. I lost 10 kids in two months, he
                        really knows his stuff. Great work ethic, extremely motivating, always
                        positive...
                        <span className="text-blue-500 cursor-pointer"> Read more</span>
                    </p>
                </div>

                {/* Review 2 - Duplicated for demo */}
                <div className="border-b pb-6 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="font-bold">5.0</span>
                    </div>
                    <p className="mb-2">The seller did a fantastic job of designing my website</p>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <span>🔍</span>
                        <span className="font-medium">Emma Pérez</span>
                        <span>December 8, 2019</span>
                    </div>
                    <p className="text-gray-600">
                        Coach Raj is the best trainer I have had. I lost 10 kids in two months, he
                        really knows his stuff. Great work ethic, extremely motivating, always
                        positive...
                        <span className="text-blue-500 cursor-pointer"> Read more</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
