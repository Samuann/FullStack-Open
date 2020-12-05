import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
  const {clickHandleName, cssClassName, text} = props
  return <button className={cssClassName} onClick={clickHandleName}>{text}</button>
};

const Statistic = (props) => {
  const {text, value} = props
  return (
    <>
      <tr>
        <td> {`${text}:`}</td>
        <td>{value}</td>
      </tr>
    </>
  ) 
};

const Statistics = (props) => {
  const {
    goodValue, neutralValue,
    badValue, totalValue,
    averageValue,positiveValue
  } = props

  return (
    <tbody>
      <Statistic text='Good' value={goodValue}/>
      <Statistic text='Neutral' value={neutralValue}/>
      <Statistic text='Bad' value= {badValue}/>
      <Statistic text='All' value={totalValue} />
      <Statistic text='Average' value={averageValue} />
      <Statistic text='Positive' value={positiveValue}/>  
    </tbody>
  )
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedbackNumber = () => setGood(good + 1);
  const handleNeutralFeedbackNumber = () => setNeutral(neutral + 1);
  const handleBadFeedbackNumber = () => setBad(bad + 1);
  const displayTotalFeedbackNumber = () => good + neutral + bad;

  const displayAverage = () => displayTotalFeedbackNumber() > 0 ? ((good - bad)/(displayTotalFeedbackNumber())): 0;

  const displayPositivePercent = () => displayTotalFeedbackNumber() > 0 ? 
  `${(good / displayTotalFeedbackNumber()) * 100} %` : 0;

  return (
    <div className='unicafe-wrapper'>
      <section className='unicafe-feedback'>
        <h1 className='unicafe-header'>Give Feedback</h1>
        <div className='unicafe-button-wrapper'>
          <Button cssClassName='unicafe-button button-good' clickHandleName={handleGoodFeedbackNumber}  text='Good'/>
          <Button cssClassName='unicafe-button button-neutral' clickHandleName={handleNeutralFeedbackNumber} text='Neutral' />
          <Button cssClassName='unicafe-button button-bad' clickHandleName={handleBadFeedbackNumber} text='Bad' />
        </div>
      </section>
      <section className='unicafe-stats'>
        <h1 className='unicafe-header'>Statistics</h1>
        {displayTotalNumberFeedback() > 0 ? (
          <table className='unicafe-stat-list'>
            <Statistics 
              goodValue={good}
              neutralValue={neutral} 
              badValue={bad} 
              totalValue={displayTotalNumberFeedback()}
              averageValue={displayAverage()}
              positiveValue={displayPositivePercent()}
            /> 
        </table>
        ): (<p className='unicafe-no-feedback'>No feedback given</p>)}
      </section>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
