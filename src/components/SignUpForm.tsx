import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProps from "../types/FormProps";
import Button from "./Button";
import Input from "./Input";
import Message from "./Message";

export type SignUpFormValues = {
  username: string;
  password: string;
};

const schema: yup.SchemaOf<SignUpFormValues> = yup.object().shape({
  username: yup.string().label("Username").required().min(4).max(15),
  password: yup.string().label("Password").required().min(6),
});

type Props = FormProps<SignUpFormValues>;

function SignUpForm({ disabled, errorMessage, onSubmit }: Props) {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={disabled}>
        <Input
          autoComplete="username"
          autoFocus
          error={errors.username}
          id="username"
          inputRef={register}
          label="Username"
        />

        <Input
          autoComplete="new-password"
          error={errors.password}
          id="password"
          inputRef={register}
          label="Password"
          type="password"
        />
      </fieldset>

      {errorMessage && <Message variant="error">{errorMessage}</Message>}

      <div>
        <Button disabled={disabled} type="submit" variant="primary">
          Sign up
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
