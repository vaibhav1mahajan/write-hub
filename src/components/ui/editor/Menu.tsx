'use client'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { useEditorStore } from "@/store/use-editor-store";
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
import { useState } from "react";
import { BsFilePdf } from "react-icons/bs";
import {Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,} from "@/components/ui/dialog";
import { Input } from "../input";
import { Button } from "../button";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RenameDialog from "@/components/RenameDialog";
import RemoveDialog from "@/components/RemoveDialog";
  
interface MenuProps {
  data: Doc<'documents'>
}

const Menu = ({data}: MenuProps) => {
  const {editor} = useEditorStore();
  const router = useRouter();
  const mutation = useMutation(api.documents.create);

  const onNewDocumment = () =>{
    mutation({
      title:"Untitled Document",
      initialContent:""
    }).then((id)=>{
      toast.success('Document created')
      router.push(`/documents/${id}`)
    }).catch(()=> toast.error('something went wrong'))
  }

  const [isDialogOpen,setIsDialogOpen] = useState(false)
  const [rows,setRows] = useState("");
  const [cols,setCols] = useState("");
  const insertTable = ({rows , cols} : {rows:number , cols:number})  =>{
      editor?.chain().focus().insertTable({rows, cols}).run()
  }

  const onDownload = (blob:Blob , filename:string) =>{
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click()
  }

  const onSaveJSON = () =>{
    if(!editor) return ;
    const blob = new Blob([JSON.stringify(editor.getJSON())],{type:"application/json;charset=utf-8"});
    onDownload(blob,`${data.title}.json`)
  }

  const onSaveHTML = () =>{
    if(!editor) return ;
    const blob = new Blob([editor.getHTML()],{type:"text/html;charset=utf-8"});
    onDownload(blob,`${data.title}.html`)
  }

  const onSaveText = () =>{
    if(!editor) return ;
    const blob = new Blob([editor.getText()],{type:"text/plain;charset=utf-8"});
    onDownload(blob,`${data.title}.txt`)
  }
  

  return (
    <div className="flex">
      <Menubar className="border-none shadow-none bg-transparent h-auto p-0 ">
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted  h-auto">
            File
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger>
                <FileIcon className="size-4 mr-2" />
                Save
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={onSaveJSON}>
                  <FileJsonIcon className="size-4 mr-2" />
                  JSON
                </MenubarItem>
                <MenubarItem onClick={onSaveHTML}>
                  <GlobeIcon className="size-4 mr-2" />
                  HTML
                </MenubarItem>
                <MenubarItem onClick={() => window.print()}>
                  <BsFilePdf className="size-4 mr-2" />
                  PDF
                </MenubarItem>
                <MenubarItem onClick={onSaveText}>
                  <FileTextIcon className="size-4 mr-2" />
                  TEXT
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem onClick={onNewDocumment}>
              <FilePlusIcon className="size-4 mr-2 text-black" />
              New Document
            </MenubarItem>
            <MenubarSeparator />
            <RenameDialog documentId={data._id} initialTitle={data.title}>

            <MenubarItem 
              onClick={(e)=>e.stopPropagation()}
              onSelect={(e)=> e.preventDefault() }
            >
              <FilePenIcon className="size-4 mr-2 text-black" />
              Rename
            </MenubarItem>  
            </RenameDialog>
            <RemoveDialog documentId={data._id}>

            <MenubarItem 
              onClick={(e)=>e.stopPropagation()}
              onSelect={(e)=>e.preventDefault()}
            >
              <TrashIcon className="size-4 mr-2 text-black" />
              Remove
            </MenubarItem>
            </RemoveDialog>
            <MenubarSeparator />
            <MenubarItem onClick={() => window.print()}>
              <PrinterIcon className="size-4 mr-2 text-black" />
              Print <MenubarShortcut>{"\u2318"} P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted  h-auto">
            Edit
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
              <Undo2Icon className="size-4 mr-2 text-black" />
              Undo <MenubarShortcut>{"\u2318"} Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
              <Redo2Icon className="size-4 mr-2 text-black" />
              Redo <MenubarShortcut>{"\u2318"} Y</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted  h-auto">
            Insert
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Table</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                  2 x 2
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                  3 x 3
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                  4 x 4
                </MenubarItem>
                <MenubarItem
                  onClick={() => {
                    setIsDialogOpen(true);
                    
                  }}
                >
                  Custom
                 
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted  h-auto">
            Format
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <TextIcon className="size-4 mr-2" />
                Text
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={()=> editor?.chain().focus().toggleBold().run()}>
                  <BoldIcon className="size-4 mr-2" />
                  Bold <MenubarShortcut>{"\u2318"} B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={()=> editor?.chain().focus().toggleItalic().run()}>
                  <ItalicIcon className="size-4 mr-2" />
                  Italic <MenubarShortcut>{"\u2318"} I</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={()=> editor?.chain().focus().toggleUnderline().run()}>
                  <UnderlineIcon className="size-4 mr-2" />
                  Underline <MenubarShortcut>{"\u2318"} U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={()=> editor?.chain().focus().toggleStrike().run()}>
                  <StrikethroughIcon className="size-4 mr-2" />
                  Strikethrough <MenubarShortcut>{"\u2318"} S</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem onClick={()=> editor?.chain().focus().unsetAllMarks().run()}>
              <RemoveFormattingIcon className="size-4 mr-2 text-black" />
              Clear formatting
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {isDialogOpen && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Enter rows and columns</DialogTitle>
                        </DialogHeader>
                        <Input
                          placeholder="Enter number of rows"
                          value={rows}
                          onChange={(e) => setRows(e.target.value)}
                        />
                        <Input
                          placeholder="Enter number of cols"
                          value={cols}
                          onChange={(e) => setCols(e.target.value)}
                        />
                        <DialogFooter>
                          <Button
                            onClick={() => {
                              insertTable({
                                rows: Math.max(parseInt(rows) || 1,1),
                                cols: Math.max(parseInt(cols) || 1,1),
                              });
                              setIsDialogOpen(false);
                            }}
                            className="w-full"
                          >
                            Insert
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
    </div>
  );
}

export default Menu
