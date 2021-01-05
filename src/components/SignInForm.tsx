import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProps from "../types/FormProps";
import Button from "./Button";
import Input from "./Input";
import Message from "./Message";

export type SignInFormValues = {
  username: string;
  password: string;
};

const schema: yup.SchemaOf<SignInFormValues> = yup.object().shape({
  username: yup.string().label("Username").required(),
  password: yup.string().label("Password").required(),
});

type Props = FormProps<SignInFormValues>;

function SignInForm({
  defaultValues,
  disabled,
  errorMessage,
  onSubmit,
}: Props) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const autoFocusOnUsername = defaultValues?.username === undefined;

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={disabled}>
        <Input
          autoFocus={autoFocusOnUsername}
          error={errors.username}
          id="username"
          label="Username"
          inputRef={register}
        />

        <Input
          autoFocus={!autoFocusOnUsername}
          error={errors.password}
          id="password"
          label="Password"
          inputRef={register}
          type="password"
        />
      </fieldset>

      {errorMessage && <Message variant="error">{errorMessage}</Message>}

      <div>
        <Button disabled={disabled} type="submit" variant="primary">
          Sign in
        </Button>
      </div>
    </form>
  );
}

export default SignInForm;
