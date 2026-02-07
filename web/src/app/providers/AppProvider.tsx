import type { ReactNode } from "react";
import ReduxProvider from "./ReduxProvider";
import QueryClientProvider from "./QueryClientProvider";
type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <>
      <ReduxProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </ReduxProvider>
    </>
  );
};

export default AppProvider;
