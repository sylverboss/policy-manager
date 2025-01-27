import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, Text, Group, Button } from '@mantine/core';
import { IconRefresh, IconZoomIn, IconZoomOut } from '@tabler/icons-react';
import PolicyNode from './PolicyNode';
import { generateGraphData } from '../../services/policyGraphService';

const nodeTypes = {
  policyNode: PolicyNode
};

export default function PolicyGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [zoom, setZoom] = useState(1);

  const refreshGraph = useCallback(() => {
    const { nodes: newNodes, edges: newEdges } = generateGraphData();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [setNodes, setEdges]);

  React.useEffect(() => {
    refreshGraph();
  }, [refreshGraph]);

  const handleZoom = (factor) => {
    setZoom(current => {
      const newZoom = current * factor;
      return Math.min(Math.max(newZoom, 0.1), 2);
    });
  };

  return (
    <Card shadow="sm" p="md" radius="md" withBorder style={{ height: '700px' }}>
      <Group position="apart" mb="md">
        <Text weight={500} size="lg">Policy Relationship Graph</Text>
        <Group spacing="xs">
          <Button 
            variant="light" 
            size="xs"
            onClick={() => handleZoom(0.8)}
            leftIcon={<IconZoomOut size={14} />}
          >
            Zoom Out
          </Button>
          <Button 
            variant="light" 
            size="xs"
            onClick={() => handleZoom(1.2)}
            leftIcon={<IconZoomIn size={14} />}
          >
            Zoom In
          </Button>
          <Button 
            variant="light"
            size="xs"
            onClick={refreshGraph}
            leftIcon={<IconRefresh size={14} />}
          >
            Refresh
          </Button>
        </Group>
      </Group>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultZoom={zoom}
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={node => node.data.color}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </Card>
  );
}
