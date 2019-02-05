// Get references to page elements
var $wordText = $("#word-text");
var $wordDefinition = $("#word-definition");
var $wordEtymology = $("#word-etymology");
var $wordPronunciation = $("#word-pronunciation");
var $wordComment = $("#word-comment");
var $submitBtn = $("#submit");
var $wordList = $("#word-list");
var $genRandom = $("#random-word");

var API = {
  saveWord: function(word) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/words",
      data: JSON.stringify(word)
    });
  },
  getRandom: function() {
    return $.ajax({
      url: "api/random",
      type: "GET"
    });
  },
  getWords: function() {
    return $.ajax({
      url: "api/words",
      type: "GET"
    });
  },
  deleteWord: function(id) {
    return $.ajax({
      url: "api/words/" + id,
      type: "DELETE"
    });
  }
};

var refreshWords = function() {
  API.getWords().then(function(data) {
    var $words = data.map(function(word) {
      var $a = $("<a>")
        .text(word.text)
        .attr("href", "/word/" + word.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": word.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $wordList.empty();
    $wordList.append($words);
  });
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var word = {
    text: $wordText.val().trim(),
    definition: $wordDefinition.val().trim(),
    etymology: $wordEtymology.val().trim(),
    pronunciation: $wordPronunciation.val().trim(),
    comment: $wordComment.val().trim()
  };

  if (!(word.text && word.definition)) {
    alert("You must enter a word and definition!");
    return;
  }

  API.saveWord(word).then(function() {
    refreshWords();
    $wordText.val("");
    $wordDefinition.val("");
    $wordEtymology.val("");
    $wordPronunciation.val("");
    $wordComment.val("");
  });
};

var handleRandomWord = function(event) {
  event.preventDefault();

  // get the data from the dictionary API and fill the submit form
  API.getRandom().then(function(data) {
    //if error occurred  alert user (alert is a place holder...)
    if(data.status === 'error'){
      alert("Error occured try again");
    }

    $wordText.val(data.text);

    // stringing together definition with example
    var defString = "";
    if (data.definition.length === 1) {
      defString += data.definition[i].definition + " (ex: " + data.definition[i].examples + ")";
    } else {
        for (var i = 0; i < data.definition.length; i++) {
          defString += "Def #" + (i+1).toString() + ": " + data.definition[i].definition + " (ex: " + data.definition[i].examples + "); ";
        }
    }

    $wordDefinition.val(defString);
    $wordEtymology.val(data.etymology);
    $wordPronunciation.val(data.pronunciation);
  });
}

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteWord(idToDelete).then(function() {
    refreshWords();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$wordList.on("click", ".delete", handleDeleteBtnClick);

$genRandom.on("click", handleRandomWord);