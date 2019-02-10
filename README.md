# WORD WELL

Word Well is an app for people looking to expand their vocabularies. You can get a random word to learn, or if there's a word you're struggling to learn, just type it into the search bar. You'll get the definition, an example, the etymology, and pronunciation of the word, and have the opportunity to save the word to study later.

## How to Use Word Well

### Heroku
Word Well is deployed at https://morning-caverns-88699.herokuapp.com/

### Run it Locally
From the root of the app directory, run `npm install` to install the node packages we use.

Remember to create `wordsDB` locally and add your MySQL editor password to `config.json`.

You will need to get credentials for the [Oxford Dictionary API](https://developer.oxforddictionaries.com/) and pass them to the app in a `.env` file:
    app_id=xxxxxxxx
    app_key=xxxxxxxxxxxxxxx

## Issues
The app prevents users from adding duplicate words; if the user tries to add a duplicate word from the search bar, they will be redirected to that word's page. However, if they try to add a duplicate word via the form, the duplicate word will not be added but the user receives no feedback.

There is also no method for updating a word, although it's relatively simple to delete it and re-add it using the search bar, then adjust the information in the form before submitting.
