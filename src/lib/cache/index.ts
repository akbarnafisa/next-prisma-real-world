import { type FieldMergeFunction, InMemoryCache } from '@apollo/client';
import * as R from 'ramda';

const merge: FieldMergeFunction = (existing: any[], incoming: any[], { args, readField }) => {
  const offset = args?.offset as number;
  const merged = existing ? existing.slice(0) : [];
  const existingIdSet = new Set(merged.map((article) => readField('id', article)));
  incoming = incoming.filter((article) => !existingIdSet.has(readField('id', article)));
  return offset > 0 ? R.concat(merged, incoming) : R.concat(incoming, merged);
};

export const cache = new InMemoryCache({
  // TODO: confirm later
  typePolicies: {
    Article: {
      keyFields: ['id'],
    },
    Comment: {
      keyFields: ['id'],
    },
    // update identifier for each graphql type, usually for type that
    Profile: {
      keyFields: ['username'],
    },
    AuthUser: {
      keyFields: ['id'],
    },
    // ODOT: check this type policy since there is no type Tag
    // yes, you do not need to specify Tag
    // Tag: {
    //   keyFields: ['name'],
    // },
    Query: {
      fields: {
        feed: {
          keyArgs: [],
          merge,
        },
        articles: {
          keyArgs: ['author', 'favorited', 'tag'],
          merge,
        },
        comments: {
          keyArgs: ['articleId'],
          merge,
        },
      },
    },
  },
});
