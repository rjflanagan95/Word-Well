// Get references to page elements
var $wordText = $("#word-text");
var $wordDefinition = $("#word-definition");
var $wordEtymology = $("#word-etymology");
var $wordPronunciation = $("#word-pronunciation");
var $wordComment = $("#word-comment");
var $submitBtn = $("#submit");
var $wordList = $("#word-list");

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
