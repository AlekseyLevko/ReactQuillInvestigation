"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

export default function Users() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsDbInitialized(true);
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  // NOTE: when modules are changed we need to re-import the component. Otherwise, an error occurs inside the library and the editor disappears from the screen
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [isDbInitialized]
  );

  const [value, setValue] = useState("");

  const newModules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          [
            "bold",
            "italic",
            "underline",
            "strike",
            { color: [] },
            { background: [] },
          ],
          [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
          ["link", "blockquote"],
          ["clean"],
          ["undo"],
          isDbInitialized ? ["image", "video"] : [],
        ],
        handlers: {
          image: isDbInitialized
            ? () => console.log("custom image handler")
            : undefined,
          video: isDbInitialized
            ? () => console.log("custom video handler")
            : undefined,
        },
      },
    };
  }, [isDbInitialized]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={newModules}
    />
  );
}
