import { RadioButton } from '../../atoms'

interface Props {
  donationTypes: string[]
  handleDonationType: React.ChangeEventHandler
}

const DonationType = ({ donationTypes, handleDonationType }: Props) => {
  return (
  <fieldset className="gridContainer gridGap">
    <legend className='srOnly'>Choose a donation type</legend>
    {donationTypes.map(((donationType, index) => <RadioButton {...{
      id: `donation-type-${index}`,
      name: 'donation-type',
      text: donationType,
      handleOnChange: handleDonationType,
      index
    }} 
    key={donationType}
    />))}
  </fieldset>)
}

export default DonationType