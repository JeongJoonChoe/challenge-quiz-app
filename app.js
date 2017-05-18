//single global state object
var pageState = {
	questionList: [
		{question:'What is the main ingredient in Tteok-bokki?',
		a:'beef',
		b:'fish cake',
		c:'rice cake',
		d:'seaweed', 
		correctAnswer:'c'} ,	
		{question:"On Valentine's day in South Korea, single people are known to eat which korean dish?",
		a:'soju',
		b:'black bean noodle',
		c:'Fried dumplings',
		d:'short-rib stew',
		correctAnswer:'b'},
		{question:"As a celebration of the New Year, Korean people traditionally eat which soup?",
		a:'rice cake soup',
		b:'spicy beef and vegetable soup',
		c:'spicy chicken soup',
		d:'soybean sprout soup',
		correctAnswer:'a'},
		{question:"Korean people traditionally eat which soup on their birthday?:",
		a:'potato soup',
		b:'seaweed soup',
		c:'kimchi soup',
		d:'soybean paste soup',
		correctAnswer:'b'},
		{question:"Which korean bbq dish is this?",
		a:'pork belly',
		b:'brisket',
		c:'beef tongue',
		d:'boneless short rib',
		image:'http://scontent.cdninstagram.com/t51.2885-15/s480x480/e15/11326600_493692074115369_1119236344_n.jpg?ig_cache_key=NDI1NjU2NDQ2NDI2MTgyNTc5.2',
		correctAnswer:'d'},
		],
	pageCount:0,
	correct:0,
	incorrect:0,
	correctPhrase:'Correct',
	incorrectPhrase:'Incorrect <br>The correct answer was'
}


var resultTemplate = (
			'<div class="outcome-container">'+
			'<h2> Incorrect <br>The correct answer was [b]</h2>'+
			'<button class="start-button" id="next-page">Next</button>'+
		'</div>')


var endPageTemplate = (
	'<div class="header-button-container">'+
		'<h1><em>Congratulations!</em> <br>You got 3 out of 5 correct answers</h1>'+ 
		'<div> Would you like to try again?'+
			'<button id="yes">yes</button>'+
			'<button id="no">no</button>'+
		'<footer>Written and coded by Jeong Joon "Peter" Choe</footer>'+
	'</div>')

var questionTemplate = (
	'<div class="page-counter"><p>Question 1 out of 5</p></div>'+
			'<div class="question-container">'+
				'<h2 class="question-header">Which Korean dish is this?</h2>'+
				'<div class="answer-image-container">'+
					'<ul class="answer-choices">'+
						'<li class="answer-choice"><button class="answer-button" id="a"></button><label for="#a">a.<span class="answer-a"> kimchi</span></label></li>'+
						'<li class="answer-choice"><button class="answer-button" id="b"></button><label for="#b">b.<span class="answer-b"> bibimbap</span></label></li>'+
						'<li class="answer-choice"><button class="answer-button" id="c"></button><label for="#c">c.<span class="answer-c"> naengmyun</span></label></li>'+
						'<li class="answer-choice"><button class="answer-button" id="d"></button><label for="#d">d.<span class="answer-d"> galbi</span></label></li>'+
					'</ul>'+
					'<img src="http://www.rcsinteriors.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/g/lgr-light-grey_8.jpg" alt="" class="img-style">'+
				'</div>'+
			'</div>'+
			'<div class="results"><p>Current score: 1 correct 0 incorrect</p></div>'+
	'</div>')
//state management
function incrementByOne(state, item) {
	state[item]++;
}
function resetState(state,item) {
	state[item] = 0;
}
//DOM manipulation



//Event Listeners
