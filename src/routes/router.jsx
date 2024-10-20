import { Route, Routes } from "react-router-dom";
import pagesData from "../pages/pagesData";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

const renderRoutes = (routes) => {
  return routes.map(({ path, title, element, allowedRoles, children = [] }) => {
    return (
      <Route
        key={title}
        path={path}
        element={
          allowedRoles ? (
            <ProtectedRoute element={element} allowedRoles={allowedRoles} />
          ) : (
            element
          )
        }
      >
        {children?.length > 0 && renderRoutes(children)}
      </Route>
    );
  });
};

const Router = () => {
  const pageRoutes = renderRoutes(pagesData);
  return (
    <Routes>
      <Route element={<Layout />}>{pageRoutes}</Route>
    </Routes>
  );
};

export default Router;
