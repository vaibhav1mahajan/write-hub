import { useEditorStore } from "@/store/use-editor-store"
import {type ColorResult , CirclePicker, SketchPicker } from "react-color";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";

export const TextColorButton = () =>{
    const {editor} = useEditorStore();

    const value = editor?.getAttributes('textStyle').color || "#000";
    const onChange = (color : ColorResult) => {
       return  editor?.chain().focus().setColor(color.hex).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                )}>
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full" style={{backgroundColor:value}}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}