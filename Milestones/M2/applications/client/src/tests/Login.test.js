import { render, fireEvent, cleanup } from "@testing-library/react";
import Login, { validateInput } from "../pages/Login";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
  cleanup();
});

describe("Login component", () => {
  it("rendered button", () => {
    const { getByTestId } = render(<Login />);
    const login = getByTestId("button");
    expect(login).toBeTruthy();
  });

  it("password form should be in the document", () => {
    const component = render(<Login />);
    const label = component.getByText("Password:");
    expect(label).toBeInTheDocument();
  });

  it("username input should accept text", () => {
    const { getByLabelText } = render(<Login />);
    const username = getByLabelText("Username:");
    expect(username.value).toMatch("");
    fireEvent.change(username, { target: { value: "testing" } });
    expect(username.value).toMatch("testing");
  });

  it("password input should accept text", () => {
    const { getByLabelText } = render(<Login />);
    const password = getByLabelText("Password:");
    expect(password.value).toMatch("");
    fireEvent.change(password, { target: { value: "1234" } });
    expect(password.value).toMatch("1234");
  });
});
