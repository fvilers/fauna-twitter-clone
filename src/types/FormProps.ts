type FormProps<T> = {
  defaultValues?: Partial<T>;
  disabled?: boolean;
  errorMessage?: string;
  onSubmit: (values: T) => void;
};

export default FormProps;
