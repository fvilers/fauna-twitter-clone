import { yupResolver } from "@hookform/resolvers/yup";
import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormProps from "../types/FormProps";
import Button from "./Button";
import Message from "./Message";
import Textarea from "./Textarea";
import TweetCounter from "./TweetCounter";

export type TweetFormValues = {
  tweet: string;
};

const MAX_TWEET_LENGTH = 280;

const schema: yup.SchemaOf<TweetFormValues> = yup.object().shape({
  tweet: yup.string().label("Tweet").required().max(MAX_TWEET_LENGTH),
});

type Props = FormProps<TweetFormValues>;

export type TweetFormHandles = {
  reset: () => void;
};

function TweetForm(
  { disabled, errorMessage, onReset, onSubmit }: Props,
  ref: Ref<TweetFormHandles>
) {
  const { handleSubmit, register, errors, setValue, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const tweet = watch("tweet") || "";
  const canSubmit = disabled !== true && errors.tweet === undefined;

  useImperativeHandle(ref, () => ({
    reset() {
      setValue("tweet", "", { shouldValidate: true });
    },
  }));

  return (
    <form noValidate onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
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
        {tweet.length > MAX_TWEET_LENGTH / 2 && (
          <TweetCounter length={tweet.length} max={MAX_TWEET_LENGTH} />
        )}
        <Button disabled={!canSubmit} type="submit" variant="primary">
          Tweet
        </Button>
        <Button type="reset">Cancel</Button>
      </div>
    </form>
  );
}

export default forwardRef(TweetForm);
