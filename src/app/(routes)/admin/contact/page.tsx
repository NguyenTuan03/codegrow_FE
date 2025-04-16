'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { useState } from 'react';
import { Select } from '@/components/ui/select';

const users = [
    {
        name: 'Freddie J. Plourde',
        location: '🇬🇧 United Kingdom',
        role: 'UI Designer',
        skills: ['design', 'sketch'],
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        jobSuccess: '98%',
        earned: '$29.8k',
        hours: 1125,
    },
    {
        name: 'Christopher Gallardo',
        location: '🇬🇧 United Kingdom',
        role: 'UX Designer',
        skills: ['figma', 'adobe'],
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        jobSuccess: '100%',
        earned: '$65.3k',
        hours: 2184,
    },
    {
        name: 'Joseph M. Rohr',
        location: '🇬🇧 United Kingdom',
        role: 'Product Designer',
        skills: ['sketch', 'figma'],
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        jobSuccess: '95%',
        earned: '$25.6k',
        hours: 325,
    },
    {
        name: 'Mark K. Horne',
        location: '🇬🇧 United Kingdom',
        role: 'Visual Designer',
        skills: ['adobe', 'sketch'],
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        jobSuccess: '99%',
        earned: '$16.7k',
        hours: 5846,
    },
    {
        name: 'James M. Fonville',
        location: '🇬🇧 United Kingdom',
        role: 'UX Engineer',
        skills: ['figma', 'css'],
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        jobSuccess: '97.5%',
        earned: '$10.2k',
        hours: 895,
    },
    {
        name: 'Jade M. Walker',
        location: '🇬🇧 United Kingdom',
        role: 'Brand Designer',
        skills: ['branding', 'design'],
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        jobSuccess: '95.6%',
        earned: '$15.3k',
        hours: 742,
    },
];

export default function ContactPage() {
    const [search, setSearch] = useState('');

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Contacts</h1>
                <Button variant="default">+ Add New</Button>
            </div>

            <div className="flex gap-4">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <div className="border rounded-md px-3 py-2 text-sm">
                    <Select>
                        <option value="all">Sort by All</option>
                        <option value="name">Name</option>
                        <option value="hours">Hours Worked</option>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user, idx) => (
                    <Card key={idx} className="shadow-md rounded-xl">
                        <CardContent className="p-6 text-center">
                            <Avatar className="mx-auto mb-4 w-16 h-16">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <p className="text-muted-foreground text-sm">{user.location}</p>
                            <p className="text-muted-foreground text-sm">{user.role}</p>
                            <div className="my-2 space-x-1">
                                {user.skills.map((skill, i) => (
                                    <Badge key={i} variant="outline" className="capitalize">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                                <div>
                                    <p className="font-semibold">{user.jobSuccess}</p>
                                    <p>Job Success</p>
                                </div>
                                <div>
                                    <p className="font-semibold">{user.earned}</p>
                                    <p>Total Earned</p>
                                </div>
                                <div>
                                    <p className="font-semibold">{user.hours}</p>
                                    <p>Hours Worked</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Pagination>
                <PaginationContent className="justify-center">
                    {[1, 2, 3, 4, 5].map((page) => (
                        <PaginationItem key={page}>
                            <Button variant="ghost" size="sm">
                                {page}
                            </Button>
                        </PaginationItem>
                    ))}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
