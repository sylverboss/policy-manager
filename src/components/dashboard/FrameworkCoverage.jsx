import React from 'react';
import { Card, RingProgress, Text, Group, Stack } from '@mantine/core';

export default function FrameworkCoverage({ data }) {
  const getColor = (percentage) => {
    if (percentage >= 80) return 'green';
    if (percentage >= 50) return 'yellow';
    return 'red';
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Text weight={500} size="lg">Framework Coverage</Text>
        <Group position="apart">
          {Object.entries(data).map(([framework, stats]) => (
            <Stack key={framework} align="center" spacing="xs">
              <RingProgress
                sections={[{ value: stats.percentage, color: getColor(stats.percentage) }]}
                label={
                  <Text size="xs" align="center" weight={700}>
                    {Math.round(stats.percentage)}%
                  </Text>
                }
                size={80}
              />
              <Text size="sm" weight={500}>{framework}</Text>
              <Text size="xs" color="dimmed">
                {stats.policies}/{stats.total} Policies
              </Text>
            </Stack>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
