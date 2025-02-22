import React from "react";
import { useLocation, useParams } from "react-router-dom";

// Higher Order Component (HOC) that wraps the given component with additional router-related props
const withRouter = (WrappedComponent) => (props) => {
  // Accessing the route parameters using the useParams() hook
  const params = useParams();
  // Accessing the current location object using the useLocation() hook
  const location = useLocation();

  // Passing the original props along with the additional router-related props to the wrapped component
  return <WrappedComponent {...props} params={params} location={location} />;
};

export default withRouter;
