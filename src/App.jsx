import React, { useState } from 'react';
import { AppShell, Navbar, Header, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import PolicyManager from './pages/PolicyManager';
import ComplianceAnalysis from './pages/ComplianceAnalysis';
import Settings from './pages/Settings';

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navigation />
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Text size="xl" weight={700}>AI Governance Platform</Text>
          </div>
        </Header>
      }
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/policies" element={<PolicyManager />} />
        <Route path="/compliance" element={<ComplianceAnalysis />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppShell>
  );
}
