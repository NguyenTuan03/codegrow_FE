'use client';

import useUser from '@/hooks/useUser';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React from 'react';
import { v4 as uuid } from 'uuid';

// Explicitly define the props type for a dynamic route page
interface RoomPageProps {
    params: { roomid: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const Room = ({ params }: RoomPageProps) => {
    const { fullName } = useUser();
    const roomID = params.roomid;

    const myMeeting = (element: HTMLDivElement | null) => {
        if (!element) return;
        // Generate Kit Token
        const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            uuid(),
            fullName || 'user' + Date.now(),
            720,
        );

        // Create instance object from Kit Token
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // Start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Shareable link',
                    url:
                        window.location.protocol +
                        '//' +
                        window.location.host +
                        window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            maxUsers: 10,
        });
    };

    return <div className="w-full h-screen" ref={myMeeting}></div>;
};

export default Room;
