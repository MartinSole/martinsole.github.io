import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import PaymentImageContainer from "./PaymentImageContainer"

test("Renders the Text component", () => {
   const {container} = render(<PaymentImageContainer />)
    expect(container).toMatchSnapshot()
})
