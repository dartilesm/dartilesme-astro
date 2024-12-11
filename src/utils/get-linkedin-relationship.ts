export const getLinkedinRelationship = (relationship: string, name: string): string => {
  switch (relationship) {
    case 'RECOMMENDER_MANAGED_RECOMMENDEE':
      return `${name} managed Diego`;
    case 'RECOMMENDER_REPORTED_TO_RECOMMENDEE':
      return `${name} reported to Diego`;
    case 'RECOMMENDER_SENIOR_THAN_RECOMMENDEE':
      return `${name} was more senior than Diego`;
    case 'RECOMMENDEE_SENIOR_THAN_RECOMMENDER':
      return `Diego was more senior than ${name}`;
    case 'WORKED_IN_SAME_GROUP':
      return `Diego and ${name} worked in the same company`;
    case 'WORKED_IN_DIFFERENT_GROUPS':
      return `Diego and ${name} worked in different groups`;
    case 'WORKED_IN_DIFFERENT_COMPANIES':
      return `Diego and ${name} worked in different companies`;
    case 'RECOMMENDEE_IS_CLIENT_OF_RECOMMENDER':
      return `Diego was a client of ${name}`;
    case 'RECOMMENDER_IS_CLIENT_OF_RECOMMENDEE':
      return `${name} was a client of Diego`;
    case 'RECOMMENDER_TAUGHT_RECOMMENDEE':
      return `${name} taught Diego`;
    case 'RECOMMENDER_ADVISED_RECOMMENDEE':
      return `${name} advised Diego`;
    case 'RECOMMENDER_STUDIED_WITH_RECOMMENDEE':
      return `Diego and ${name} studied together`;
    default:
      return `Diego and ${name} worked together`;
  }
};
