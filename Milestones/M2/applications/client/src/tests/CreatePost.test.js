import { render, waitFor, fireEvent, cleanup, screen } from "@testing-library/react";
import CreatePost from "../pages/CreatePost";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event'
afterEach(() => {
    cleanup();
});

test("CreatePost Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreatePost></CreatePost>, div);
});

describe("CreatePost Component", () => {
    test("Title input", async () => {
        const { container } = render(<CreatePost />);
        const title = container.querySelector('input[name="title"]');
        fireEvent.blur(title);
        await waitFor(() => {
            fireEvent.change(title, {
                target: {
                    value: "New Hiking Boots",
                },
            });
        });
        await waitFor(() => {
            expect(title.value).toBe("New Hiking Boots");
        });
    });
    test('Description input', async () => {
        const { container } = render(<CreatePost />);
        const postText = container.querySelector('input[name="postText"]');
        fireEvent.blur(postText);
        await waitFor(() => {
            fireEvent.change(postText, {
                target: {
                    value: "Hello! I have a pair of new and unused hiking boots. Please DM me!",
                },
            });
        });
        await waitFor(() => {
            expect(postText.value).toBe("Hello! I have a pair of new and unused hiking boots. Please DM me!");
        });
    });

    it('should allow user to change category', () => {
        const container = render(<CreatePost />)
        userEvent.selectOptions(
            // Find the select element, like a real user would.
            container.getByRole('combobox'),
            // Find and select the Ireland option, like a real user would.
            container.getByRole('option', { name: 'Hiking Gear' }),
        )
        expect(container.getByRole('option', { name: 'Hiking Gear' }).selected).toBe(true)
    })

    test("Deposit Fee input", async () => {
        const { container } = render(<CreatePost />);
        const depositFee = container.querySelector('input[name="depositFee"]');
        fireEvent.blur(depositFee);
        await waitFor(() => {
            fireEvent.change(depositFee, {
                target: {
                    value: "2.00",
                },
            });
        });
        await waitFor(() => {
            expect(depositFee.value).toBe("2.00");
        });
    });
    test("Shipping Fee input", async () => {
        const { container } = render(<CreatePost />);
        const shippingFee = container.querySelector('input[name="shippingFee"]');
        fireEvent.blur(shippingFee);
        await waitFor(() => {
            fireEvent.change(shippingFee, {
                target: {
                    value: "3.00",
                },
            });
        });
        await waitFor(() => {
            expect(shippingFee.value).toBe("3.00");
        });
    });
    test("Price Per Day input", async () => {
        const { container } = render(<CreatePost />);
        const pricePerDay = container.querySelector('input[name="pricePerDay"]');
        fireEvent.blur(pricePerDay);
        await waitFor(() => {
            fireEvent.change(pricePerDay, {
                target: {
                    value: "4.00",
                },
            });
        });
        await waitFor(() => {
            expect(pricePerDay.value).toBe("4.00");
        });
    });
    /*test("should submit form", async () => {
         const onSubmit = jest.fn();
         const { getByTestId } = render(<CreatePost onSubmit={onSubmit} />);
 
         await act(async () => {
             fireEvent.submit(getByTestId("create-post"));
         });
         expect(onSubmit).toHaveBeenCalled();
     });*/
})

it('should display the correct number of options', () => {
    const container = render(<CreatePost />)
    expect(container.getAllByRole('option').length).toBe(17)
});

