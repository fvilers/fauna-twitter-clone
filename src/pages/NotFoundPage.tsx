import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        Take me back to the <Link to="/">home page</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
