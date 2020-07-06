var someText = "some text.\nagain and again. this is a sample text.\nwe are using for this assignment.\na cat goes up and up on a tree. a bog is barking.\nsome text again for the assignment";
var text = someText.split("\n");
text.forEach(display);
console.log("-------------Number of words--------------");
printNumberOfWords(text);
console.log("-------------Number of words--------------");
console.log("Following are the words contain 'a'");
printWordWithSubString(text, "a");
console.log("-------------Matching words--------------");
displayNumberOfMatchingWords(text);
function displayInStateMentCase(line) { }
function display(line) {
    console.log(line);
}
function printNumberOfWords(text) {
    var counter = 0;
    for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
        var line = text_1[_i];
        var words = line.split(" ");
        counter += words.length;
    }
    console.log("Number of words: " + counter);
}
function printWordWithSubString(text, sub) {
    for (var _i = 0, text_2 = text; _i < text_2.length; _i++) {
        var line = text_2[_i];
        var words = getWords(line);
        for (var _a = 0, words_1 = words; _a < words_1.length; _a++) {
            var word = words_1[_a];
            if (word.includes(sub)) {
                console.log(word);
            }
        }
    }
}
function displayNumberOfMatchingWords(text) {
    var dictionary = new Object();
    for (var _i = 0, text_3 = text; _i < text_3.length; _i++) {
        var line = text_3[_i];
        var words = getWords(line);
        for (var _a = 0, words_2 = words; _a < words_2.length; _a++) {
            var word = words_2[_a];
            if (dictionary[word] === undefined) {
                dictionary[word] = 1;
            }
            else {
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
function getWords(line) {
    return line.replace(".", "").split(" ");
}
