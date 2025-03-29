"use client"

import Navbar from "@/components/ui/sections/Navbar";
import TemplateGallery from "@/components/ui/sections/TemplateGallery";
import { usePaginatedQuery  } from "convex/react";
import { api } from "../../convex/_generated/api";
import DocumentsTable from "@/components/DocumentsTable";
import { useSearchParams } from "@/lib/use-search-params";

export default function Home() {
  const [search] = useSearchParams()
  const {results,loadMore,status,isLoading} = usePaginatedQuery(api.documents.get,{search},{initialNumItems:5})
  return (

    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white h-16 p-4">
        <Navbar />
      </div>
      <div className="mt-16">
     <TemplateGallery />
     <DocumentsTable documents={results} status={status} loadMore={loadMore}/>
      </div>
    </div>
    
  );
}
