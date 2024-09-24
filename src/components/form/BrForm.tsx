/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  DefaultValues,
} from "react-hook-form";

type TFormConfig<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  resolver?: any;
};

type TFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  getValue?: string | null; // Added getValue prop to the type definition
} & TFormConfig<T>;

const BrForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
  getValue, // Added getValue here
}: TFormProps<T>) => {
  const formConfig: Partial<TFormConfig<T>> = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues as DefaultValues<T>;
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm<T>(formConfig);

  const submit: SubmitHandler<T> = (data) => {
    console.log("getValue:", getValue); // This will log the getValue prop value
    onSubmit(data); // Submitting the form data
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default BrForm;
