import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
  const {clickHandleName, cssClassName, text} = props
  return <button className={cssClassName} onClick={clickHandleName}>{text}</button>
}

const Statistic = (props) => {
  const {text, value} = props
  return (
    <tbody>
      <tr>
        <td> {`${text}:`}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedbackNumber = () => setGood(good + 1);
  const handleNeutralFeedbackNumber = () => setNeutral(neutral + 1);
  const handleBadFeedbackNumber = () => setBad(bad + 1);
  const displayTotalNumberFeedback = () => good + neutral + bad;

  const displayAverage = () => displayTotalNumberFeedback() > 0 ? ((good - bad)/(displayTotalNumberFeedback())): 0;

  const displayPositivePercent = () => displayTotalNumberFeedback() > 0 ? 
  `${(good / displayTotalNumberFeedback()) * 100} %` : 0;

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
        <table className='unicafe-stat-list'>
          <Statistic text='Good' value={good}/>
          <Statistic text='Neutral' value={neutral}/>
          <Statistic text='Bad' value= {bad}/>
          <Statistic text='All' value={displayTotalNumberFeedback()} />
          <Statistic text='Average' value={displayAverage()} />
          <Statistic text='Positive' value={displayPositivePercent()} />  
        </table>
      </section>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
