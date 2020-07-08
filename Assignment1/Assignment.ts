class KeyValuePair {
  constructor(public Key: string, public Value: number) {}
}
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
    if (
      words[wordIndex] === "." ||
      words[wordIndex].charAt(words[wordIndex].length - 1) === "."
    ) {
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
      if (word.search(sub) !== -1) {
        console.log(word);
      }
    }
  }
}

function displayNumberOfMatchingWords(text: string[]) {
  let dictionary = new Array<KeyValuePair>();
  for (let line of text) {
    let words = getWords(line);
    for (let word of words) {
      let pairIndex = dictionary.findIndex((p) => p.Key === word);
      if (pairIndex == -1) {
        dictionary.push(new KeyValuePair(word, 1));
      } else {
        dictionary[pairIndex].Value += 1;
      }
    }
  }

  for (let pair of dictionary) {
    if (pair.Value > 1) {
      console.log("'" + pair.Key + "' occurs " + pair.Value + " times.");
    }
  }
}

function getWords(line: string): string[] {
  return line.replace(".", "").split(" ");
}
