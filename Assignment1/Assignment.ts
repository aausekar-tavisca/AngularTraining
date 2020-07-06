let someText = `some text
again and again. this is a sample text
we are using for this assignment
a cat goes up and up on a tree. a dog Is barking
some text again for the assignment`;

console.log("\n-------------Original Text--------------");
let text = someText.trim().split("\n");
text.forEach(display);

console.log("\n-------------Text in statement case--------------");
text.forEach(displayInStateMentCase);

console.log("\n-------------Number of words--------------");
printNumberOfWords(text);

console.log("\n-------------Following are the words contain 'a'--------------");
printWordWithSubString(text, "a");

console.log("\n-------------Matching words--------------");
displayNumberOfMatchingWords(text);
function displayInStateMentCase(line: string) {
  let newLine = "";
  let words = line.split(" ");
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    if (words[wordIndex] === "." || words[wordIndex].endsWith(".")) {
      newLine += " " + words[wordIndex];
      wordIndex++;
      if (wordIndex < words.length) {
        let newWord =
          words[wordIndex].charAt(0).toUpperCase() +
          words[wordIndex].substr(1).toLowerCase();
        newLine += " " + newWord;
      }
    } else {
      newLine += " " + words[wordIndex];
    }
  }
  console.log(newLine);
}

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
      if (word.includes(sub)) {
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
