import { yupResolver } from "@hookform/resolvers/yup";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProps from "../types/FormProps";
import Button from "./Button";
import Message from "./Message";

export type TweetFormValues = {
  tweet: string;
};

const schema: yup.SchemaOf<TweetFormValues> = yup.object().shape({
  tweet: yup.string().label("Tweet").required().max(280),
});

type Props = FormProps<TweetFormValues>;

export type TweetFormHandles = {
  reset: () => void;
};

function TweetForm(
  { disabled, errorMessage, onSubmit }: Props,
  ref: Ref<TweetFormHandles>
) {
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const canSubmit = disabled !== true && errors.tweet === undefined;

  useImperativeHandle(ref, () => ({
    reset() {
      setValue("tweet", "", { shouldValidate: true });
    },
  }));

  return (
    <form className="TweetForm" noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={disabled}>
        <textarea name="tweet" placeholder="What's happening?" ref={register} />
        {errors.tweet && <span>{errors.tweet.message}</span>}
      </fieldset>

      {errorMessage && <Message variant="error">{errorMessage}</Message>}

      <div>
        <Button disabled={!canSubmit} type="submit" variant="primary">
          Tweet
        </Button>
      </div>
    </form>
  );
}

export default forwardRef(TweetForm);
