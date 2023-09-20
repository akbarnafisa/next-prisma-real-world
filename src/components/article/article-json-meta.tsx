import { ArticleJsonLd } from 'next-seo';
import { type ArticleViewFragment } from '../../generated/graphql';
import { BASE_URL } from '../../lib/constants';

export default function ArticleJsonMeta({ article }: { article: ArticleViewFragment }) {
  const { slug, title, description, createdAt, updateAt, author } = article;
  const { username } = author;
  return (
    <ArticleJsonLd
      {...{ title, description }}
      url={`${BASE_URL}/article/${slug}`}
      images={[]}
      datePublished={createdAt}
      dateModified={updateAt}
      authorName={username}
    />
  );
}
