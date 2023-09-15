import { AnySchema, object, string } from "yup";
import { NexusGenInputs } from "../../generated/nexus";


export const username = string().trim().required('Username is required').max(100, 'Username is too long');
export const email = string().trim().required('Email is required').email('Invalid email').max(100, 'Email is too long');
export const password = string().trim().max(100, 'Password is too long');
const passwordRequired = password.required('Password is required');

export const signupInputSchema = object<Record<keyof NexusGenInputs['UserSignupInput'], AnySchema>>({
  username,
  email,
  password: passwordRequired,
});
