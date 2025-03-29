'use client'
import { Id } from "../../convex/_generated/dataModel"
import { ReactNode, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
  
  
  interface RenameDialogProps {
    documentId : Id<'documents'>;
    initialTitle:string
    children: ReactNode;
  }

const RenameDialog = ({children,initialTitle,documentId} : RenameDialogProps) => {
    const update = useMutation(api.documents.updatebyId)
    const [isUpdating,setIsUpdating] = useState(false)

    const [title,setTitle] = useState(initialTitle)
    const [open ,setOpen] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsUpdating(true);

        update({id:documentId , title:title.trim() || "Untitled"}).catch(()=>toast.error('Something went wrong')).then(()=> toast.success('Document renamed')).finally(()=>{
            setIsUpdating(false);
            setOpen(false);
        })
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild >
            {children}
        </DialogTrigger>
        <DialogContent onClick={(e) =>e.stopPropagation()}>
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>Rename document</DialogTitle>
                    <DialogDescription>
                        Enter a new name for this document
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <Input placeholder="Document name"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e)=> setTitle(e.target.value) }
                            value={title}
                        />
                </div>
                <DialogFooter>
                    <Button type="button" variant='ghost' disabled={isUpdating} onClick={(e)=>{e.stopPropagation(); setOpen(false)}}>Cancel</Button>
                    <Button type="submit" disabled={isUpdating} onClick={(e)=>e.stopPropagation()}>Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default RenameDialog
