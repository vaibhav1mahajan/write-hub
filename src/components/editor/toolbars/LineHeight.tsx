import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ListCollapseIcon } from "lucide-react";

export const LineHeight = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { value: "100", label: "1" },
    { value: "150", label: "1.5" },
    { value: "200", label: "2" },
    { value: "250", label: "2.5" },
    { value: "300", label: "3" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() =>
              editor?.chain().focus().setLineHeight(`${value}%`).run()
            }
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph")?.value === value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
