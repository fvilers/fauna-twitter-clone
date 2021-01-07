import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        Take me back to the <Link to="/">home page</Link>
      </p>
    </main>
  );
}

export default NotFoundPage;
