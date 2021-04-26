import React, { useEffect } from "react";
import './App.css';
import { useState } from 'react';
import colorsArray from './colorsArray'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from  '@fortawesome/free-brands-svg-icons'


let quoteDBUrl="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setquote] = useState("Life isn’t about getting and having, it’s about giving and being.");
  const [author, setAuthor] = useState("Kevin Kruse");
  const [randomNumbers, setRandomNumber] = useState(0);
  const [quotesArray,setquotesArray]=useState(null)
 const [accentColor,setAccentColor]=useState('#282c34')

  const fetchQuotes =async(url) =>{
    const response=await fetch(url)
    const parsedJSON= await response.json()
    setquotesArray( parsedJSON.quotes)
  }

  useEffect(()=>{
    fetchQuotes(quoteDBUrl)
  },[ ])
 
  const generateRandomNumber = () => {
    let randomInteger = (Math.floor(quotesArray.length * Math.random()))
    setRandomNumber(randomInteger)
    setAccentColor(colorsArray[randomInteger])
    setquote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  return (
    <div className="App">
      
      <header className="App-header" style={{backgroundColor:accentColor}}>
      <h1 className="machine"> Random Quote Machine</h1>
        <div id="quote-box" style={{color:accentColor}}>
          
        <h1 className="Random">Random number:{randomNumbers}</h1>
      
        <p id="text">
          "{quote}"
        </p>
        <p id="author">-{author}</p>
        <button  id="new-quote"  style={{backgroundColor:accentColor}} onClick={generateRandomNumber}>
          Generate A RandomNumber
        </button>
        <div className="button">
        <a id="tweet-quote"  style={{backgroundColor:accentColor}} href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a></div>
        </div>
      </header>
    </div>
  );
}

export default App;
