import { RadioButton } from '../../atoms'

interface Props {
    donationAmounts: number[]
}


const DonationAmounts = ({donationAmounts}: Props) => {
  return (
    <fieldset className='donationAmountsContainer gridContainer gridGap'>
      <legend className="srOnly">Choose an amount to donate</legend>
        {donationAmounts.map((donationAmount, index) => <RadioButton {...{
          id: `donation-amount-${index}`,
          name: 'donation-amount',
          text:`£${donationAmount}`,
          index,
        }}
        key={donationAmount}
          />)}
    </fieldset>
  )
}

export default DonationAmounts