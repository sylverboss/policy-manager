import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Paper, Text, Badge, Group } from '@mantine/core';

export default memo(({ data }) => {
  return (
    <Paper shadow="sm" p="xs" radius="md" style={{ 
      background: 'white', 
      border: `2px solid ${data.color}`,
      minWidth: '180px'
    }}>
      <Handle type="target" position={Position.Left} />
      
      <Group direction="column" spacing={4}>
        <Text size="sm" weight={500} lineClamp={1}>
          {data.label}
        </Text>
        
        <Group spacing={4}>
          <Badge 
            size="sm" 
            color={data.color === '#40C057' ? 'green' : data.color === '#FAB005' ? 'yellow' : 'gray'}
          >
            {data.status}
          </Badge>
          <Badge size="sm" color="blue" variant="outline">
            {data.category}
          </Badge>
        </Group>

        <Group spacing={4}>
          {data.frameworks.map((framework, index) => (
            <Badge 
              key={framework} 
              size="xs" 
              variant="dot"
              color="indigo"
            >
              {framework}
            </Badge>
          ))}
        </Group>
      </Group>

      <Handle type="source" position={Position.Right} />
    </Paper>
  );
});
