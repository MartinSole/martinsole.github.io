import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Text from "./Text"

test("Renders the Text component as a span", () => {
   const {container} = render(<Text children="Text" as="span" />)
    expect(container).toMatchSnapshot()
    const span = container.querySelector('span')
    expect(span).toBeTruthy
})
