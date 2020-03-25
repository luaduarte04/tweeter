/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const createTweetElement = function(tweetObj) {
  // create the HTML for one article object

  let $tweet = $('<article>').addClass('tweet');

  let $divHeader = $('<div>').addClass('single-tweet-header');
  let $divHeaderAvatarAndName = $('<div>');
    $('<img>')
      .addClass('avatar')
      .attr('src', tweetObj.user.avatars)
      .appendTo($divHeaderAvatarAndName);
    $('<span>')
      .addClass('single-tweet-name')
      .text(tweetObj.user.name)
      .appendTo($divHeaderAvatarAndName);
  let $divHeaderUsername = $('<div>');
    $('<span>')
    .addClass('single-tweet-Username')
    .text(tweetObj.user.handle)
    .attr('href', '#')
    .appendTo($divHeaderUsername);
  let $tweetText = $('<p>').text(tweetObj.content.text);
  let $divFooter = $('<div>').addClass('single-tweet-footer');
    $('<span>')
    .text(tweetObj.created_at)
    .appendTo($divFooter);
    let $divFooterIcons = $('<div>');
      let $linkIconFlag1 = $('<a>').attr('href', '#');
        $('<span>')
        .addClass('material-icons')
        .text('flag')
        .appendTo($linkIconFlag1);
      let $linkIconShare2 = $('<a>').attr('href', '#');
        $('<span>')
        .addClass('material-icons')
        .text('share')
        .appendTo($linkIconShare2);
      let $linkIconFavorite3 = $('<a>').attr('href', '#');
        $('<span>')
        .addClass('material-icons')
        .text('favorite')
        .appendTo($linkIconFavorite3);
      
  $divHeaderAvatarAndName.appendTo($divHeader);
  $divHeaderUsername.appendTo($divHeader);
  $divHeader.appendTo($tweet);
  $tweetText.appendTo($tweet);
  $linkIconFavorite3.appendTo($divFooterIcons);
  $linkIconShare2.appendTo($divFooterIcons);
  $linkIconFlag1.appendTo($divFooterIcons);
  $divFooterIcons.appendTo($divFooter);
  $divFooter.appendTo($tweet);

  return $tweet;
}

const renderTweets = function(tweets) {
  // loops through tweets 
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  $.each(tweets, function(index, tweetObj) {
    $('#tweets-container').prepend(createTweetElement(tweetObj));
  });
}

const requestTweets = (url) => {
  // issue the request with jQuery Ajax
  $.ajax({
    method: "GET",
    url
  })
    .done(function(result) {
      // Success. Getting the result from the request
      renderTweets(result);;
    })
    .fail(function(error) {
      // Problem with the request
      console.log(`Error with the request: ${error.message}`);
    })
    .always(function() {
      // This will always run
      console.log('request completed');
    });
};

$(document).ready(function() {
  requestTweets('/tweets');

  // event listener for click on the link
  $('#submit-tweet').submit(function(event) {
    // defaut the default behavior of the link
    event.preventDefault();
    console.log($(this).serialize());
    if ($(this).serialize() === "text=" || $(this).serialize() === null) {
      alert("Please add some text!");
    } else {
      $(this).serialize();
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $(this).serialize()
      }).then(function (submitTweet) {
        console.log('Success: ', submitTweet);
      });
    }
  });
});