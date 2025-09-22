import { memo } from "react";
import AppRouter from "./pages";

const App = () => {
  return (
    <div className="">
      <AppRouter />
    </div>
  );
};

export default memo(App);
