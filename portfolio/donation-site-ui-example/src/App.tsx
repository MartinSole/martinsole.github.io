import { useEffect, useState } from 'react'
import './App.css'
import {Button, Heading, Text} from './components/atoms'
import { DonationAmounts, DonationType, PaymentImageContainer } from './components/molecules'

function App() {
  const donationTypes = ['Single', 'Regular']
  const singleDonationAmounts = [5,10,20,50]
  const regularDonationAmounts = [2,4,8,20]
  const [donationType, setDonationType] = useState('Single')
  const [donationAmounts, setDonationAmounts] = useState(singleDonationAmounts)


  useEffect(() => {
    donationType === 'Single' ? setDonationAmounts(singleDonationAmounts) : setDonationAmounts(regularDonationAmounts)
  },[donationType])

  const handleDonationType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationType(e.target.value)
  }

  const renderDonate = () => {

    return (
      <section className="donateContainer">
        <header>
          <Heading level={1}>Make a donation</Heading>
          <Text>Do something amazing</Text>
        </header>
        <form>
          <DonationType {...{donationTypes, handleDonationType}}/>
          <DonationAmounts {...{donationAmounts }} />
          <Button buttonType="submit">Donate</Button>
        </form>
        <PaymentImageContainer />
      </section>
    )
  }

  return (
      <main>
          <div className='imageContainer' />
          {renderDonate()}
      </main>
  )
}

export default App
