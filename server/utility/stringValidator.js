function isAlphanumericWithSpaces(str) { // Regular expression pattern to match alphanumeric characters and spaces
    var patternToMatch = /^[a-zA-Z0-9\s]*$/;

    return patternToMatch.test(str);
}


function isNumeric(str) {
    var patternToMatch = /^[0-9]*$/;

    return patternToMatch.test(str);
}

module.exports = {
    isAlphanumericWithSpaces,
    isNumeric
};
