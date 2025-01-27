import React from 'react';
import { Card, Text, Group, Stack, ThemeIcon } from '@mantine/core';
import { IconAlertTriangle, IconClockHour4, IconFiles } from '@tabler/icons-react';

export default function RiskMetrics({ data }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Text weight={500} size="lg">Risk Overview</Text>
        <Group grow>
          <Stack align="center" spacing="xs">
            <ThemeIcon color="yellow" size={40} radius="md">
              <IconAlertTriangle size={20} />
            </ThemeIcon>
            <Text size="lg" weight={700}>{data.policiesNeedingReview}</Text>
            <Text size="sm" color="dimmed" align="center">Needs Review</Text>
          </Stack>

          <Stack align="center" spacing="xs">
            <ThemeIcon color="red" size={40} radius="md">
              <IconClockHour4 size={20} />
            </ThemeIcon>
            <Text size="lg" weight={700}>{data.outdatedPolicies}</Text>
            <Text size="sm" color="dimmed" align="center">Outdated</Text>
          </Stack>

          <Stack align="center" spacing="xs">
            <ThemeIcon color="blue" size={40} radius="md">
              <IconFiles size={20} />
            </ThemeIcon>
            <Text size="lg" weight={700}>{data.totalPolicies}</Text>
            <Text size="sm" color="dimmed" align="center">Total Policies</Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
}
