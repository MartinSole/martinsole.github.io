import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Heading from "./Heading"

test("Renders the Heading component", () => {
   const {container, findByText} = render(<Heading children="Heading" level={1} />)
    expect(container).toMatchSnapshot()
    expect(findByText('Heading')).toBeTruthy
})
