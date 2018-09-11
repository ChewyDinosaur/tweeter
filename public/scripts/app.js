/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function(){

  function renderTweets(tweets) {
    for (let i in tweets) {
      const currentTweet = createTweetElement(tweets[i]);
      $('.tweet-container').append(currentTweet);
    }
  }
  

  function createTweetElement(tweetData) {
    const parent =  $('<article>').addClass('tweet');
    const header = $('<header>').html(`<img src="${tweetData.user.avatars.small}"><h3>${tweetData.user.name}</h3><p>${tweetData.user.handle}</p>`);
    const content = $('<p>').addClass('tweet-content').html(`${tweetData.content.text}`);
    const footer = $('<footer>').html(`<span>${tweetData.created_at}</span><span class="tweet-icons"><i class="fas fa-flag icons"></i><i class="fas fa-retweet icons"></i><i class="fas fa-heart icons"></i></span>`);
    return $(parent).append(header).append(content).append(footer);
  }


  $('#tweet-submit').on('submit', function (event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    const text = $(this).serialize();
    $.ajax('/tweets', {method: "POST", data: text})
    .then(function() {
      console.log('Success');
    });
  });

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      console.log('Success: ', tweets);
      renderTweets(tweets);
    });
  }

  loadTweets();
});