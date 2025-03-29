import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-3 pr-6 shrink-0">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div className="flex items-center gap-2 ml-5 ">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
