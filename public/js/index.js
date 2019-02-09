// Get references to page elements
var $wordText = $("#word-text");
var $wordDefinition = $("#word-definition");
var $wordEtymology = $("#word-etymology");
var $wordPronunciation = $("#word-pronunciation");
var $wordComment = $("#word-comment");
var $submitBtn = $("#submit");
var $wordList = $("#word-list");
var $genRandom = $("#random-word");
var $searchField = $("#search-field");
var $searchBtn = $("#search-btn");
var $date = $("#currentDate");
var date = moment().format("MMM Do YY");
$date.html(date);

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
  getSearch: function(word) {
    return $.ajax({
      url: "api/search",
      type: "POST",
      data: { text: JSON.stringify(word) }
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

var handleSearchWord = function(event) {
  event.preventDefault();

  var searchTerm = $searchField.val().trim();

  API.getSearch(searchTerm).then(function(data) {
    if (data.status === "error") {
      $wordText.val("");
      $wordDefinition.val("");
      $wordEtymology.val("");
      $wordPronunciation.val("");
      $wordComment.val("");
      handleSearchWord();
    } else {
      $searchField.val("");
      $wordText.val(data.text);

      // if the word is getting pulled from the API, the definition is returned as an array
      // this code strings the definitions and examples together
      if ((data.definition).isArray) {
        var defString = "";
        if (data.definition.length === 1) {
          defString +=
            data.definition[0].definition +
            ", e.g., " +
            data.definition[0].examples;
        } else {
          for (var i = 0; i < data.definition.length; i++) {
            defString +=
              (i + 1).toString() +
              ": " +
              data.definition[i].definition +
              ", e.g., " +
              data.definition[i].examples +
              "; " +
              "\n";
          }
        }

        $wordDefinition.val(defString);
      } else {
        // if the word was already in the DB, it will be returned as a ready-to-use string
        $wordDefinition.val(data.definition);
      }

      // $wordDefinition.val(data.definition);
      $wordEtymology.val(data.etymology);
      $wordPronunciation.val(data.pronunciation);
    }
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

$genRandom.on("click", function(event) {
  event.preventDefault();
  randomWordGenerator();
});

$searchBtn.on("click", handleSearchWord);

// get the data from the dictionary API and fill the submit form
randomWordGenerator = function() {
  API.getRandom().then(function(data) {
    //if error occurred  clears fields from previous word and call handleRandomWord function for get a new word.
    if (data.status === "error") {
      // alert("bugs!!!!")
      $wordDefinition.val("");
      $wordEtymology.val("");
      $wordPronunciation.val("");
      // handleRandomWord(event);
      randomWordGenerator();
    }

    $wordText.val(data.text);

    // stringing together definition with example
    var defString = "";
    if (data.definition.length === 1) {
      defString +=
        data.definition[0].definition +
        ", e.g., " +
        data.definition[0].examples;
    } else {
      for (var i = 0; i < data.definition.length; i++) {
        defString +=
          (i + 1).toString() +
          ": " +
          data.definition[i].definition +
          ", e.g., " +
          data.definition[i].examples +
          "; " +
          "\n";
      }
    }

    $wordDefinition.val(defString);
    $wordEtymology.val(data.etymology);
    $wordPronunciation.val(data.pronunciation);
  });
};

// generate a random word on loading the page
// randomWordGenerator();
