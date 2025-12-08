import Accordian from "./Accordian";
import { render, screen } from "@testing-library/react";

describe("Accordian", () => {
  test("renders content and title", () => {
    render(
      <Accordian title="My Accordian">
        <div>Content</div>
      </Accordian>
    );

    expect(screen.getByText("My Accordian")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("renders action slot", () => {
    render(
      <Accordian
        title="With Action"
        actionSlot={<button>Action</button>}
      >
        Content
      </Accordian>
    );

    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  test("applies custom class name", () => {
    const { container } = render(
      <Accordian title="Styled" className="bg-red-500">
        Content
      </Accordian>
    );

    expect(container.firstChild).toHaveClass("bg-red-500");
  });
});
