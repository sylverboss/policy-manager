import dagre from 'dagre';
import { getPolicies } from './policyService';
import { frameworkRequirements } from './frameworkRequirements';

const getRelatedPolicies = (policies) => {
  const relationships = [];
  
  policies.forEach(policy1 => {
    policies.forEach(policy2 => {
      if (policy1.id !== policy2.id) {
        // Check framework overlap
        const sharedFrameworks = policy1.frameworks?.filter(
          f => policy2.frameworks?.includes(f)
        ) || [];
        
        // Check content similarity (basic keyword matching)
        const keywords1 = policy1.content.toLowerCase().split(' ');
        const keywords2 = policy2.content.toLowerCase().split(' ');
        const sharedKeywords = keywords1.filter(k => keywords2.includes(k));
        
        if (sharedFrameworks.length > 0 || sharedKeywords.length > 5) {
          relationships.push({
            source: policy1.id,
            target: policy2.id,
            frameworks: sharedFrameworks,
            strength: sharedFrameworks.length + (sharedKeywords.length / 10)
          });
        }
      }
    });
  });

  return relationships;
};

const getNodeColor = (policy) => {
  switch (policy.status) {
    case 'Active': return '#40C057';
    case 'Under Review': return '#FAB005';
    case 'Archived': return '#868E96';
    default: return '#228BE6';
  }
};

const getLayout = (nodes, edges) => {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'LR', ranksep: 150, nodesep: 100 });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach(node => {
    g.setNode(node.id, { width: 180, height: 80 });
  });

  edges.forEach(edge => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map(node => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 90,
        y: nodeWithPosition.y - 40
      }
    };
  });
};

export const generateGraphData = () => {
  const policies = getPolicies();
  const relationships = getRelatedPolicies(policies);

  const nodes = policies.map(policy => ({
    id: policy.id,
    type: 'policyNode',
    data: {
      label: policy.name,
      status: policy.status,
      category: policy.category,
      frameworks: policy.frameworks || [],
      color: getNodeColor(policy)
    }
  }));

  const edges = relationships.map((rel, index) => ({
    id: `e${rel.source}-${rel.target}`,
    source: rel.source,
    target: rel.target,
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: '#228BE6',
      strokeWidth: Math.min(Math.max(rel.strength, 1), 3)
    }
  }));

  const nodesWithLayout = getLayout(nodes, edges);

  return {
    nodes: nodesWithLayout,
    edges
  };
};
