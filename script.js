//import data from 'https://raw.githubusercontent.com/justinmuskopf/Quotes/master/quotes.json';
//import data from 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			quotesData: [],
			quotesLength: 0,
			currQuote: "The initial quote will be blank.",
			currAuthor: "The initial author will be blank."
		};
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
	}
	componentDidMount() {
		//console.log ("Component Did Mount: ");
		fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(response => {
			return response.json();
		}).then(myJson => {
			//console.log (JSON.stringify(myJson))
			myJson = (JSON.stringify(myJson));
			if (typeof myJson === 'string') {
				myJson = JSON.parse(myJson);
				this.setState({
					quotesData: myJson,
					quotesLength: myJson.quotes.length,
					currQuote: "This is the new quote.",
					currAuthor: "This is the new author."
				});
				//console.log ("The array length is: " + this.state.quotesLength);
				//console.log(myJson); //Too much data.
				//console.log(myJson.quotes[1].quote); //This works
				//console.log(myJson.quotes[1].author); //This works
				//console.log(this.state.quotesData); //Too much data.
				//console.log(this.state.currQuote); //This works
				//console.log(this.state.currAuthor); //This works
				this.getRandomQuote();
			} else {
				console.log("Error loading JSON file.")
			}
		});
	}
	getRandomQuote() {
		//console.log ("The array length is: " + this.state.quotesLength);
		var randomNum = Math.floor((Math.random() * this.state.quotesLength) + 1);
		//console.log(randomNum);
		//console.log(this.state.quotesData.quotes[randomNum].quote);
		//console.log(this.state.quotesData.quotes[randomNum].author);
		this.setState({
			currQuote: this.state.quotesData.quotes[randomNum].quote,
			currAuthor: this.state.quotesData.quotes[randomNum].author,
		});   
	}
  
  tweetQuote() {
    //var uri = this.state.currQuote + " - " + this.state.currAuthor;
    //var res = encodeURIComponent(uri);           
    //window.open("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + res);
    //return false;
  }
  
	render() {
    var uri = this.state.currQuote + " - " + this.state.currAuthor;
    var res = encodeURIComponent(uri); 
    
    
		//console.log ("Render: ");
		return ( <div id="content">
                <h1>Random Quote Machine</h1>
                <div id="quote-box">
                  <div id="text">“{this.state.currQuote}”</div>
                  <div id="author">-{this.state.currAuthor}</div>
                  <button id="new-quote" onClick={this.getRandomQuote}>New Quote</button>
                  <a id="tweet-quote" href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" target="_blank"></a>
                  <a id="tweet-quote2" onClick={this.tweetQuote} href="#">Tweet Quote</a> 
                  
                  <a id="tweet-quote3" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + res} target="_blank"> #3</a>
                </div>
            </div> );
	}
}
ReactDOM.render( < Application / > , document.getElementById('app'));
