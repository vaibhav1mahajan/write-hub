import { useEditorStore } from "@/store/use-editor-store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import TextAlign from "@tiptap/extension-text-align";

export const AlignButton = () => {
    
    const {editor} = useEditorStore();

    const alignments = [
      {
        label: "Left",
        value: "left",
        icon: AlignLeftIcon,
      },
      {
        label: "Center",
        value: "center",
        icon: AlignCenterIcon,
      },
      {
        label: "Right",
        value: "right",
        icon: AlignRightIcon,
      },
      {
        label: "Justify",
        value: "justify",
        icon: AlignJustifyIcon,
      }
    ];

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() =>
              editor?.chain().focus().setTextAlign(value).run()
            }
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ TextAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};