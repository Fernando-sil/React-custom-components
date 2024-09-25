import { useState } from "react";

export function useDrawer() {
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
    // console.log(!open);
  }

  return { toggleDrawer, open };
}
