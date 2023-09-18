import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Article = Node & {
  __typename?: 'Article';
  author: Profile;
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  favorited: Scalars['Boolean']['output'];
  favoritesCount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  tagList: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updateAt: Scalars['DateTime']['output'];
};

export type ArticleInput = {
  body: Scalars['String']['input'];
  description: Scalars['String']['input'];
  tagList: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type AuthUser = BaseUser & Node & {
  __typename?: 'AuthUser';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type BaseUser = {
  bio?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Comment = Node & {
  __typename?: 'Comment';
  author: Profile;
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommentInput = {
  body: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  deleteArticle: Article;
  favorite: Article;
  follow: Profile;
  login?: Maybe<AuthUser>;
  signup?: Maybe<AuthUser>;
  unFollow: Profile;
  unfavorite: Article;
  updateArticle: Article;
  updateUser?: Maybe<AuthUser>;
};


export type MutationCreateArticleArgs = {
  input: ArticleInput;
};


export type MutationDeleteArticleArgs = {
  slug: Scalars['String']['input'];
};


export type MutationFavoriteArgs = {
  slug: Scalars['String']['input'];
};


export type MutationFollowArgs = {
  username: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationSignupArgs = {
  input: UserSignupInput;
};


export type MutationUnFollowArgs = {
  username: Scalars['String']['input'];
};


export type MutationUnfavoriteArgs = {
  slug: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  input: ArticleInput;
  slug: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};

export type Node = {
  id: Scalars['Int']['output'];
};

export type Profile = BaseUser & {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  following: Scalars['Boolean']['output'];
  image?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles: Array<Article>;
  articlesCount: Scalars['Int']['output'];
  checkEmail?: Maybe<Scalars['String']['output']>;
  checkUsername?: Maybe<Scalars['String']['output']>;
  currentUser: AuthUser;
  feed: Array<Article>;
  feedCount: Scalars['Int']['output'];
  profile?: Maybe<Profile>;
  tags: Array<Scalars['String']['output']>;
};


export type QueryArticleArgs = {
  slug: Scalars['String']['input'];
};


export type QueryArticlesArgs = {
  author?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  favorited?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArticlesCountArgs = {
  author?: InputMaybe<Scalars['String']['input']>;
  favorited?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCheckEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryCheckUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryFeedArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProfileArgs = {
  username: Scalars['String']['input'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserSignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserUpdateInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null } };

export type SignupMutationVariables = Exact<{
  input: UserSignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null, token?: string | null } | null };

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null, token?: string | null } | null };


export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    username
    email
    bio
    image
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const SignupDocument = gql`
    mutation Signup($input: UserSignupInput!) {
  signup(input: $input) {
    id
    username
    email
    bio
    image
    token
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: UserLoginInput!) {
  login(input: $input) {
    id
    username
    email
    bio
    image
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;