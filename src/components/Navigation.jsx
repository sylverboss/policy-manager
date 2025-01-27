import React from 'react';
import { NavLink } from '@mantine/core';
import { IconDashboard, IconBook, IconShieldCheck, IconSettings } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  const links = [
    { icon: IconDashboard, label: 'Dashboard', path: '/' },
    { icon: IconBook, label: 'Policy Manager', path: '/policies' },
    { icon: IconShieldCheck, label: 'Compliance Analysis', path: '/compliance' },
    { icon: IconSettings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div>
      {links.map((link) => (
        <NavLink
          key={link.label}
          icon={<link.icon size={16} />}
          label={link.label}
          onClick={() => navigate(link.path)}
        />
      ))}
    </div>
  );
}
