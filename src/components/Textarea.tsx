import React from "react";
import { FieldError } from "react-hook-form";
import "./Textarea.css";

type Props = {
  autoFocus?: boolean;
  disabled?: boolean;
  error?: FieldError;
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
  textareaRef: (ref: HTMLTextAreaElement | null) => void;
};

function Textarea({
  autoFocus,
  disabled,
  error,
  id,
  textareaRef,
  label,
  name = id,
  placeholder,
  rows,
}: Props) {
  return (
    <div className="Textarea">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        autoFocus={autoFocus}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        ref={textareaRef}
        rows={rows}
      />
      {error && <span className="error">{error?.message}</span>}
    </div>
  );
}

export default Textarea;
