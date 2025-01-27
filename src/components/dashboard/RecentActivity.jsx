import React from 'react';
import { Card, Text, Timeline } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';

export default function RecentActivity({ data }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text weight={500} size="lg" mb="md">Recent Activity</Text>
      <Timeline active={data.length} bulletSize={24} lineWidth={2}>
        {data.map((activity, index) => (
          <Timeline.Item
            key={index}
            bullet={<IconFileText size={12} />}
            title={activity.name}
          >
            <Text color="dimmed" size="sm">
              {activity.type} - {new Date(activity.date).toLocaleDateString()}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
}
