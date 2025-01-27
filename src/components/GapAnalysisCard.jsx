import React from 'react';
import { Card, Text, Progress, Stack, Group, Badge, Button, Collapse } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function GapAnalysisCard({ 
  category, 
  analysis, 
  onGeneratePolicy 
}) {
  const [opened, setOpened] = React.useState(false);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Group position="apart">
          <Text weight={500}>{category}</Text>
          <Text weight={500} color={analysis.completionPercentage === 100 ? "green" : "orange"}>
            {Math.round(analysis.completionPercentage)}%
          </Text>
        </Group>

        <Progress 
          value={analysis.completionPercentage} 
          color={analysis.completionPercentage === 100 ? "green" : "orange"}
          size="xl"
        />

        <Button 
          variant="subtle" 
          rightIcon={opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          onClick={() => setOpened(o => !o)}
        >
          View Requirements
        </Button>

        <Collapse in={opened}>
          <Stack spacing="xs">
            {analysis.requirements.map((req, index) => (
              <Group key={index} position="apart">
                <Group spacing="xs">
                  <Badge 
                    color={req.status === 'met' ? 'green' : 'red'}
                    variant={req.status === 'met' ? 'filled' : 'outline'}
                  >
                    {req.status === 'met' ? 'Met' : 'Gap'}
                  </Badge>
                  <Text size="sm">{req.requirement}</Text>
                </Group>
                {req.status === 'gap' && (
                  <Button 
                    size="xs" 
                    variant="light"
                    onClick={() => onGeneratePolicy(req.requirement)}
                  >
                    Generate Policy
                  </Button>
                )}
              </Group>
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
}
