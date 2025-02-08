import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Button from "./Button"

test("Renders the Button component", () => {
   const {container, findByText} = render(<Button children="test" />)
    expect(container).toMatchSnapshot()
    expect(findByText('test')).toBeTruthy
})
