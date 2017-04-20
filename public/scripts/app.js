/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$( document ).ready( function() {



function loadTweets() {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {

        renderTweets(data.reverse());

        // $button.replaceWith(morePostsHtml);
      }
      });

 }



  function createTweetElement(articles) {
  let currTime = new Date().getTime(); // Time in Milliseconds right now
  let TweetTime = articles.created_at; // Time in Milliseconds when tweet was created
  var myTimeStamp = "";


  let timeDiff = currTime - TweetTime;
  let mSecsDay = 1000 * 60 * 60 * 24;
  let mSecsMonth = mSecsDay * 28;
  let mSecsYear  = mSecsDay * 365;
  let mSecsHour  = mSecsDay / 24;
  let mSecsMins  = mSecsHour / 60;



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
    myTimeStamp = String(getSeconds) + " seconds ago";
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

// Fake data taken from tweets.json
  var data1 = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


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

                  loadTweets();
                  console.log("I am here");
                  $('#tweet-input').val(''); // CLEARING INPUT

                  })
      } else {
        alert('Exceeded char limit. Please shorten tweet');
      }
    } else {
        alert("Your Tweet is Empty. Please try again");
    }
  });







  });



