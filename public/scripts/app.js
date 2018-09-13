
function likeTweet(event) {
  const targetTweet = event.target;
  const tweetID = $(targetTweet).data('id');
  let data = { id: tweetID };
  // Change the style of the heart icon
  if ($(targetTweet).hasClass('liked')) {
    $(targetTweet).removeClass('liked');
    data.likeStatus = 'remove';
  } else {
    $(targetTweet).addClass('liked');
    data.likeStatus = 'add';
  }
  
  // Make the post request to update the like count
  $.ajax('/tweets/updateLikes', { method: 'POST', data: data})
  .then(function(likeCount) {
    $(`#${tweetID}-likes`).text(likeCount);
  });
}

function createTweetElement(tweetData) {
  const article =  $('<article>').addClass('tweet');
  const header = $('<header>').html(`<img src="${tweetData.user.avatars.small}"><h3>${tweetData.user.name}</h3><p>${tweetData.user.handle}</p>`);
  const content = $('<p>').addClass('tweet-content').text(`${tweetData.content.text}`);
  const footer = $('<footer>').html(`<span>${tweetData.created_at}</span><span class="tweet-icons"><i class="fas fa-flag icons"></i><i class="fas fa-retweet icons"></i><i data-id="${tweetData._id}" class="fas fa-heart icons"></i><span id="${tweetData._id}-likes">${tweetData.likes}</span></span>`);
  return $(article).append(header).append(content).append(footer);
}

function renderTweets(tweets) {
  $('.tweet-container').empty();
  for (let i in tweets) {
    const currentTweet = createTweetElement(tweets[i]);
    $('.tweet-container').prepend(currentTweet);
  }
  $('.fa-heart').click(function(event){
    $(this).animate({fontSize: '15px'},100).animate({fontSize: '14px'},100);
    likeTweet(event);
  });
}

function renderNewTweet(tweet) {
  const currentTweet = createTweetElement(tweet);
  $(currentTweet).hide().prependTo('.tweet-container').slideDown();
  $('.fa-heart').click(function(event){
    $(this).animate({fontSize: '15px'},100).animate({fontSize: '14px'},100);
    likeTweet(event);
  });
}

function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
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
        .then(function(tweet) {
          $('#new-tweet-textarea').val('');
          renderNewTweet(tweet);
        });
      } else {
        const error = invalidTweet();
        $('#tweet-error').text(error).slideDown();
      }
    });
  });

  $('#compose-btn').click(function(e) {
    if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp('slow');
    } else {
      $('html, body').animate({scrollTop : 0},200, function() {
        $('.new-tweet').slideDown('slow', function() {
          $('#new-tweet-textarea').focus();
        });
      });
    }
  });

  loadTweets();
});