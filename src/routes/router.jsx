import { Route, Routes } from "react-router-dom";
import pagesData from "../pages/pagesData";
import Layout from "../layout/Layout";

const renderRoutes = (routes) => {
  return routes.map(({ path, title, element, children = [] }) => {
    return (
      <Route key={title} exact path={path} element={element}>
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
