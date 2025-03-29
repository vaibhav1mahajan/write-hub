'use client'

import { useEditorStore } from "@/store/use-editor-store"
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
  import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils";
import { ImageIcon, Link2Icon, SearchIcon, UploadIcon } from "lucide-react";
import { Button } from "../ui/button";

export const ImageButton = () =>{
    const {editor} = useEditorStore();
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const [imageUrl,setImageUrl] = useState("")
    const onChange = (src : string) =>{
        editor?.chain().focus().setImage({src}).run();
    }

    const onUpload = () =>{
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = (e) =>{
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file){
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }

        input.click();
    }

    const handleImageUrlSubmit = () =>{
        if(imageUrl){
            onChange(imageUrl);
            setImageUrl('');
            setIsDialogOpen(false);
        }
    }

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
                )}>
                    <ImageIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={onUpload}>
                    <UploadIcon className="mr-2 size-4"/> Upload
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    <SearchIcon className="mr-2 size-4" /> Paste Image Url
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Insert Image Url
                    </DialogTitle>
                </DialogHeader>
                <Input placeholder="Insert Image Url " value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        handleImageUrlSubmit();
                    }
                }} />
                <DialogFooter>
                    <Button onClick={handleImageUrlSubmit}>
                        Insert
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}