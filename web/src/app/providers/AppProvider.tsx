import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { background: "#27272a", color: "#fafafa", border: "1px solid rgba(255,255,255,0.1)" },
        }}
      />
    </>
  );
};

export default AppProvider;
