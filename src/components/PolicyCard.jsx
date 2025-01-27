import React from 'react';
import { Card, Group, Text, Badge, ActionIcon, Menu, Stack } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconEye } from '@tabler/icons-react';

export default function PolicyCard({ policy, onView, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Under Review': return 'yellow';
      case 'Archived': return 'gray';
      default: return 'blue';
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="sm">
        <Group position="apart">
          <Text weight={500}>{policy.name}</Text>
          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconEye size={14} />} onClick={() => onView(policy)}>
                View
              </Menu.Item>
              <Menu.Item icon={<IconEdit size={14} />} onClick={() => onEdit(policy)}>
                Edit
              </Menu.Item>
              <Menu.Item 
                icon={<IconTrash size={14} />} 
                color="red"
                onClick={() => onDelete(policy.id)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Badge color={getStatusColor(policy.status)}>{policy.status}</Badge>
        
        <Group spacing={4}>
          {(policy.frameworks || []).map((framework) => (
            <Badge key={framework} color="blue" variant="outline" size="sm">
              {framework}
            </Badge>
          ))}
        </Group>

        <Badge color="gray">{policy.category}</Badge>

        <Text size="sm" color="dimmed">
          Last updated: {policy.lastUpdated}
        </Text>
      </Stack>
    </Card>
  );
}
