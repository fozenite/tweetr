$( document ).ready(function() {
  // Checks for keyup in our tweet input text box. Keeps a char count accordingly
  // Also handles our enter key press event to submit the tweet
  $('.new-tweet').find('#tweet-input').keyup(function(event){
    let tweetCharVal = 140 - $(this).closest('.new-tweet').find('#tweet-input').val().length;

    if(tweetCharVal < 0){
      $('.new-tweet').find('.counter').css({"color": "red"});
    } else {
      $('.new-tweet').find('.counter').css({"color": "black"});
    }

    $('.new-tweet').find('.counter').text(tweetCharVal);
      let keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode === 13){
        $( '#tweet-submit' ).trigger( "click" ); // TRIGGER CLICK EVENT ON TWEET SUBMIT TO CALL
      }
  });

});