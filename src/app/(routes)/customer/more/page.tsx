'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Rocket, Globe, Briefcase } from 'lucide-react';

import ContactForm from '@/app/(routes)/customer/more/contact-form';

export default function MentorCourses() {
    return (
        <div className="space-y-16 px-6 py-10 md:px-16">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">
                    Upgrade Your Skills with Expert-Led Online Courses!
                </h1>
                <p className="text-muted-foreground">
                    Choose your preferred learning method and start mastering new skills today
                </p>
            </div>

            <div className="grid md:grid-cols-2 ml-70 gap-10 items-center">
                {/* One-on-One */}

                <div>
                    <h2 className="text-xl font-semibold mb-2">One-On-One Learning</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Personalized Mentorship – Learn at your own pace</li>
                        <li>Flexible Scheduling – Choose when and how you learn</li>
                        <li>Tailored Experience – Customized content</li>
                        <li>Direct Feedback – One-on-one interaction</li>
                    </ul>
                </div>
                <Image
                    src="/kids-taking-online-lessons_23-2148517076.png"
                    alt="1-on-1 learning"
                    width={400}
                    height={300}
                    className="object-cover"
                />

                <Image
                    src="/pngtree-online-learning-group-of-students-png-image_3869760.png"
                    alt="group learning"
                    width={400}
                    height={300}
                    className="object-cover"
                />
                <div>
                    <h2 className="text-xl font-semibold mb-2">Group Learning</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Interactive Discussions – Engage in knowledge-sharing</li>
                        <li>Peer-to-Peer Support – Collaborate with others</li>
                        <li>Cost-Effective – Budget-friendly learning</li>
                        <li>Engaging Group Activities – Team-based exercises</li>
                    </ul>
                </div>
            </div>
            <hr className="border-t border-gray-300 my-10" />

            <div>
                <h2 className="text-2xl font-bold text-center mb-12">Benefits After Completion</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'Certified Completion',
                            desc: 'Official certificate to boost your resume',
                            icon: <Award className="w-12 h-12 text-blue-500 mx-auto" />,
                        },
                        {
                            title: 'Job-Ready Skills',
                            desc: 'Gain practical skills employers value',
                            icon: <Rocket className="w-12 h-12 text-blue-500 mx-auto" />,
                        },
                        {
                            title: 'Lifetime Access',
                            desc: 'Revisit course materials anytime',
                            icon: <Globe className="w-12 h-12 text-blue-500 mx-auto" />,
                        },
                        {
                            title: 'Career Support',
                            desc: 'Resume building & job recommendations',
                            icon: <Briefcase className="w-12 h-12 text-blue-500 mx-auto" />,
                        },
                    ].map((item, idx) => (
                        <Card key={idx} className="text-center rounded-lg shadow-md border-none">
                            <CardHeader>
                                {item.icon}
                                <CardTitle className="text-lg font-semibold mt-4">
                                    {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <hr className="border-t border-gray-300 my-10" />

            <ContactForm />
            <hr className="border-t border-gray-300 my-10" />
        </div>
    );
}
