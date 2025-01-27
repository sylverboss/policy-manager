const STORAGE_KEY = 'governance_policies';

const defaultPolicies = [
  {
    id: '1',
    name: 'Data Protection Policy',
    content: 'Our organization is committed to protecting sensitive data...',
    category: 'Data Security',
    status: 'Active',
    lastUpdated: '2023-08-15',
    frameworks: ['GDPR', 'SOC 2']
  },
  {
    id: '2',
    name: 'Access Control Policy',
    content: 'Access to systems and data must follow the principle of least privilege...',
    category: 'Security',
    status: 'Active',
    lastUpdated: '2023-08-10',
    frameworks: ['SOC 2', 'ISO 27001']
  },
  {
    id: '3',
    name: 'Incident Response Plan',
    content: 'In the event of a security incident, the following steps must be taken...',
    category: 'Security',
    status: 'Under Review',
    lastUpdated: '2023-08-01',
    frameworks: ['ISO 27001', 'HIPAA', 'SOC 2']
  }
];

export const initializePolicies = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPolicies));
  }
};

export const getPolicies = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const addPolicy = (policy) => {
  const policies = getPolicies();
  const newPolicy = {
    ...policy,
    id: Date.now().toString(),
    lastUpdated: new Date().toISOString().split('T')[0]
  };
  policies.push(newPolicy);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
  return newPolicy;
};

export const updatePolicy = (id, updates) => {
  const policies = getPolicies();
  const index = policies.findIndex(p => p.id === id);
  if (index !== -1) {
    policies[index] = {
      ...policies[index],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
    return policies[index];
  }
  return null;
};

export const deletePolicy = (id) => {
  const policies = getPolicies();
  const filtered = policies.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
