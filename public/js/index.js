// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

var $wordText = $("#word-text");
var $wordDefinition = $("#word-definition");
var $wordEtymology = $("#word-etymology");
var $wordPronunciation = $("#word-pronunciation");
var $wordComment = $("#word-comment");
var $submitBtn = $("#submit");
var $wordList = $("#word-list");

// The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

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

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

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

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

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

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteWord(idToDelete).then(function() {
    refreshWords();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
$submitBtn.on("click", handleFormSubmit);
$wordList.on("click", ".delete", handleDeleteBtnClick);
