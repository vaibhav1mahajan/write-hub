import { ExternalLinkIcon, FilePenIcon, MoreVertical, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Id } from "../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import RemoveDialog from "./RemoveDialog";
import { DropdownMenuItemIndicator } from "@radix-ui/react-dropdown-menu";
import RenameDialog from "./RenameDialog";


interface DocumentMenuProps {
  documentId : Id<'documents'>,
  title:string,
  onNewTab: (id: Id<'documents'>) => void
}

const DocumentMenu = ({documentId,onNewTab,title} : DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

    <Button variant={"ghost"} size={"icon"} className="rounded-full">
      <MoreVertical className="size-4" />
    </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <RenameDialog initialTitle={title} documentId={documentId}>
            <DropdownMenuItem 
              onClick={(e) => e.stopPropagation()}
              onSelect={(e)=> e.preventDefault()}
            >
              <FilePenIcon className="size-4 mr-2" />
              Rename
            </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
            <DropdownMenuItem 
              onClick={(e) => e.stopPropagation()}
              onSelect={(e)=> e.preventDefault()}
            >
              <Trash className="size-4 mr-2" />
              Remove
            </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size4 mr-2" /> 
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
