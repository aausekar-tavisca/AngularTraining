let someText = `some text.
again and again. this is a sample text.
we are using for this assignment.
a cat goes up and up on a tree. a bog is barking.
some text again for the assignment`;

console.log("\n-------------Original Text--------------");
let text = someText.split("\n");
text.forEach(display);

console.log("\n-------------Number of words--------------");
printNumberOfWords(text);

console.log("\n-------------Following are the words contain 'a'--------------");
printWordWithSubString(text, "a");

console.log("\n-------------Matching words--------------");
displayNumberOfMatchingWords(text);
function displayInStateMentCase(line: string) {}

function display(line: string) {
  console.log(line);
}

function printNumberOfWords(text: string[]) {
  let counter = 0;
  for (let line of text) {
    let words = line.split(" ");
    counter += words.length;
  }
  console.log("Number of words: " + counter);
}

function printWordWithSubString(text: string[], sub: string) {
  for (let line of text) {
    let words = getWords(line);
    for (let word of words) {
      if (word.indexOf(sub) !== -1) {
        console.log(word);
      }
    }
  }
}

function displayNumberOfMatchingWords(text: string[]) {
  let dictionary = new Object();
  for (let line of text) {
    let words = getWords(line);
    for (let word of words) {
      if (dictionary[word] === undefined) {
        dictionary[word] = 1;
      } else {
        dictionary[word] += 1;
      }
    }
  }
  Object.keys(dictionary).forEach(function (key) {
    if (dictionary[key] > 1) {
      console.log("'" + key + "' occurs " + dictionary[key] + " times.");
    }
  });
}

function getWords(line: string): string[] {
  return line.replace(".", "").split(" ");
}
