import React, { useState } from 'react'
import styled from 'styled-components'
import PieChart from '../piechart/pieChart'
const MainContainer = styled.div`
  margin: 0 auto;
  padding: 0 16px;
`

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  :before {
    content: '';
    position: absolute;
    background: #6fa8dc;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: '';
    position: absolute;
    background: #0b5394;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`

const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid ${({ step }) =>
      step === 'completed' ? '#0b5394' : '#6fa8dc'};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StepCount = styled.span`
  font-size: 19px;
  color: #0b5394;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StepLabel = styled.span`
  font-size: 19px;
  color: #0b5394;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
  margin-top: 30px;
`

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #0b5394;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #0b5394;
    color: #000000;
    cursor: not-allowed;
  }
`

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #0b5394;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`

const steps = [
  {
    label: '',
    step: 0,
  },
  {
    label: '',
    step: 1,
  },
  {
    label: '',
    step: 2,
  },
  {
    label: '',
    step: 3,
  },
  {
    label: '',
    step: 4,
  },
]

const ProgressSteps = (chartDat) => {
  const [activeStep, setActiveStep] = useState(0)
  const [chartData, setChartData] = useState(chartDat.datum1[activeStep])
  const [chartDataVal, setChartDataVal] = useState(chartDat.datum2[activeStep])

console.log(activeStep)

  const nextStep = () => {
    setActiveStep(activeStep + 1)
    setChartData(chartDat.datum1[activeStep+1])
    setChartDataVal(chartDat.datum2[activeStep+1])
  }

  const prevStep = () => {
    setActiveStep(activeStep - 1)
    setChartData(chartDat.datum1[activeStep-1])
    setChartDataVal(chartDat.datum2[activeStep-1])
  }

  const totalSteps = steps.length

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`

  return (
    <div className='chart'>
          <h2 style={{ textAlign: "center", margin: '10px' , marginBottom:'31px'}}>Protocol Count</h2>
    <MainContainer>

      <StepContainer width={width}>
        {steps.map(({ step, label }) => (
          <StepWrapper key={step}>
            <StepStyle step={activeStep >= step ? 'completed' : 'incomplete'}>
              {activeStep > step ? (
                <CheckMark>L</CheckMark>
              ) : (
                <StepCount>{step}</StepCount>
              )}
            </StepStyle>
            <StepsLabelContainer>
              <StepLabel key={step}>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
      <ButtonsContainer>
        <button onClick={prevStep} disabled={activeStep === 0}>
          Prev. Layer
        </button>
        <button onClick={nextStep} disabled={activeStep === totalSteps}>
          Next Layer
        </button>
      </ButtonsContainer>
      
      <PieChart datum1={chartData} datum2={chartDataVal} step={activeStep}/>
    </MainContainer>
    </div>
  )
}

export default ProgressSteps