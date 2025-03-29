import Image from "next/image"
import Link from "next/link"
import SearchInput from "./SearchInput";
import {UserButton , OrganizationSwitcher} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className="flex h-full w-full items-center justify-between">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="logo" width={36} height={36} />
        </Link>
          <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div  className=" flex items-center gap-2 ml-5">
        <OrganizationSwitcher 
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
      <UserButton />

      </div>
    </nav>
  );
}

export default Navbar
