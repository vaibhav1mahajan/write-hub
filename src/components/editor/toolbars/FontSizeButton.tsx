"use client";

import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : 14;

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}pt`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(inputValue) + 1;
    updateFontSize(newSize.toString());
  };
  const decrement = () => {
    const newSize = parseInt(inputValue) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="flex items-center justify-center rounded-sm h-7 w-7 shrink-0 hover:bg-neutral-200/80 "
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="w-10 text-sm text-center bg-transparent border rounded-sm h-7 border-neutral-400 focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="w-10 text-sm text-center bg-transparent border rounded-sm h-7 border-neutral-400 cursor-text"
        >
          {fontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="flex items-center justify-center rounded-sm h-7 w-7 shrink-0 hover:bg-neutral-200/80 "
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};
