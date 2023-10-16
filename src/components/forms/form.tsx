import { yupResolver } from "@hookform/resolvers/yup";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  type UseFormProps,
} from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import Alert from "../common/alert";

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  schema?: AnyObjectSchema;
  alert?: boolean; // use alert message on top of the form
} & UseFormProps<TFormValues>;

// can also use extend FieldValues
export default function Form<TFormValues extends Record<string, any>>({
  onSubmit,
  schema,
  defaultValues,
  mode,
  reValidateMode = "onChange",
  alert = true,
  children,
}: FormProps<TFormValues>) {
  const methods = useForm({
    defaultValues,
    mode,
    reValidateMode,
    resolver: schema && yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      {alert && <Alert />}
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
