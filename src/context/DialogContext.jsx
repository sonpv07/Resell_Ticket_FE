import React, { useState, useCallback, createContext } from "react";
import Dialog from "../components/dialog/Dialog";

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [okText, setOkText] = useState("Ok");
  const [cancelText, setCancelText] = useState("Cancel");
  const [width, setWidth] = useState("md");
  const [component, setComponent] = useState(null);
  const [okCallback, setOkCallback] = useState(() => () => {
    console.log("Not implemented!");
  });
  const [cancelCallback, setCancelCallback] = useState(() => () => {
    console.log("Not implemented!");
  });

  const open = useCallback(
    ({
      component,
      title,
      okCallback,
      cancelCallback,
      width,
      okText,
      cancelText,
    }) => {
      setComponent(component);
      setTitle(title);
      setOkCallback(() => okCallback);
      setCancelCallback(() => cancelCallback);
      setWidth(width || "md");
      setOkText(okText || "Ok");
      setCancelText(cancelText || "Cancel");
      setIsOpen(true);
    },
    []
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleCloseClick = () => {
    if (cancelCallback) {
      cancelCallback();
    } else {
      close();
    }
  };

  return (
    <DialogContext.Provider value={{ openDialog: open, closeDialog: close }}>
      <Dialog
        title={title}
        isOpen={isOpen}
        actionText={okText}
        closeText={cancelText}
        component={component}
        onAction={okCallback}
        onClose={handleCloseClick}
      />
      {children}
    </DialogContext.Provider>
  );
};
