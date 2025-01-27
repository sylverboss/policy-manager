import { getPolicies } from './policyService';
import { frameworkRequirements } from './frameworkRequirements';

const analyzeContentForRequirement = (content, requirement) => {
  const keywords = requirement.toLowerCase().split(' ');
  const contentLower = content.toLowerCase();
  
  // Basic NLP-like scoring
  const score = keywords.reduce((acc, keyword) => {
    if (contentLower.includes(keyword)) acc += 1;
    return acc;
  }, 0) / keywords.length;

  return score > 0.3; // Threshold for considering a requirement met
};

const analyzePolicyGaps = (framework) => {
  const policies = getPolicies();
  const requirements = frameworkRequirements[framework];
  const analysis = {};

  // Analyze each category in the framework
  for (const [category, categoryRequirements] of Object.entries(requirements)) {
    const categoryAnalysis = {
      requirements: categoryRequirements.map(requirement => {
        // Check all policies for this requirement
        const matchingPolicies = policies.filter(policy => 
          analyzeContentForRequirement(policy.content, requirement)
        );

        return {
          requirement,
          status: matchingPolicies.length > 0 ? 'met' : 'gap',
          matchingPolicies: matchingPolicies.map(p => ({
            id: p.id,
            name: p.name
          }))
        };
      }),
      completionPercentage: 0
    };

    // Calculate completion percentage
    const metRequirements = categoryAnalysis.requirements.filter(r => r.status === 'met').length;
    categoryAnalysis.completionPercentage = (metRequirements / categoryRequirements.length) * 100;

    analysis[category] = categoryAnalysis;
  }

  return analysis;
};

export const generatePolicyRecommendation = (requirement) => {
  // Mock AI-generated policy recommendation
  return `Recommended Policy for ${requirement}:

1. Purpose and Scope
   - This policy establishes requirements for ${requirement.toLowerCase()}
   - Applies to all organizational assets and personnel

2. Policy Statement
   - Implement controls to ensure ${requirement.toLowerCase()}
   - Regular monitoring and review of ${requirement.toLowerCase()} measures
   - Clear documentation of all related procedures

3. Compliance Requirements
   - Regular audits of ${requirement.toLowerCase()}
   - Annual review and updates
   - Mandatory staff training

4. Responsibilities
   - Management oversight
   - Staff compliance
   - Regular reporting

5. Enforcement
   - Compliance monitoring
   - Incident reporting
   - Corrective actions`;
};

export const getFrameworkAnalysis = (framework) => {
  return analyzePolicyGaps(framework);
};
