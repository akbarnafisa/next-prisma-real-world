-- CreateTable
CREATE TABLE "blog_user" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "blog_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_favorites" (
    "article_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "blog_favorites_pkey" PRIMARY KEY ("user_id","article_id")
);

-- CreateTable
CREATE TABLE "blog_follows" (
    "follower_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    CONSTRAINT "blog_follows_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- CreateTable
CREATE TABLE "blog_article" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "del" BOOLEAN NOT NULL DEFAULT false,
    "favorites_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "blog_article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_comment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "article_id" INTEGER NOT NULL,
    "del" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "blog_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_articles_tags" (
    "article_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "blog_articles_tags_pkey" PRIMARY KEY ("article_id","tag_id")
);

-- CreateTable
CREATE TABLE "blog_tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "blog_tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_user_email_key" ON "blog_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blog_user_username_key" ON "blog_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "blog_article_slug_key" ON "blog_article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_tag_name_key" ON "blog_tag"("name");

-- AddForeignKey
ALTER TABLE "blog_favorites" ADD CONSTRAINT "blog_favorites_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "blog_article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_favorites" ADD CONSTRAINT "blog_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "blog_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_follows" ADD CONSTRAINT "blog_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "blog_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_follows" ADD CONSTRAINT "blog_follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "blog_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_article" ADD CONSTRAINT "blog_article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "blog_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comment" ADD CONSTRAINT "blog_comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "blog_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comment" ADD CONSTRAINT "blog_comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "blog_article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_articles_tags" ADD CONSTRAINT "blog_articles_tags_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "blog_article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_articles_tags" ADD CONSTRAINT "blog_articles_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "blog_tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
