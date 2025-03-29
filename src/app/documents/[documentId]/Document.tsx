'use client'

import Navbar from "@/components/ui/editor/Navbar";
import Editor from "./Editor";
import Toolbar from "./Toolbar";
import { Room } from "./Room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
 preloadedDocument : Preloaded<typeof api.documents.getById>
}


const Document =  ({preloadedDocument} : DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);
  return (
      <Room >
    <div className="min-h-screen bg-[rgb(213,215,217)]">
      <div className="print:hidden flex flex-col px-4 pt-2 gap-y-2 top-0 left-0 right-0 z-10 bg-[#FAFBFD]">
      <Navbar data={document} />
      <Toolbar />
      </div>
      <div className=" print:p-0">
      <Editor initialContent={document.initialContent} />
      </div>
    </div>
      </Room>
   
  )
}

export default Document
