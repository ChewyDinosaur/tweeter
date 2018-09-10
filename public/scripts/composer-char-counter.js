$(document).ready(function() {
  $('#new-tweet-textarea').on('keyup', function(e){
    const tweetLength = $(this).val().length;
    $(this).closest('form').find('.counter').text(140 - tweetLength);
  });
});