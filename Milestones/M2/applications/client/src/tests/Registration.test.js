import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Registration from "../pages/Registration";
import ReactDOM from "react-dom";

test("Registration Renders", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Registration />, div);
});

describe("Input tests", () => {
  test("Username input", async () => {
    const { container } = render(<Registration />);
    const username = container.querySelector('input[name="username"]');
    fireEvent.blur(username);
    await waitFor(() => {
      fireEvent.change(username, {
        target: {
          value: "testusername",
        },
      });
    });
    await waitFor(() => {
      expect(username.value).toBe("testusername");
    });
  });
  test("Address input ", async () => {
    const { container } = render(<Registration />);
    const address = container.querySelector('input[name="address"]');

    fireEvent.blur(address);
    await waitFor(() => {
      fireEvent.change(address, {
        target: {
          value: "1234 Street",
        },
      });
    });
    await waitFor(() => {
      expect(address.value).toBe("1234 Street");
    });
  });
  test("City input ", async () => {
    const { container } = render(<Registration />);
    const city = container.querySelector('input[name="city"]');

    fireEvent.blur(city);
    await waitFor(() => {
      fireEvent.change(city, {
        target: {
          value: "San Jose",
        },
      });
    });
    await waitFor(() => {
      expect(city.value).toBe("San Jose");
    });
  });
  test("State input ", async () => {
    const { container } = render(<Registration />);
    const state = container.querySelector('input[name="state"]');

    fireEvent.blur(state);
    await waitFor(() => {
      fireEvent.change(state, {
        target: {
          value: "California",
        },
      });
    });
    await waitFor(() => {
      expect(state.value).toBe("California");
    });
  });
  test("Zip Code input ", async () => {
    const { container } = render(<Registration />);
    const zipCode = container.querySelector('input[name="zipCode"]');

    fireEvent.blur(zipCode);
    await waitFor(() => {
      fireEvent.change(zipCode, {
        target: {
          value: "54321",
        },
      });
    });
    await waitFor(() => {
      expect(zipCode.value).toBe("54321");
    });
  });
  test("Country input ", async () => {
    const { container } = render(<Registration />);
    const country = container.querySelector('input[name="country"]');

    fireEvent.blur(country);
    await waitFor(() => {
      fireEvent.change(country, {
        target: {
          value: "USA",
        },
      });
    });
    await waitFor(() => {
      expect(country.value).toBe("USA");
    });
  });
});
