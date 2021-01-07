type FormProps<T> = {
  defaultValues?: Partial<T>;
  disabled?: boolean;
  errorMessage?: string;
  onReset?: () => void;
  onSubmit: (values: T) => void;
};

export default FormProps;
