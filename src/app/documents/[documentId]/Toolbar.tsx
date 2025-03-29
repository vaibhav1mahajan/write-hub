"use client";

import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { FontFamilyButton } from "@/components/editor/toolbars/FontFamilyButton";
import { HeadingLevelButton } from "@/components/editor/toolbars/HeadingLevelButton";
import { TextColorButton } from "@/components/editor/toolbars/TextColorButton";
import { HighlightColorButton } from "@/components/editor/toolbars/HighlightColorButtton";
import { LinkButton } from "@/components/editor/toolbars/LinkButton";
import { ImageButton } from "@/components/editor/toolbars/ImageButton";
import { AlignButton } from "@/components/editor/toolbars/AlignButtton";
import { ListButton } from "@/components/editor/toolbars/ListButton";
import { FontSizeButton } from "@/components/editor/toolbars/FontSizeButton";
import { LineHeight } from "@/components/editor/toolbars/LineHeight";

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm  h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};
const Toolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
    icon: LucideIcon;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "UnderLine",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"), // Enable this function
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="px-2.5 py-0.5 rounded-3xl flex items-center min-h-10 bg-[#F1F4F9] gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => {
        return <ToolBarButton key={item.label} {...item} />;
      })}
      <div className="inline-flex w-px h-6 bg-neutral-300"></div>
      <FontFamilyButton />
      <div className="inline-flex w-px h-6 bg-neutral-300"></div>
      <HeadingLevelButton />
      <div className="inline-flex w-px h-6 bg-neutral-300"></div>
      <FontSizeButton />
      <div className="inline-flex w-px h-6 bg-neutral-300"></div>

      {sections[1].map((item) => {
        return <ToolBarButton key={item.label} {...item} />;
      })}
      <TextColorButton />
      <HighlightColorButton />
      <div className="inline-flex w-px h-6 bg-neutral-300"></div>
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeight />
      <ListButton />
      {sections[2].map((item) => {
        return <ToolBarButton key={item.label} {...item} />;
      })}
    </div>
  );
};

export default Toolbar;
