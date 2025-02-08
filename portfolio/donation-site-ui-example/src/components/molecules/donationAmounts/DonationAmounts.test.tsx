import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import DonationAmounts from "./DonationAmounts"

test("Renders the DonationAmounts component", () => {
    const mockProps = {
        donationAmounts: [1,2,3,4,5]
    }
   const {container} = render(<DonationAmounts donationAmounts={mockProps.donationAmounts}/>)
    expect(container).toMatchSnapshot()
    const radioButtons = container.querySelectorAll('input')
    expect(radioButtons).toHaveLength(5)
})
