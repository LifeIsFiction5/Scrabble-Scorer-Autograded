// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 


//**IMPORTS**
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. // 

let wordInput; //initialized outside of the function so scope isn't limited

function initialPrompt() {
   wordInput = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
        return wordInput;
}; 

//initialPrompt function will ask the user what word they would like entered.

let newPointStructure = transform(oldPointStructure);

// store the new point structure through calling the transform function and using the oldPointStructure as an argument

let simpleScorer = function(simpleWord){
   return simpleWord.length;
};

//simplescorer returns the length of the entered word, equal to each letter equalling 1 point.

let vowelBonusScorer = function(wordInput){
   let vowels = "aeiou";
   let vowelScore = 0; //store the vowelScore at zero in order to add onto it as vowels are found.

   for (let i=0; i < wordInput.length; i++) { 
      let letter = wordInput[i];
      if (vowels.includes(letter.toLowerCase())) { //use the .includes() method in order to see if any vowels are present in the input
         vowelScore += 3; //add 3 points per vowel
      } else {
         vowelScore++; //add 1 point per letter
      }
   }
return vowelScore;
};

let scrabbleScorer = function(wordInput){
   wordInput = wordInput.toLowerCase();
   let score = 0;

   for (i=0; i < wordInput.length; i++) {
     
      let letter = wordInput[i] 
      if (letter in newPointStructure) {
         score += newPointStructure[letter]; //access new point structure at the key of the letter, score gives the value.  If checking for key, a value is returned
      } 
   };
   return score;
};

const scoringAlgorithms = [
   {
      name: 'Simple',
      description: 'Each letter is worth 1 point',
      scorerFunction: simpleScorer
   },
   {
      name: 'Vowel Bonus',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
let numInput = Number(input.question(`Which scoring algorithm you'd like to use?
  
0- ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
1- ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
2- ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
 
Enter 0, 1 or 2: `))

if (numInput <= 2) {
   console.log(`${wordInput} is worth ${scoringAlgorithms[numInput].scorerFunction(wordInput)} points!`)
} else {
   console.log("Please enter a value between 0 and 2.");
   scorerPrompt();
}
};

//wanted to keep the code mutable in this section in case the scoring algorithms change.  Template literals keep it mutable.  No hard coded values.

//"in" iterates over the values of a key

function transform(oldPointsObj) {
   let newPointsObj = {}; //an empty object is created to store the data
  for (let i in oldPointsObj) { //grab each array at index position
    let letterArrays = oldPointsObj[i]; 
    for(let j in letterArrays){ //loop through array of letters we got at each index. make the value = the number the outer loop is on (i)
      let letters = letterArrays[j]; //letters is assigned the value at the current index of 'letterArrays'.
    newPointsObj[letters.toLowerCase()] = Number(i);  //Fill the newPointsObj, allow the letters to be keys, and number to be values
      
    }  //each index of j will be a different letter
  }
  return newPointsObj; //returns the  newPointsObj' object, which contains the transformed data.
};

//functions, formatting

function runProgram() {
   initialPrompt();
   scorerPrompt();
}







// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
