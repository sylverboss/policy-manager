import React from 'react';
import { Stack, Switch, Select, TextInput, Button } from '@mantine/core';

export default function Settings() {
  return (
    <Stack spacing="md">
      <TextInput
        label="Organization Name"
        placeholder="Enter your organization name"
      />
      
      <Select
        label="Primary Industry"
        placeholder="Select industry"
        data={[
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'finance', label: 'Finance' },
          { value: 'technology', label: 'Technology' }
        ]}
      />
      
      <Switch
        label="Enable AI-powered policy suggestions"
        defaultChecked
      />
      
      <Switch
        label="Automatic policy update notifications"
        defaultChecked
      />
      
      <Button>Save Settings</Button>
    </Stack>
  );
}
