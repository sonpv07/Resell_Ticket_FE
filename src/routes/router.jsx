import { Route, Routes } from "react-router-dom";
import pagesData from "../pages/pagesData";
import Layout from "../layout/Layout"; // Default layout
import ProtectedRoute from "./ProtectedRoute";

const renderRoutes = (routes) => {
  return routes.map(
    ({
      path,
      title,
      element,
      allowedRoles,
      layout = Layout,
      children = [],
    }) => {
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
    }
  );
};

const Router = () => {
  // Group routes by layout
  const layoutGroups = pagesData.reduce((acc, route) => {
    const { layout = Layout } = route;
    const layoutKey = layout.name || "defaultLayout";

    acc[layoutKey] = acc[layoutKey] || { component: layout, routes: [] };
    acc[layoutKey].routes.push(route);
    return acc;
  }, {});

  return (
    <Routes>
      {Object.entries(layoutGroups).map(
        ([layoutKey, { component: LayoutComponent, routes }]) => (
          <Route element={<LayoutComponent />} key={layoutKey}>
            {renderRoutes(routes)}
          </Route>
        )
      )}
    </Routes>
  );
};

export default Router;
