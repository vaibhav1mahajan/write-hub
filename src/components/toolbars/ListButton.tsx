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
  ListIcon,
  ListOrderedIcon,
} from "lucide-react";

export const ListButton = () => {
    
    const {editor} = useEditorStore();

    const lists = [
      {
        label: "Bullet List",
        icon: ListIcon,
        isActive: editor?.isActive("bulletList"),
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
      },
      {
        label: "Ordered List",
        icon: ListOrderedIcon,
        isActive: editor?.isActive("orderedList"),
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      },
    ];

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {lists.map(({ label, onClick, isActive, icon: Icon }) => (
          <button
            key={label}
            onClick= {onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              isActive && "bg-neutral-200/80"
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