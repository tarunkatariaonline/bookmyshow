import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
type Props = {
  children: ReactNode;
};

const ReduxProvider = ({ children }: Props) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default ReduxProvider;
