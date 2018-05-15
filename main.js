const UBER_SERVER_TOKEN = "SV-Rt3mhdPpAmXnf-cvZKLJmzmzxsPObY9MU2FUi";
const clientID = "6RKJrLdnQfwsdkLRWzkJDVDuFy1RERuy";
const clientSecret= "751iZ4YDzNltjEPsZ8a4f7kXS9RLf8pVkgCyV_GE";
const UBER_URL = "https://api.uber.com/V1.2";
// const redirectURI="https://ryanwelch1.github.io/rideOn/";
const redirectURI = "http://localhost:8080/"
const UBER_Price_Estimates="https://api.uber.com/V1.2/estimates/price";
const UBER_Time_Estimates="https://api.uber.com/V1.2/estimates/time";
const UBER_Get_Ride_Details="https://api.uber.com/V1.2/requests/{request_id}";
const UBER_Tracking_Map="https://api.uber.com/V1.2/requests/{request_id}/map";
const UBER_Get_Reciept="https://api.uber.com/V1.2/requests/{request_id}/receipts";
let accessToken = "";
let requests = "";
let requestsApiResponse=[];
let estimateApiResponse=[];
let latitudeStart = "";
let longitudeStart = "";
let latitudeEnd = "";
let longitudeEnd = "";


//Google Geocoding
const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${api_key}";
const api_key ="AIzaSyAexKQVBMP39SiZYE9pq_hvNvnUKYG-jMU";



//Grab parameter for code, variable code will store the code needed for accessToken
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const code = regex.exec(location.search);
    code === null ? '' : decodeURIComponent(code[1].replace(/\+/g, ' '));
    if(code) {
      tradeForAccessToken(code[1]);
    }
};
// run getUrlParameter taking code as the argument
if(window.location.href !== "http://localhost:8080/") {
  getUrlParameter("code");
}

// trading code for Access token
function tradeForAccessToken(code) {
  console.log(code);
  const url=`https://login.uber.com/oauth/v2/token?code=${code}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${redirectURI}`

  //  fetch(url, { 
  //   method: 'POST',
  //   mode: 'no-cors',
  //   headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
  // })
  // .then(response => response.json())
  // .then(json => console.log(json))
  // .catch(error => console.log(error))
    $.ajax({
       url,
       method: "POST",// method post because 405 error not wanting to see GET request as method.
       headers: { //Access-Control-Allow-Origin"
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
         "Access-Control-Allow-Headers": "Content-Type, Accept" ,
       },
       success: function(response) {// Success
         console.log(response);
         accessToken = response.access_token;
         requestsApi(accessToken);
         console.log(accessToken);



          // run function needed access to desired endpoint
       },
       error: function(error) { //Error
         console.log(error);
       }
    })
}


function requestsApi(accessToken) {
  $.ajax({
    url: "https://api.uber.com/v1.2/products?latitude=37.7752315&longitude=-122.418075",
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
    success: function(response) {
      console.log(response);

    },
    error: function(error) {
      console.log(error);
    }

  })
}

function getEstimateFromUber(accessToken, latitude, longitude) {
  const url= `https://api.uber.com/v1.2/requests/estimate`;
  $.ajax({
    url,
    method: "POST",
    headers: {
      //"X-Requested-With": `XMLHttpRequest http://localhost:8080/`,
       "Authorization": `Bearer ${accessToken}`,
       "Accept-Language": "en_US",
       "Content-Type": "application/json"
       },
   data: JSON.stringify({
      "start_latitude": latitude,
      "start_longitude": longitude,
      "end_latitude": latitudeEnd,
      "end_longitude": longitudeEnd,
    }),

    success: function(response) {
         console.log(response);

          },
    error: function(error) {
         console.log(error);
          }

  })
}



function getGeocode() {
  $(".jsZipSearch").on("submit", function(event) {
    event.preventDefault();
    console.log('d');
    let startingDestination= $(".startAddInput").val();
    let endDestination= $(".endAddInput").val();
    covertStartingAddressToLongLat(startingDestination);
    covertEndAddressToLongLat(endDestination);

  })

}
getGeocode();


function covertStartingAddressToLongLat(address){
  const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
      $.ajax({
        url: googleURL,
        type: "POST",

        success: function(response) {
             console.log(response);
             locationLat = response.results[0].geometry.location.lat;
             locationLong = response.results[0].geometry.location.lng;
             getEstimateFromUber(accessToken, locationLat, locationLong);
        },

        error: function(error) {
             console.log(error);
              }
      })
}

function covertEndAddressToLongLat(address){
  const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
      $.ajax({
        url: googleURL,
        type: "POST",

        success: function(response) {
             console.log(response);
             latitudeEnd = response.results[0].geometry.location.lat;
             longitudeEnd = response.results[0].geometry.location.lng;
        },

        error: function(error) {
             console.log(error);
              }
      })
}





//Video-jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
// function displayResults(zipcode) {
//   data.
// }
//        const query = new XMLHttpRequest();
//    xhr.open('GET', UBER_URL);
//    xhr.setRequestHeader(UBER_CLIENT_KEY, UBER_SERVER_TOKEN);
//    xhr.send();
//};
//$.getJSON(UBER_URL, query, callback);
//console.log(getDataFromUber);






// getDataFromYoutubeAPI as suggests is used to get request from API that returns JSON data
//function getDataFromYoutubeAPI(searchTerm, callback) {
//    const query = {
//      part: 'snippet',
//      key: API_KEY,
//      q: searchTerm,
//      maxResults: 6,
//    };
//    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
//    console.log('getDataFromYoutubeAPI ran');
//}
