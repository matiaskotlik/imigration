import baseConfig from '@repo/eslint-config/base';
import expoConfig from '@repo/eslint-config/expo';

// TODO lint useQuery (and friends) -> useRNQuery

export default [...expoConfig, ...baseConfig];
