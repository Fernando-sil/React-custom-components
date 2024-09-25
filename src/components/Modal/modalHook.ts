import { useRef } from "react";

export function useModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const ToggleDialog = () => {
    if (!dialogRef.current) return;
    return dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  return { dialogRef, ToggleDialog };
}
