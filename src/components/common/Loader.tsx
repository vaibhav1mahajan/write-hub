import { LoaderIcon } from "lucide-react"





const Loader = ({label} : {label?:string}) => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-2">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
        {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}

export default Loader
