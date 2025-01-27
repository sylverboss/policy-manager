import React from 'react';
import { Modal, TextInput, Select, Textarea, Button, Stack, MultiSelect } from '@mantine/core';

const FRAMEWORKS = [
  { value: 'SOC 2', label: 'SOC 2' },
  { value: 'HIPAA', label: 'HIPAA' },
  { value: 'GDPR', label: 'GDPR' },
  { value: 'ISO 27001', label: 'ISO 27001' },
  { value: 'PCI DSS', label: 'PCI DSS' },
  { value: 'NIST', label: 'NIST' }
];

export default function PolicyModal({ policy, opened, onClose, onSave }) {
  const [formData, setFormData] = React.useState({
    name: '',
    content: '',
    category: '',
    status: '',
    frameworks: []
  });

  React.useEffect(() => {
    if (policy) {
      setFormData(policy);
    } else {
      setFormData({
        name: '',
        content: '',
        category: '',
        status: '',
        frameworks: []
      });
    }
  }, [policy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={policy ? 'Edit Policy' : 'New Policy'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            required
            label="Policy Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Textarea
            required
            label="Policy Content"
            minRows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />

          <Select
            required
            label="Category"
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            data={[
              { value: 'Security', label: 'Security' },
              { value: 'Data Security', label: 'Data Security' },
              { value: 'Compliance', label: 'Compliance' },
              { value: 'Operations', label: 'Operations' }
            ]}
          />

          <MultiSelect
            required
            label="Frameworks"
            value={formData.frameworks}
            onChange={(value) => setFormData({ ...formData, frameworks: value })}
            data={FRAMEWORKS}
            searchable
            clearable
          />

          <Select
            required
            label="Status"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
            data={[
              { value: 'Active', label: 'Active' },
              { value: 'Under Review', label: 'Under Review' },
              { value: 'Archived', label: 'Archived' }
            ]}
          />

          <Button type="submit">Save Policy</Button>
        </Stack>
      </form>
    </Modal>
  );
}
