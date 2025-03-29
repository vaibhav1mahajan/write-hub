"use client";

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
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useState } from "react";
import { BsFilePdf } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Doc } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RenameDialog from "@/components/common/dialogs/RenameDialog";
import RemoveDialog from "@/components/common/dialogs/RemoveDialog";

interface MenuProps {
  data: Doc<"documents">;
}

const Menu = ({ data }: MenuProps) => {
  const { editor } = useEditorStore();
  const router = useRouter();
  const mutation = useMutation(api.documents.create);

  const onNewDocumment = () => {
    mutation({
      title: "Untitled Document",
      initialContent: "",
    })
      .then((id) => {
        toast.success("Document created");
        router.push(`/documents/${id}`);
      })
      .catch(() => toast.error("something went wrong"));
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols }).run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const blob = new Blob([JSON.stringify(editor.getJSON())], {
      type: "application/json;charset=utf-8",
    });
    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const blob = new Blob([editor.getHTML()], {
      type: "text/html;charset=utf-8",
    });
    onDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;
    const blob = new Blob([editor.getText()], {
      type: "text/plain;charset=utf-8",
    });
    onDownload(blob, `${data.title}.txt`);
  };

  return (
    <div className="flex">
      <Menubar className="h-auto p-0 bg-transparent border-none shadow-none ">
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted  h-auto">
            File
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger>
                <FileIcon className="mr-2 size-4" />
                Save
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={onSaveJSON}>
                  <FileJsonIcon className="mr-2 size-4" />
                  JSON
                </MenubarItem>
                <MenubarItem onClick={onSaveHTML}>
                  <GlobeIcon className="mr-2 size-4" />
                  HTML
                </MenubarItem>
                <MenubarItem onClick={() => window.print()}>
                  <BsFilePdf className="mr-2 size-4" />
                  PDF
                </MenubarItem>
                <MenubarItem onClick={onSaveText}>
                  <FileTextIcon className="mr-2 size-4" />
                  TEXT
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem onClick={onNewDocumment}>
              <FilePlusIcon className="mr-2 text-black size-4" />
              New Document
            </MenubarItem>
            <MenubarSeparator />
            <RenameDialog documentId={data._id} initialTitle={data.title}>
              <MenubarItem
                onClick={(e) => e.stopPropagation()}
                onSelect={(e) => e.preventDefault()}
              >
                <FilePenIcon className="mr-2 text-black size-4" />
                Rename
              </MenubarItem>
            </RenameDialog>
            <RemoveDialog documentId={data._id}>
              <MenubarItem
                onClick={(e) => e.stopPropagation()}
                onSelect={(e) => e.preventDefault()}
              >
                <TrashIcon className="mr-2 text-black size-4" />
                Remove
              </MenubarItem>
            </RemoveDialog>
            <MenubarSeparator />
            <MenubarItem onClick={() => window.print()}>
              <PrinterIcon className="mr-2 text-black size-4" />
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
              <Undo2Icon className="mr-2 text-black size-4" />
              Undo <MenubarShortcut>{"\u2318"} Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
              <Redo2Icon className="mr-2 text-black size-4" />
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
                <TextIcon className="mr-2 size-4" />
                Text
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <BoldIcon className="mr-2 size-4" />
                  Bold <MenubarShortcut>{"\u2318"} B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <ItalicIcon className="mr-2 size-4" />
                  Italic <MenubarShortcut>{"\u2318"} I</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                >
                  <UnderlineIcon className="mr-2 size-4" />
                  Underline <MenubarShortcut>{"\u2318"} U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <StrikethroughIcon className="mr-2 size-4" />
                  Strikethrough <MenubarShortcut>{"\u2318"} S</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem
              onClick={() => editor?.chain().focus().unsetAllMarks().run()}
            >
              <RemoveFormattingIcon className="mr-2 text-black size-4" />
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
                    rows: Math.max(parseInt(rows) || 1, 1),
                    cols: Math.max(parseInt(cols) || 1, 1),
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
};

export default Menu;
