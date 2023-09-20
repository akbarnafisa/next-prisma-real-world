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

export type ArticlesQueryVariables = Exact<{
  author?: InputMaybe<Scalars['String']['input']>;
  favorited?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: number, slug: string, description: string, title: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null } }> };

export type ArticlePreviewFragment = { __typename?: 'Article', id: number, slug: string, description: string, title: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null } };

export type ArticleQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, slug: string, title: string, description: string, body: string, createdAt: any, updateAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null, following: boolean } } | null };

export type ArticleViewFragment = { __typename?: 'Article', id: number, slug: string, title: string, description: string, body: string, createdAt: any, updateAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null, following: boolean } };

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null, token?: string | null } | null };

export type SignupMutationVariables = Exact<{
  input: UserSignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null, token?: string | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null } };

export type CheckUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type CheckUsernameQuery = { __typename?: 'Query', checkUsername?: string | null };

export type CheckEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckEmailQuery = { __typename?: 'Query', checkEmail?: string | null };

export type CreateArticleMutationVariables = Exact<{
  input: ArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: number, slug: string } };

export type UpdateArticleMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  input: ArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', id: number, slug: string, title: string, body: string, description: string, tagList: Array<string> } };

export type EditArticleQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type EditArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, slug: string, title: string, body: string, description: string, tagList: Array<string>, author: { __typename?: 'Profile', username: string } } | null };

export type EditArticleViewFragment = { __typename?: 'Article', id: number, slug: string, title: string, body: string, description: string, tagList: Array<string>, author: { __typename?: 'Profile', username: string } };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<string> };

export type ProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', username: string, bio?: string | null, image?: string | null, following: boolean } | null };

export type FollowMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'Profile', username: string, following: boolean } };

export type UnFollowMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UnFollowMutation = { __typename?: 'Mutation', unFollow: { __typename?: 'Profile', username: string, following: boolean } };

export type FollowsFragment = { __typename?: 'Profile', username: string, following: boolean };

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null } | null };

export const ArticlePreviewFragmentDoc = gql`
    fragment ArticlePreview on Article {
  id
  slug
  description
  title
  createdAt
  author {
    username
    image
  }
  favorited
  favoritesCount
  tagList
}
    `;
export const ArticleViewFragmentDoc = gql`
    fragment ArticleView on Article {
  id
  slug
  title
  description
  body
  createdAt
  updateAt
  favorited
  favoritesCount
  author {
    username
    image
    following
  }
  tagList
}
    `;
export const EditArticleViewFragmentDoc = gql`
    fragment EditArticleView on Article {
  id
  slug
  title
  body
  description
  tagList
  author {
    username
  }
}
    `;
export const FollowsFragmentDoc = gql`
    fragment Follows on Profile {
  username
  following
}
    `;
export const ArticlesDocument = gql`
    query Articles($author: String, $favorited: String, $offset: Int, $limit: Int, $tag: String, $cursor: Int) {
  articles(
    author: $author
    favorited: $favorited
    offset: $offset
    limit: $limit
    tag: $tag
    cursor: $cursor
  ) {
    ...ArticlePreview
  }
}
    ${ArticlePreviewFragmentDoc}`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      author: // value for 'author'
 *      favorited: // value for 'favorited'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      tag: // value for 'tag'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleDocument = gql`
    query Article($slug: String!) {
  article(slug: $slug) {
    ...ArticleView
  }
}
    ${ArticleViewFragmentDoc}`;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
      }
export function useArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;
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
export const CheckUsernameDocument = gql`
    query CheckUsername($username: String!) {
  checkUsername(username: $username)
}
    `;

/**
 * __useCheckUsernameQuery__
 *
 * To run a query within a React component, call `useCheckUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUsernameQuery(baseOptions: Apollo.QueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
      }
export function useCheckUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
        }
export type CheckUsernameQueryHookResult = ReturnType<typeof useCheckUsernameQuery>;
export type CheckUsernameLazyQueryHookResult = ReturnType<typeof useCheckUsernameLazyQuery>;
export type CheckUsernameQueryResult = Apollo.QueryResult<CheckUsernameQuery, CheckUsernameQueryVariables>;
export const CheckEmailDocument = gql`
    query CheckEmail($email: String!) {
  checkEmail(email: $email)
}
    `;

/**
 * __useCheckEmailQuery__
 *
 * To run a query within a React component, call `useCheckEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCheckEmailQuery(baseOptions: Apollo.QueryHookOptions<CheckEmailQuery, CheckEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckEmailQuery, CheckEmailQueryVariables>(CheckEmailDocument, options);
      }
export function useCheckEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckEmailQuery, CheckEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckEmailQuery, CheckEmailQueryVariables>(CheckEmailDocument, options);
        }
export type CheckEmailQueryHookResult = ReturnType<typeof useCheckEmailQuery>;
export type CheckEmailLazyQueryHookResult = ReturnType<typeof useCheckEmailLazyQuery>;
export type CheckEmailQueryResult = Apollo.QueryResult<CheckEmailQuery, CheckEmailQueryVariables>;
export const CreateArticleDocument = gql`
    mutation CreateArticle($input: ArticleInput!) {
  createArticle(input: $input) {
    id
    slug
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($slug: String!, $input: ArticleInput!) {
  updateArticle(slug: $slug, input: $input) {
    id
    slug
    title
    body
    description
    tagList
  }
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const EditArticleDocument = gql`
    query EditArticle($slug: String!) {
  article(slug: $slug) {
    ...EditArticleView
  }
}
    ${EditArticleViewFragmentDoc}`;

/**
 * __useEditArticleQuery__
 *
 * To run a query within a React component, call `useEditArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditArticleQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useEditArticleQuery(baseOptions: Apollo.QueryHookOptions<EditArticleQuery, EditArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditArticleQuery, EditArticleQueryVariables>(EditArticleDocument, options);
      }
export function useEditArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditArticleQuery, EditArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditArticleQuery, EditArticleQueryVariables>(EditArticleDocument, options);
        }
export type EditArticleQueryHookResult = ReturnType<typeof useEditArticleQuery>;
export type EditArticleLazyQueryHookResult = ReturnType<typeof useEditArticleLazyQuery>;
export type EditArticleQueryResult = Apollo.QueryResult<EditArticleQuery, EditArticleQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  tags
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const ProfileDocument = gql`
    query Profile($username: String!) {
  profile(username: $username) {
    username
    bio
    image
    following
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const FollowDocument = gql`
    mutation Follow($username: String!) {
  follow(username: $username) {
    ...Follows
  }
}
    ${FollowsFragmentDoc}`;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const UnFollowDocument = gql`
    mutation UnFollow($username: String!) {
  unFollow(username: $username) {
    ...Follows
  }
}
    ${FollowsFragmentDoc}`;
export type UnFollowMutationFn = Apollo.MutationFunction<UnFollowMutation, UnFollowMutationVariables>;

/**
 * __useUnFollowMutation__
 *
 * To run a mutation, you first call `useUnFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowMutation, { data, loading, error }] = useUnFollowMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUnFollowMutation(baseOptions?: Apollo.MutationHookOptions<UnFollowMutation, UnFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFollowMutation, UnFollowMutationVariables>(UnFollowDocument, options);
      }
export type UnFollowMutationHookResult = ReturnType<typeof useUnFollowMutation>;
export type UnFollowMutationResult = Apollo.MutationResult<UnFollowMutation>;
export type UnFollowMutationOptions = Apollo.BaseMutationOptions<UnFollowMutation, UnFollowMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UserUpdateInput!) {
  updateUser(input: $input) {
    id
    username
    email
    bio
    image
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;