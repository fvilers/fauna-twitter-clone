import assert from "assert";
import dialogPolyfill from "dialog-polyfill";
import React, { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  modal?: boolean;
  open?: boolean;
};

function Dialog({ children, modal, open }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const container = document.getElementById("dialog-root");

  useLayoutEffect(() => {
    assert(ref.current);
    dialogPolyfill.registerDialog(ref.current);
  }, []);

  useEffect(() => {
    assert(ref.current);

    if (open) {
      if (ref.current.open) {
        ref.current.close();
      }

      if (modal) {
        ref.current.showModal();
      } else {
        ref.current.show();
      }
    } else if (ref.current.open) {
      ref.current.close();
    }
  }, [modal, open]);

  assert(container);

  return createPortal(<dialog ref={ref}>{children}</dialog>, container);
}

export default Dialog;
