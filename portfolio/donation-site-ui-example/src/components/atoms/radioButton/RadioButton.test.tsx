import '@testing-library/jest-dom'
import { fireEvent, render } from "@testing-library/react"
import RadioButton from "./RadioButton"

test("Renders the RadioButton component", () => {
    const mockProps = {
        id: 'cost',
        name: 'cost',
        text: '£5',
        index: 1,
        handleOnChange: jest.fn()
    }
   const {container, getByLabelText} = render(<RadioButton {...{...mockProps}} />)
    expect(container).toMatchSnapshot()
    expect(getByLabelText(mockProps.text)).toBeTruthy
})
