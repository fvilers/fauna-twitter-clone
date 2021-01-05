import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Twitter clone</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus cum
        quasi voluptatum similique magni eveniet, quibusdam facilis minus
        tenetur perspiciatis impedit repudiandae molestias amet vero
        voluptatibus officia quis architecto! Odio!
      </p>
      <p>
        <Link to="/foo">404 page</Link>
      </p>
    </div>
  );
}

export default HomePage;
