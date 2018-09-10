$(document).ready(function() {
  $('#new-tweet-textarea').on('input', function(){
    const charsRemaining = 140 - $(this).val().length;
    const charCounter = $(this).closest('form').find('.counter');
    charCounter.text(charsRemaining);

    if (charsRemaining < 0) {
      charCounter.css('color', 'red');
    } else {
      charCounter.css('color', 'black');
    }
  });
});