$( document ).ready(function() {

  let eventTrigger = 0;


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
        eventTrigger += 1;
        alert("Enter");
    }
  });

});