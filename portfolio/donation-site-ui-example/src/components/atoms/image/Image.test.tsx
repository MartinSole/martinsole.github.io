import '@testing-library/jest-dom'
import { getByRole, render } from "@testing-library/react"
import Image from "./Image"

test("Renders the Image component", () => {
   const {container, getByAltText, getByRole} = render(<Image src="https://placehold.co/600x400" alt="grey square"/>)
    expect(container).toMatchSnapshot()
    expect(getByRole('img')).toBeTruthy
    expect(getByAltText('grey square')).toBeTruthy
})
