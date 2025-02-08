import { Image } from '../../atoms'

const PaymentImageContainer = () => {
  return (
    <footer className='logoContainer'>
      <Image src="src/images/logos/Fundraising Regulator.svg" alt="Funraising regulator" />
      <Image src="src/images/logos/Visa.svg" alt="Visa" />
      <Image src="src/images/logos/Mastercard.svg" alt="Mastercard" />
      <Image src="src/images/logos/Apple Pay.svg" alt="Apple pay" />
      <Image src="src/images/logos/Google Pay.svg" alt="Google Pay" />
      <Image src="src/images/logos/Paypal.svg" alt="Paypal" />
    </footer>
  )
}

export default PaymentImageContainer