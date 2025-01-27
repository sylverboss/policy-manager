import React from 'react';
import { Modal, Text, Stack, Badge, Group } from '@mantine/core';

export default function ViewPolicyModal({ policy, opened, onClose }) {
  if (!policy) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={policy.name}
      size="lg"
    >
      <Stack spacing="md">
        <Group spacing="xs">
          <Badge color={policy.status === 'Active' ? 'green' : 'yellow'}>
            {policy.status}
          </Badge>
        </Group>

        <Group spacing={4}>
          {(policy.frameworks || []).map((framework) => (
            <Badge key={framework} color="blue" variant="outline">
              {framework}
            </Badge>
          ))}
        </Group>

        <Badge color="gray">{policy.category}</Badge>

        <Text size="sm" color="dimmed">
          Last updated: {policy.lastUpdated}
        </Text>

        <Text>{policy.content}</Text>
      </Stack>
    </Modal>
  );
}
