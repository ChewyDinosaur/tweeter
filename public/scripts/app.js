/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  for (let i in tweets) {
    const currentTweet = createTweetElement(tweets[i]);
    $('.tweet-container').prepend(currentTweet);
  }
}

function createTweetElement(tweetData) {
  const article =  $('<article>').addClass('tweet');
  const header = $('<header>').html(`<img src="${tweetData.user.avatars.small}"><h3>${tweetData.user.name}</h3><p>${tweetData.user.handle}</p>`);
  const content = $('<p>').addClass('tweet-content').text(`${tweetData.content.text}`);
  const footer = $('<footer>').html(`<span>${tweetData.created_at}</span><span class="tweet-icons"><i class="fas fa-flag icons"></i><i class="fas fa-retweet icons"></i><i class="fas fa-heart icons"></i></span>`);
  return $(article).append(header).append(content).append(footer);
}

function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
    console.log('Success: ', tweets);
    renderTweets(tweets);
  });
}

function invalidTweet() {
  const input = $('#new-tweet-textarea').val();
  if (input === '') { 
    return 'Tweet text is empty!';
  } else if (input.length > 140) {
    return 'Tweet is over 140 characters!';
  } else {
    return false;
  }
}



$(function(){

  $('#tweet-submit').on('submit', function (event) {
    event.preventDefault();
    const text = $(this).serialize();
    $('#tweet-error').slideUp(function() {
      if (!invalidTweet()) {
        $.ajax('/tweets', {method: "POST", data: text})
        .then(function() {
          console.log('Success');
          $('#new-tweet-textarea').val('');
          loadTweets();
        });
      } else {
        const error = invalidTweet();
        $('#tweet-error').text(error).slideDown();
      }
    });
  });

  $('#compose-btn').click(function(e) {
    $('.new-tweet').slideToggle('slow', function() {
      $('#new-tweet-textarea').focus();
    });
  });

  loadTweets();
});