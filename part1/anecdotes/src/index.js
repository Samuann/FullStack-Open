import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  const {clickHandler, buttonText} = props;

  return (
    <button onClick={clickHandler}> {buttonText} </button>
  )
};

const Header = (props) => {
  const {headerTitle} = props;

  return <h2>{headerTitle}</h2>
};

const Counter= (props) => {
  const {voteCount} = props;

  return <p> has {voteCount}</p>
};

const MostVotes = (props) => {
  const {votes, anecdotes} = props
  const arrayElement = votes.indexOf(Math.max(...votes))
  
  return (
    <div>
      <p> {anecdotes[arrayElement]}</p>
      <p> has {votes[arrayElement ]}</p>
    </div>
  )
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0));

  const handleVoteIncrement = () => {
    const initialVotes = [...votes];
    initialVotes[selected] += 1;
    return setVotes(initialVotes);
  };

  const handleRandomSelection = () => {
    const selectedAnecdotes = Math.floor(Math.random() * anecdotes.length);
    return setSelected(selectedAnecdotes)
  };

  return (
    <>
      <div>
        <Header headerTitle='Anecdotes for the day'/>
        <div>
          {props.anecdotes[selected]}
        </div>
        <Counter voteCount={votes[selected]}/>
        <Button 
        buttonText='votes'
        clickHandler={handleVoteIncrement}/>
        <Button 
        buttonText='next anecdotes' 
        clickHandler={handleRandomSelection}/>
      </div>
      <div>
        <Header headerTitle='Anecdotes with most votes'/>
        <MostVotes votes={votes} anecdotes={anecdotes}/>
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)