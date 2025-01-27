import React, { useEffect, useState } from 'react';
import { Grid, Stack, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { getDashboardMetrics } from '../services/dashboardService';
import FrameworkCoverage from '../components/dashboard/FrameworkCoverage';
import StatusOverview from '../components/dashboard/StatusOverview';
import RecentActivity from '../components/dashboard/RecentActivity';
import RiskMetrics from '../components/dashboard/RiskMetrics';
import CategoryDistribution from '../components/dashboard/CategoryDistribution';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const data = getDashboardMetrics();
    setMetrics(data);
  }, []);

  if (!metrics) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} color="blue">
        Loading dashboard metrics...
      </Alert>
    );
  }

  return (
    <Stack spacing="md">
      <Grid>
        <Grid.Col xs={12}>
          <RiskMetrics data={metrics.riskMetrics} />
        </Grid.Col>

        <Grid.Col xs={12} md={8}>
          <FrameworkCoverage data={metrics.frameworkCoverage} />
        </Grid.Col>

        <Grid.Col xs={12} md={4}>
          <StatusOverview data={metrics.statusDistribution} />
        </Grid.Col>

        <Grid.Col xs={12} md={6}>
          <CategoryDistribution data={metrics.categoryDistribution} />
        </Grid.Col>

        <Grid.Col xs={12} md={6}>
          <RecentActivity data={metrics.recentActivity} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
