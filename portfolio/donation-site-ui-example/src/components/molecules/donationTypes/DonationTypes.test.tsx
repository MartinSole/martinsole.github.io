import '@testing-library/jest-dom'
import { fireEvent, render } from "@testing-library/react"
import DonationType from "./DonationType"

test("Renders the DonationAmounts component", () => {
    const mockProps = {
        donationTypes: ['weekly', 'monthly', 'yearly'],
        handleDonationType: jest.fn(),
    }
   const {container} = render(<DonationType donationTypes={mockProps.donationTypes} handleDonationType={mockProps.handleDonationType}/>)
    expect(container).toMatchSnapshot()
    const radioButtons = container.querySelectorAll('input')
    expect(radioButtons).toHaveLength(3)
    fireEvent.click(radioButtons[1])
    expect(mockProps.handleDonationType).toHaveBeenCalled()
})
