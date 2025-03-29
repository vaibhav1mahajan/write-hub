import Image from "next/image"
import Link from "next/link"
import DocumentInput from "./DocumentInput"
import Menu from "./Menu"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Avatars } from "@/app/documents/[documentId]/Avatars"
import Inbox from "@/app/documents/[documentId]/Inbox"
import { Doc } from "../../../../convex/_generated/dataModel"

interface NavbarProps {
  data: Doc<'documents'>
}

const Navbar = ({data}: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between">
        <div className="flex items-center">
        <Link href={'/'}>
        <Image src={'/logo.svg'} alt="logo" height={5} width={5} className="h-8 w-8" />
        </Link>
        <div className="flex  flex-col">
            <DocumentInput data={data} />
            <Menu data={data} />
        </div>
        </div>
        <div  className=" flex items-center gap-2 ml-5">
          <Avatars />
          <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
      <UserButton />

      </div>
    </nav>
  )
}

export default Navbar
