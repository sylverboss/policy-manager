import React, { useState, useEffect } from 'react';
import { Stack, Group, Button, TextInput, Grid, Tabs } from '@mantine/core';
import { IconPlus, IconSearch, IconList, IconGraph } from '@tabler/icons-react';
import PolicyCard from '../components/PolicyCard';
import PolicyModal from '../components/PolicyModal';
import ViewPolicyModal from '../components/ViewPolicyModal';
import PolicyGraph from '../components/graph/PolicyGraph';
import { initializePolicies, getPolicies, addPolicy, updatePolicy, deletePolicy } from '../services/policyService';

export default function PolicyManager() {
  const [policies, setPolicies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [editPolicy, setEditPolicy] = useState(null);
  const [viewPolicy, setViewPolicy] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    initializePolicies();
    loadPolicies();
  }, []);

  const loadPolicies = () => {
    setPolicies(getPolicies());
  };

  const handleSavePolicy = (policyData) => {
    if (editPolicy) {
      updatePolicy(editPolicy.id, policyData);
    } else {
      addPolicy(policyData);
    }
    loadPolicies();
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      deletePolicy(id);
      loadPolicies();
    }
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = 
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.frameworks.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFrameworks = 
      selectedFrameworks.length === 0 ||
      selectedFrameworks.some(f => policy.frameworks.includes(f));

    return matchesSearch && matchesFrameworks;
  });

  const allFrameworks = Array.from(
    new Set(policies.flatMap(policy => policy.frameworks))
  ).map(framework => ({
    value: framework,
    label: framework
  }));

  return (
    <Stack spacing="md">
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab 
            value="list" 
            icon={<IconList size={14} />}
          >
            List View
          </Tabs.Tab>
          <Tabs.Tab 
            value="graph" 
            icon={<IconGraph size={14} />}
          >
            Graph View
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="list" pt="xs">
          <Stack spacing="md">
            <Group position="apart">
              <Group>
                <TextInput
                  placeholder="Search policies..."
                  icon={<IconSearch size={14} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '300px' }}
                />
                <MultiSelect
                  placeholder="Filter by framework"
                  data={allFrameworks}
                  value={selectedFrameworks}
                  onChange={setSelectedFrameworks}
                  clearable
                  style={{ width: '300px' }}
                />
              </Group>
              <Button
                leftIcon={<IconPlus size={14} />}
                onClick={() => {
                  setEditPolicy(null);
                  setModalOpened(true);
                }}
              >
                Add Policy
              </Button>
            </Group>

            <Grid>
              {filteredPolicies.map((policy) => (
                <Grid.Col key={policy.id} xs={12} sm={6} lg={4}>
                  <PolicyCard
                    policy={policy}
                    onView={(p) => {
                      setViewPolicy(p);
                      setViewModalOpened(true);
                    }}
                    onEdit={(p) => {
                      setEditPolicy(p);
                      setModalOpened(true);
                    }}
                    onDelete={handleDeletePolicy}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="graph" pt="xs">
          <PolicyGraph />
        </Tabs.Panel>
      </Tabs>

      <PolicyModal
        policy={editPolicy}
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setEditPolicy(null);
        }}
        onSave={handleSavePolicy}
      />

      <ViewPolicyModal
        policy={viewPolicy}
        opened={viewModalOpened}
        onClose={() => {
          setViewModalOpened(false);
          setViewPolicy(null);
        }}
      />
    </Stack>
  );
}
