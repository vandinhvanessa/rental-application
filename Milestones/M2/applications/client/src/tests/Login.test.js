import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
// import ReactDOM from "react-dom";
import Login, { validateInput } from "../pages/Login";
import "@testing-library/jest-dom/extend-expect";
// import { shallow } from "enzyme";
// import Enzyme from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// Enzyme.configure({ adapter: new Adapter() });

// test("Login Should Render", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Login />, div);
// });

// describe("Login Inputs", () => {
//   /*test('Username login', async () => {
//       const loginContainer = shallow(<Login/>)
//       loginContainer.find('input[name="text"]').simulate('change', {target: {name: 'text', value: 'vanessa'}});
//       expect(loginContainer.state('text')).toEqual('vanessa');
//     })*/
//   it("renders children when passed in", () => {
//     const wrapper = shallow(
//       <Login>
//         <div className="loginContainer" />
//       </Login>
//     );
//     expect(wrapper.contains(<div className="loginContainer" />)).toBe();
//   });
// });

afterEach(() => {
  cleanup();
});

describe("Login component", () => {
  it("rendered button", () => {
    const { getByTestId } = render(<Login />);
    const login = getByTestId("button");
    expect(login).toBeTruthy();
  });

  // it("username component", () => {
  //   const { getByTestId } = render(<Login />);
  //   const username = getByTestId("username");
  //   expect(username).toHaveTextContent("username");
  // });

  it("password form should be in the document", () => {
    const component = render(<Login />);
    const label = component.getByText("Password:");
    expect(label).toBeInTheDocument();
  });

  // it("makes sure label and input is stored in relation to each other", () => {
  //   const component = render(<Login />);
  //   const passwordInput = component.getByLabelText("Password:");
  //   expect(passwordInput.getAttribute("name")).toBe("password")
  // })

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
