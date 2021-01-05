import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProps from "../types/FormProps";

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
        <div>
          <label htmlFor="username">Username</label>
          <input
            autoComplete="username"
            autoFocus
            id="username"
            name="username"
            ref={register}
          />
          {errors.username && <span>{errors.username?.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            autoComplete="new-password"
            id="password"
            name="password"
            ref={register}
            type="password"
          />
          {errors.password && <span>{errors.password?.message}</span>}
        </div>
      </fieldset>

      {errorMessage && <div>{errorMessage}</div>}

      <div>
        <button disabled={disabled} type="submit">
          Sign up
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
