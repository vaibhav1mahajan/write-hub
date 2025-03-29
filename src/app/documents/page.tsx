"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");  // Automatically redirect to "/"
  }, [router]);

  return null;  // No need to render anything since it redirects immediately
};

export default DocumentsPage;

