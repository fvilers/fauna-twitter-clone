import { yupResolver } from "@hookform/resolvers/yup";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProps from "../types/FormProps";
import Button from "./Button";
import Message from "./Message";
import Textarea from "./Textarea";

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
  const { handleSubmit, register, errors, setValue } = useForm({
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
        <Textarea
          id="tweet"
          placeholder="What's happening?"
          rows={2}
          textareaRef={register}
        />
      </fieldset>

      {errorMessage && <Message variant="error">{errorMessage}</Message>}

      <div className="flex right">
        <Button disabled={!canSubmit} type="submit" variant="primary">
          Tweet
        </Button>
      </div>
    </form>
  );
}

export default forwardRef(TweetForm);
