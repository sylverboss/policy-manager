import React, { useState, useEffect } from 'react';
import { Select, Stack, Grid, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import GapAnalysisCard from '../components/GapAnalysisCard';
import PolicyRecommendationModal from '../components/PolicyRecommendationModal';
import { getFrameworkAnalysis, generatePolicyRecommendation } from '../services/complianceService';
import { addPolicy } from '../services/policyService';

export default function ComplianceAnalysis() {
  const [selectedFramework, setSelectedFramework] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [recommendationModal, setRecommendationModal] = useState({
    opened: false,
    requirement: null,
    recommendation: null
  });

  useEffect(() => {
    if (selectedFramework) {
      const result = getFrameworkAnalysis(selectedFramework);
      setAnalysis(result);
    }
  }, [selectedFramework]);

  const handleGeneratePolicy = (requirement) => {
    const recommendation = generatePolicyRecommendation(requirement);
    setRecommendationModal({
      opened: true,
      requirement,
      recommendation
    });
  };

  const handleImplementPolicy = () => {
    const { requirement, recommendation } = recommendationModal;
    
    addPolicy({
      name: `${requirement} Policy`,
      content: recommendation,
      category: 'Compliance',
      status: 'Under Review',
      frameworks: [selectedFramework]
    });

    setRecommendationModal({ opened: false, requirement: null, recommendation: null });
    
    // Refresh analysis
    const result = getFrameworkAnalysis(selectedFramework);
    setAnalysis(result);
  };

  return (
    <Stack spacing="md">
      <Select
        label="Select Compliance Framework"
        placeholder="Choose framework"
        value={selectedFramework}
        onChange={setSelectedFramework}
        data={[
          { value: 'SOC 2', label: 'SOC 2' },
          { value: 'HIPAA', label: 'HIPAA' },
          { value: 'ISO 27001', label: 'ISO 27001' }
        ]}
      />

      {!selectedFramework && (
        <Alert icon={<IconAlertCircle size={16} />} color="blue">
          Select a framework to begin compliance analysis
        </Alert>
      )}

      {analysis && (
        <Grid>
          {Object.entries(analysis).map(([category, categoryAnalysis]) => (
            <Grid.Col key={category} xs={12} md={6}>
              <GapAnalysisCard
                category={category}
                analysis={categoryAnalysis}
                onGeneratePolicy={handleGeneratePolicy}
              />
            </Grid.Col>
          ))}
        </Grid>
      )}

      <PolicyRecommendationModal
        {...recommendationModal}
        onClose={() => setRecommendationModal({ 
          opened: false, 
          requirement: null, 
          recommendation: null 
        })}
        onImplement={handleImplementPolicy}
      />
    </Stack>
  );
}
