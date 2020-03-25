/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
  content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
  created_at: 1461116232227
}

const renderTweets = function(tweets) {
  // loops through tweets
  $.each(tweets, function(index, articleObj) {
    $('.tweet').append(createArticle(articleObj));
  });
  
  // calls createTweetElement for each tweet

  // takes return value and appends it to the tweets container
}

$(document).ready(function() {
  
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

  //  const $tweet = createTweetElement(tweetData);

  //   // Test / driver code (temporary)
  //   console.log($tweet); // to see what it looks like
  //   $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

renderTweets(data);

