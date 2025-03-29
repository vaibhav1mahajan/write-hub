import { BsCloudCheck, BsCloudSlash } from "react-icons/bs"
import { Doc } from "../../../../convex/_generated/dataModel"
import { ReactHTMLElement, useRef, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useDebounce } from "@/lib/use-debounce"
import { toast } from "sonner"
import { useStatus } from "@liveblocks/react"
import { LoaderIcon } from "lucide-react"
interface DocumentInputProps {
  data: Doc<'documents'>
}

const DocumentInput = ({data}:DocumentInputProps) => {

  const status = useStatus()

  const [value,setValue] = useState(data.title);
  const [isEditing,setIsEditing] = useState(false)
  const [isPending,setIsPending] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updatebyId);

  const debouncedUpdate = useDebounce((newValue:string)=>{
    if(newValue === data.title) return ;
    setIsPending(true);
    mutate({id:data._id,title:newValue}).then(()=> toast.success('Document Updated')).catch(()=>toast.error('Something went wrong')).finally(()=>setIsPending(false))
  },500)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setIsPending(true);
    mutate({id:data._id,title:value}).then(()=> {toast.success('Document Updated'); setIsEditing(false)}).catch(()=>toast.error('Something went wrong')).finally(()=>setIsPending(false))
  }

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const newValue =e.target.value;
    setValue(newValue);
  }

  const showLoader = isPending || status==='connecting' || status === 'reconnecting'
  const showError = status === 'disconnected'

  return (
    <div className="flex items-center gap-x-0.5">
      {isEditing ? (
        <form onSubmit={handleSubmit}  className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ' '}
          </span>
          <input type="text" ref={inputRef} value={value} className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate" onChange={onChange} onBlur={()=> setIsEditing(false)} />
        </form>
      ) : (
        <>
        <span onClick={()=> {
          setIsEditing(true)
          setTimeout(() => {
            inputRef.current?.focus()
          }, 0);
        }} className="text-lg px-1.5 cursor-pointer truncate">{data.title}</span>
        {!showError && !showLoader && <BsCloudCheck className="relative -bottom-[1px] text-sky-500" /> }
        {showLoader && <LoaderIcon className="relative -bottom-[1px] animate-spin text-muted-foreground" />}
        {showError && <BsCloudSlash className="relative -bottom-[1px] text-muted-foreground" />}
        </>
      )}
        
    </div>
  )
}

export default DocumentInput
