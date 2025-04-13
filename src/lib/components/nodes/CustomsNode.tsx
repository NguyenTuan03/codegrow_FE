import { Handle, Position, NodeProps } from "@xyflow/react";

const CustomNode = ({ data }: NodeProps) => {
  return (
    <div
      style={{
        background: "#fff14c",
        padding: "10px",
        borderRadius: "12px",
        border: "2px solid #000",
        fontWeight: "bold",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "180px",
      }}
    >      
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: "#000", borderRadius: "50%", width: "8px", height: "8px" }}
      />      
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: "#000", borderRadius: "50%", width: "8px", height: "8px" }}
      />
      {data.label}
    </div>
  );
};

// Map the custom node type
export const nodeTypes = {
  custom: CustomNode,
};