import React from 'react';
import { Modal, Button, Text, Stack, Code } from '@mantine/core';

export default function PolicyRecommendationModal({ 
  requirement,
  recommendation,
  opened,
  onClose,
  onImplement
}) {
  if (!requirement || !recommendation) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Policy Recommendation: ${requirement}`}
      size="lg"
    >
      <Stack spacing="md">
        <Text size="sm">AI-generated policy recommendation based on framework requirements:</Text>
        
        <Code block style={{ whiteSpace: 'pre-wrap' }}>
          {recommendation}
        </Code>

        <Button onClick={onImplement}>
          Implement Policy
        </Button>
      </Stack>
    </Modal>
  );
}
