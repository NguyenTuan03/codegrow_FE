'use client'
import { FEedges, FEnodes } from '@/lib/enum/roadmap/FrontEnd';
import { Background, Controls, ReactFlow } from '@xyflow/react'
import { useParams } from 'next/navigation'
import React from 'react'
import '@xyflow/react/dist/style.css';
import { nodeTypes } from "@/lib/components/nodes/CustomsNode";
const Page = () => {
    const params = useParams();
    console.log(params);
    
  return (
    <>
        <div className='text-center py-5 text-bold text-2xl'>{params.slug} Developer</div>
        <div style={{ width: '100%', height:'800px'}}>
            <ReactFlow
            nodes={FEnodes}
            edges={FEedges}
            fitView
            fitViewOptions={{ padding: 0.4 }}
            defaultEdgeOptions={{
                type: 'smoothstep',
            }}
            nodeTypes={nodeTypes}
            >
            <Background color="#f0f0f0" gap={16} />
            <Controls />
            </ReactFlow>
        </div>
    </>
  )
}

export default Page