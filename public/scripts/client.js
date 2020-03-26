/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  $('#tweets-container').empty();
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

const postTweets = function() {
  // event listener for click on the link
  $('#submit-tweet').submit(function(event) {
    // defaut the default behavior of the link
    event.preventDefault();
    const tweetTextArea = $('#tweet-text').val();

    if (tweetTextArea === "" || tweetTextArea === null) {
      //alert("Please add some text!");
      $('#error-addText').slideDown( "slow");
      $("#submit-tweet").click(function(){
        $('#error-addText').hide();
      });
    } else if (tweetTextArea.length > 140) {
      //alert("Your tweet is too long! Please make it shorter!");
      $('#error-overCount').slideDown( "slow");
      $("#submit-tweet").click(function(){
        $('#error-overCount').hide();
      });
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $(this).serialize()
      }).then(function (submitTweet) {
        console.log('Success: ', submitTweet);
        requestTweets('/tweets');
      });
      $("#tweet-text").val('');
    }
  });

}

$(document).ready(function() {
  $('#error-addText').hide();
  $('#error-overCount').hide();
  requestTweets('/tweets');
  postTweets();
});