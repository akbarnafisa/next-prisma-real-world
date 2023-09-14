import { AnySchema, object, string } from "yup";
import { NexusGenInputs } from "../../generated/nexus";

export const linkInputSchema = object<Record<keyof NexusGenInputs['LinkInput'], AnySchema>>({
  category: string().trim().required('Category is required'),
  description: string().trim().required('Description is required'),
  imageUrl: string().trim().required('Image Url is required'),
  title: string().trim().required('Title is required'),
  url: string().trim().required('URL is required'),
});
