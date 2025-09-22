import { lazy, memo, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const MainLayout = lazy(() => import("./layout"));
const Home = lazy(() => import("./home"));
const NotFound = lazy(() => import("./404/404"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <ClipLoader />
        </div>
      }
    >
      {useRoutes([
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { path: "/", element: <Home /> },
            { path: "*", element: <NotFound /> },
          ],
        },
      ])}
    </Suspense>
  );
};

export default memo(AppRouter);
