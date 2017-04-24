
$( document ).ready( function() {
  // This function Loads Tweets. It renders tweets from the database
  // and sends it to the server.
  function loadTweets() {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {

        renderTweets(data.reverse());
      }
      });
  }

  // This function creates a new tweet element with required html
  // also gives a time for when the tweet was created
  function createTweetElement(articles) {
    let currTime = new Date().getTime(); // Time in Milliseconds right now
    let TweetTime = articles.created_at; // Time in Milliseconds when tweet was created
    var myTimeStamp = "";

    let timeDiff = currTime - TweetTime;
    let mSecsDay = 1000 * 60 * 60 * 24;
    let mSecsMonth = mSecsDay * 28;
    let mSecsYear  = mSecsDay * 365;
    let mSecsHour  = mSecsDay / 24;
    let mSecsMins  = 60 * 1000;



    let getYear = Number((timeDiff / mSecsYear).toFixed(0));
    let getMonth = Number((timeDiff / mSecsMonth).toFixed(0));
    let getDays = Number((timeDiff / mSecsDay).toFixed(0));
    let getHours = Number((timeDiff / mSecsHour).toFixed(0));
    let getMinutes = Number((timeDiff/ mSecsMins).toFixed(0));
    let getSeconds = Number((timeDiff/ 1000).toFixed(0));



    if(getYear > 0){
      myTimeStamp = String(getYear) + " years ago";
    } else if (getMonth > 0) {
      myTimeStamp = String(getMonth) + " months ago";
    } else if (getDays > 0) {
      myTimeStamp = String(getDays) + " days ago";
    } else if (getHours > 0) {
      myTimeStamp = String(getHours) + " hours ago";
    } else if (getMinutes > 0) {
      myTimeStamp = String(getMinutes) + " minutes ago";
    } else {
      myTimeStamp = String(getSeconds) + " posted seconds ago";
    }

    return `
            <article class ="tweet-box">
              <header class ="tweet-header">
                <img src=${articles.user.avatars.small} class="tweet-image">
                <span class="tweet-user-name">${articles.user.name}</span>
                <span class="tweet-user-handle">${articles.user.handle}</span>
              </header>
             <div class ="tweet-content">
                <p>${articles.content.text}</p>
              </div>
              <footer class ="tweet-footer">
                <span class ="tweet-timestamp">${myTimeStamp}</span>
                <div class="tweet-buttons">
                  <a> <img class="response-button" src= "http://www.clipartbest.com/cliparts/xcg/6BE/xcg6BEEei.png" alt="Flag"> </a>
                  <a> <img class="response-button" src="http://4vector.com/i/free-vector-edit-pencil-icon_098479_Edit_pencil_icon.png" alt="Edit"> </a>
                  <a> <img class="response-button" src="http://www.clker.com/cliparts/I/b/r/1/6/n/simple-green-check-button-md.png" alt="Like"> </a>
                </div>
              </footer>
            </article>
            `;
  }

  function renderTweets(articles) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweet-data').html("");
    articles.forEach((articles) => {
        $('#tweet-data').append(createTweetElement(articles));
    });
  }

  $('#tweet-submit').click( function(Event) {
    Event.preventDefault();
    if($('#tweet-input').val()){

      if(($('#tweet-input').val().length) <= 140){
          $.ajax({
                  url: '/tweets',
                  method: 'POST',
                  data: $('#tweet-input').serialize()
                  })
                  .then(data => {
                  $('.new-tweet').find('.counter').text('140');

                  loadTweets();
                  console.log("I am here");
                  $('#tweet-input').val(''); // CLEARING INPUT
                  })
      } else {
        $('#error-message').text("Exceeded char limit. Please shorten tweet ");
        $('#error-message').fadeIn(100).delay(2000).fadeOut(1000);
      }
    } else {
        $('#error-message').text("Your Tweet is Empty. Please enter something and press tweet");
        $('#error-message').fadeIn(100).delay(2000).fadeOut(1000);
    }
  });

  // Toggle on and off the compose message field by button click
  $('#nav-bar').find('.compose').click( function() {
    $('.new-tweet').slideToggle();
  });

  loadTweets();
});



