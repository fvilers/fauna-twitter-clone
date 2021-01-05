import React from "react";
import { FieldError } from "react-hook-form";
import "./Input.css";

type Props = {
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: FieldError;
  id: string;
  inputRef: (ref: HTMLInputElement | null) => void;
  label?: string;
  name?: string;
  type?: string;
};

function Input({
  autoComplete,
  autoFocus,
  disabled,
  error,
  id,
  inputRef,
  label,
  name = id,
  type,
}: Props) {
  return (
    <div className="Input">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        id={id}
        name={name}
        ref={inputRef}
        type={type}
      />
      {error && <span className="error">{error?.message}</span>}
    </div>
  );
}

export default Input;
