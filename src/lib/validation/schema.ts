import { type AnySchema, object, string, array } from "yup";
import type { NexusGenInputs } from "../../generated/nexus";

export const username = string()
  .trim()
  .required("Username is required")
  .max(100, "Username is too long");
export const email = string()
  .trim()
  .required("Email is required")
  .email("Invalid email")
  .max(100, "Email is too long");
export const password = string().trim().max(100, "Password is too long");
const passwordRequired = password.required("Password is required");

export const bio = string().trim().max(300, "Bio is too long").nullable();
export const image = string()
  .trim()
  .url("Invalid URL")
  .max(1024, "Image URL is too long")
  .nullable();

export const loginInputSchema = object<
  Record<keyof NexusGenInputs["UserLoginInput"], AnySchema>
>({
  password: passwordRequired,
  email,
});

export const signupInputSchema = object<
  Record<keyof NexusGenInputs["UserSignupInput"], AnySchema>
>({
  username,
  email,
  password: passwordRequired,
});

export const updateUserInputSchema = object<
  Record<keyof NexusGenInputs["UserUpdateInput"], AnySchema>
>({
  username,
  email,
  password,
  bio,
  image,
});

export const articleInputSchema = object<
  Record<keyof NexusGenInputs["ArticleInput"], AnySchema>
>({
  title: string()
    .trim()
    .required("Title is required")
    .max(100, "Title is too long"),
  description: string()
    .trim()
    .required("Description is required")
    .max(255, "Description is too long"),
  body: string()
    .trim()
    .required("Article content is required")
    .max(65535, "Article content is too long"),
  tagList: array(
    string().trim().required("Tag is required").max(100, "Tag is too long")
  ).min(1, "Add at least one tag"),
});

export const commentInputSchema = object<Record<keyof NexusGenInputs["CommentInput"], AnySchema>>(
  {
    body: string()
      .trim()
      .required("Comment content is required")
      .max(65535, "Comment content is too long"),
  }
);
