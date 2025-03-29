'use client'
import { SearchIcon, XIcon } from "lucide-react"
import { Button } from "../button"
import { Input } from "../input"
import { useRef, useState } from "react"
import { useSearchParams } from "@/lib/use-search-params"


const SearchInput = () => {

    const [search, setSearch] = useSearchParams();
    const [value, setValue] =   useState(search);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClear = () =>{
        setValue('');
        setSearch("");
        inputRef.current?.blur();
    }

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
     };
  return (
    <div className="flex-1 flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="w-full relative max-w-[720px]">
        <Input
            value={value}
            onChange={handleChange}
            ref={inputRef}
          placeholder="Search"
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
        />
        <Button
          type="submit"
          variant={"ghost"}
          size={"icon"}
          className="absolute top-1/2 left-3  -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="absolute top-1/2 right-3  -translate-y-1/2 [&_svg]:size-5 rounded-full"
          onClick={handleClear}
        >
          <XIcon />
        </Button>}
      </form>
    </div>
  );
}

export default SearchInput
