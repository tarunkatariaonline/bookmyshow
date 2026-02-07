import type { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
type Props = {
  children: ReactNode;
};

const QueryClientProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider client={queryClient}>{children}</Provider>
    </>
  );
};

export default QueryClientProvider;
