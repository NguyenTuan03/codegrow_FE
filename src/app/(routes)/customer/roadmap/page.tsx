'use client';

import React from 'react';
import '@xyflow/react/dist/style.css';
import { ReactFlow, Background, Controls, ReactFlowProvider } from '@xyflow/react';
import { FEedges, FEnodes } from '@/lib/enum/roadmap/FrontEnd';
import Link from 'next/link';
export default function Page() {
    const roadmap = [
        {
            name: 'FrontEnd',
            href:'/customer/roadmap/FrontEnd'
        },
        {
            name: 'BackEnd',
            href:'/customer/roadmap/FrontEnd'
        },
        {
            name: 'SAP',
            href:'/customer/roadmap/FrontEnd'
        },
        {
            name: 'SAP',
            href:'/customer/roadmap/FrontEnd'
        },
    ];
    return (
        <ReactFlowProvider>
            {/* <div style={{ width: '100%', height: '100vh' }}>
        <ReactFlow
          nodes={FEnodes}
          edges={FEedges}
          fitView
          fitViewOptions={{ padding: 0.4 }}
          defaultEdgeOptions={{
            type: 'smoothstep',
          }}
        >
          <Background color="#f0f0f0" gap={16} />
          <Controls />
        </ReactFlow>
      </div> */}
            <div className="w-[830px] m-auto h-[100vh]">
                <div className="py-5">ROLE BASED ROADMAPS</div>
                <div className="grid grid-cols-12 gap-4">
                    {roadmap.map((item, index) => {
                        return (                          
                            <Link
                                className="col-span-3 bg-white rounded-[6px] py-[8px] px-[12px] border-[#c1c3c6] border-1 shadow-xs transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                key={index}
                                href={`${item.href}`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </ReactFlowProvider>
    );
}
