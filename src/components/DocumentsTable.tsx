import { PaginationStatus } from "convex/react";
import { Doc } from "../../convex/_generated/dataModel";
import { Building2Icon, CircleUserIcon, LoaderIcon, MoreVertical } from "lucide-react";
import {SiGoogledocs} from 'react-icons/si'
import {format} from 'date-fns'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button";
import DocumentMenu from "./DocumentMenu";
import { useRouter } from "next/navigation";
  

interface DocumentsTableProps{
    documents: Doc<'documents'>[] | undefined,
    loadMore: (numItems : number) => void,
    status: PaginationStatus
}


const DocumentRow = ({document}: {document :Doc<'documents'>}) =>{
        const router = useRouter();
        const onNewTabClickk = (id:string) =>{
            window.open(`/documents/${id}`,'_blank');
        }


    return (
        <TableRow className="cursor-pointer" onClick={()=> router.push(`/documents/${document._id}`)}>
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document.organizationId ? <Building2Icon  className="size-4"/> : <CircleUserIcon className="size-4"/>}
                {document.organizationId ? "Organization" : "Personal"}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(new Date(document._creationTime), "MMM dd ,yyyy")}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu 
                    documentId = {document._id}
                    title = {document.title}
                    onNewTab = {onNewTabClickk}
                    /> 
            </TableCell>
        </TableRow>
    )
}

const DocumentsTable = ({documents,loadMore,status}:DocumentsTableProps) => {
  return (
    <div className="max-w-screen-xl flex flex-col gap-5 mx-auto px-16 py-6">
      {documents === undefined ? (
        <div className="flex justify-center items-centere h-24">
            <LoaderIcon className="animate-spin size-6 text-muted-foreground" />
        </div>
      ) : (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent border-none">
                    <TableHead>Name</TableHead>
                    <TableHead>&nbsp;</TableHead>
                    <TableHead className="hidden md:table-cell">Shared</TableHead>
                    <TableHead className="hidden md:table-cell">Created at</TableHead>

                </TableRow>
            </TableHeader>
           {documents.length ===0 ? (
             <TableBody>
                    <TableRow className="hover:bg-transparent border-none">
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                            No documents Found
                        </TableCell>
                    </TableRow>
             </TableBody>
           ) : (
            <TableBody>
                {documents.map((document)=>(
                    <DocumentRow key={document._id} document={document} />
                ))}
            </TableBody>
           )}
        </Table>
      )}
      <div className="flex items-center justify-center">
        <Button variant={'ghost'} size={'sm'} onClick={()=> loadMore(5)} disabled={status !== 'CanLoadMore'}>
            {status === 'CanLoadMore' ? 'Load More' : 'End of Results'}
        </Button>
      </div>
    </div>
  )
}

export default DocumentsTable
