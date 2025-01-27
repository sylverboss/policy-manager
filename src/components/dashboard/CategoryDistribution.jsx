import React from 'react';
import { Card, Text, Stack, Group, Progress } from '@mantine/core';

export default function CategoryDistribution({ data }) {
  const total = Object.values(data).reduce((acc, val) => acc + val, 0);
  const colors = ['blue', 'green', 'yellow', 'orange', 'grape'];

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Text weight={500} size="lg">Policy Categories</Text>
        <Stack spacing="xs">
          {Object.entries(data).map(([category, count], index) => {
            const percentage = (count / total) * 100;
            return (
              <Stack key={category} spacing={4}>
                <Group position="apart">
                  <Text size="sm">{category}</Text>
                  <Text size="sm" color="dimmed">
                    {count} ({Math.round(percentage)}%)
                  </Text>
                </Group>
                <Progress 
                  value={percentage} 
                  color={colors[index % colors.length]} 
                  size="sm" 
                />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Card>
  );
}
