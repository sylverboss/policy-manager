import { getPolicies } from './policyService';
import { frameworkRequirements } from './frameworkRequirements';

export const getDashboardMetrics = () => {
  const policies = getPolicies();
  
  // Framework coverage analysis
  const frameworkCoverage = {};
  Object.keys(frameworkRequirements).forEach(framework => {
    const policiesForFramework = policies.filter(p => 
      p.frameworks && p.frameworks.includes(framework)
    ).length;
    const totalRequirements = Object.values(frameworkRequirements[framework])
      .flat().length;
    frameworkCoverage[framework] = {
      percentage: (policiesForFramework / totalRequirements) * 100,
      policies: policiesForFramework,
      total: totalRequirements
    };
  });

  // Policy status distribution
  const statusDistribution = policies.reduce((acc, policy) => {
    acc[policy.status] = (acc[policy.status] || 0) + 1;
    return acc;
  }, {});

  // Recent activity
  const recentActivity = policies
    .map(policy => ({
      id: policy.id,
      name: policy.name,
      date: policy.lastUpdated,
      type: 'Policy Update'
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Category distribution
  const categoryDistribution = policies.reduce((acc, policy) => {
    acc[policy.category] = (acc[policy.category] || 0) + 1;
    return acc;
  }, {});

  // Risk metrics
  const riskMetrics = {
    policiesNeedingReview: policies.filter(p => p.status === 'Under Review').length,
    outdatedPolicies: policies.filter(p => {
      const lastUpdate = new Date(p.lastUpdated);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return lastUpdate < sixMonthsAgo;
    }).length,
    totalPolicies: policies.length
  };

  return {
    frameworkCoverage,
    statusDistribution,
    recentActivity,
    categoryDistribution,
    riskMetrics
  };
};
