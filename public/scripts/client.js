/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// THIS FUNCTION WILL CREATE THE HTML ELEMENTS FOR A NEW TWEET
// TEMPLATE STILL SAVED AND COMMENTED IN INDEX.HTML
const createTweetElement = function(tweetObj) {
  
  // create the HTML for one article object
  let $tweet = $('<article>').addClass('tweet');

  // create the header part of the tweet article - avatar, name and username
  let $divHeader = $('<div>').addClass('single-tweet-header');
  let $divHeaderAvatarAndName = $('<div>');
    $('<img>')
      .addClass('avatar')
      .attr('src', tweetObj.user.avatars)
      .appendTo($divHeaderAvatarAndName);
    $('<span>')
      .text(tweetObj.user.name)
      .appendTo($divHeaderAvatarAndName);
  let $divHeaderUsername = $('<div>');
    $('<span>')
      .addClass('single-tweet-Username')
      .text(tweetObj.user.handle)
      .attr('href', '#')
      .appendTo($divHeaderUsername);
  // create the text area where the tweet text is attached to
  let $tweetText = $('<p>').text(tweetObj.content.text);
  // create the footer part of the tweet article - date, and buttons
  let $divFooter = $('<div>').addClass('single-tweet-footer');
    $('<span>')
      .text(moment(tweetObj.created_at).startOf('day').fromNow())
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
  
  // this closes all elements appenddint to its parent
  $divHeaderAvatarAndName.appendTo($divHeader);
  $divHeaderUsername.appendTo($divHeader);
  $divHeader.appendTo($tweet);
  $tweetText.appendTo($tweet);
  $linkIconFavorite3.appendTo($divFooterIcons);
  $linkIconShare2.appendTo($divFooterIcons);
  $linkIconFlag1.appendTo($divFooterIcons);
  $divFooterIcons.appendTo($divFooter);
  $divFooter.appendTo($tweet);

  // return final tweet element
  return $tweet;
};


// FUNCTION TO RENDER ALL NEW TWEET TEXT COMMING FROM THE TEXT AREA
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').empty();
  $.each(tweets, function(index, tweetObj) {
    $('#tweets-container').prepend(createTweetElement(tweetObj));
  });
};

// FUNCTION DEALS WITH THE GET REQUEST OF SAVED TWEETS RENDERING TO TIMELINE
const requestTweets = (url) => {
  // issue the request with jQuery Ajax
  $.ajax({
    method: "GET",
    url
  })
    .done(function(result) {
      // Success. Getting the result from the request
      renderTweets(result);
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

// FUNCTION TO POST ALL NEW TWEET WROTE IN TEXT AREA
const postTweets = function() {
  // event listener for click on the link
  $('#submit-tweet').submit(function(event) {
    // prevent the default behavior of the link
    event.preventDefault();
    const tweetTextArea = $('#tweet-text').val();

    // in case of errors - empty text area, null or over the count limit
    if (tweetTextArea === "" || tweetTextArea === null) {
      $('#error-addText').slideDown("slow");
      $("#submit-tweet").click(function() {
        $('#error-addText').hide();
      });
    } else if (tweetTextArea.length > 140) {
      $('#error-overCount').slideDown("slow");
      $("#submit-tweet").click(function() {
        $('#error-overCount').hide();
      });
    } else {
      // if all is good then post tweet and clean text area
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $(this).serialize()
      }).then(function(submitTweet) {
        console.log('Success: ', submitTweet);
        requestTweets('/tweets');
      });
      $("#tweet-text").val('');
      $('.counter').text(140);
    }
  });
};

// WHEN DOCUMENT IS READY DO THE FOLLOWING
$(document).ready(function() {
  // hide alerts and tweet box
  $('#error-addText').hide();
  $('#error-overCount').hide();
  $('.new-tweet').hide();

  // show tweet box on click
  $(".call-to-action").click(function() {
    $('.new-tweet').show();
  });

  // load tweets to timeline
  requestTweets('/tweets');
  // post new tweets to timeline
  postTweets();
});