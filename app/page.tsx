'use client'

import CodeEditorMain from "@/components/CodeEditorMain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const Home = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient} >
      <CodeEditorMain />
    </QueryClientProvider >
  );
};

export default Home;
