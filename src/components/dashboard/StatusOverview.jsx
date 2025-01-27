import React from 'react';
import { Card, Text, Group, Stack, Badge } from '@mantine/core';

export default function StatusOverview({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Under Review': return 'yellow';
      case 'Archived': return 'gray';
      default: return 'blue';
    }
  };

  const total = Object.values(data).reduce((acc, val) => acc + val, 0);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Text weight={500} size="lg">Policy Status Overview</Text>
        <Stack spacing="xs">
          {Object.entries(data).map(([status, count]) => (
            <Group key={status} position="apart">
              <Group spacing="xs">
                <Badge color={getStatusColor(status)}>{status}</Badge>
                <Text size="sm">{count} Policies</Text>
              </Group>
              <Text size="sm" color="dimmed">
                {Math.round((count / total) * 100)}%
              </Text>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
