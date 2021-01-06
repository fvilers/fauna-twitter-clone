import { render, screen } from "@testing-library/react";
import React from "react";
import Greeting from "./Greeting";

test("renders when greeting", () => {
  const when = new Date();
  when.setHours(5);
  when.setMinutes(0);

  render(<Greeting when={when} />);
  const linkElement = screen.getByText(/Good morning/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders afternoon greeting", () => {
  const when = new Date();
  when.setHours(12);
  when.setMinutes(30);

  render(<Greeting when={when} />);
  const linkElement = screen.getByText(/Good afternoon/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders evening greeting", () => {
  const when = new Date();
  when.setHours(17);
  when.setMinutes(1);

  render(<Greeting when={when} />);
  const linkElement = screen.getByText(/Good evening/i);
  expect(linkElement).toBeInTheDocument();
});
