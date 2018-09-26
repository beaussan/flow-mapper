import { SEARCH_CLIENT_PROVIDER } from './search.constants';
import * as algoliaSearch from 'algoliasearch';

export const SearchProviders = [
  {
    provide: SEARCH_CLIENT_PROVIDER,
    useFactory: () => {
      return algoliaSearch(
        process.env.SEARCH_APP_ID,
        process.env.SEARCH_APP_ADMIN_KEY,
      );
    },
  },
];
