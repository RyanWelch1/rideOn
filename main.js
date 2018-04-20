
const UBER_SERVER_TOKEN = "SV-Rt3mhdPpAmXnf-cvZKLJmzmzxsPObY9MU2FUi";
const clientID = "6RKJrLdnQfwsdkLRWzkJDVDuFy1RERuy";
const clientSecret= "751iZ4YDzNltjEPsZ8a4f7kXS9RLf8pVkgCyV_GE";
const UBER_URL = "https://api.uber.com/V1.2";
const redirectURI="http://localhost:8080/";

const UBER_Price_Estimates="https://api.uber.com/V1.2/estimates/price";
const UBER_Time_Estimates="https://api.uber.com/V1.2/estimates/time";
const UBER_Get_Ride_Details="https://api.uber.com/V1.2/requests/{request_id}";
const UBER_Tracking_Map="https://api.uber.com/V1.2/requests/{request_id}/map";
const UBER_Get_Reciept="https://api.uber.com/V1.2/requests/{request_id}/receipts";
let accessToken = "";
let requests = "";


//Grab parameter for code, variable code will store the code needed for accessToken
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const code = regex.exec(location.search);
    code === null ? '' : decodeURIComponent(code[1].replace(/\+/g, ' '));
    tradeForAccessToken(code[1]);
};
// run getUrlParameter taking code as the argument
getUrlParameter("code");

// trading code for Access token
function tradeForAccessToken(code) {
  const url=`https://login.uber.com/oauth/v2/token?code=${code}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${redirectURI}`
    $.ajax({
       url,
       method: "POST",// method post because 405 error not wanting to see GET request as method.
       headers: { //Access-Control-Allow-Origin"
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
         "Access-Control-Allow-Headers": "Content-Type, Accept" ,
       },
       success: function(response) {// Success
         accessToken = response.access_token;
         requestsApi(accessToken);
         rideEstimateApi(accessToken);
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

function rideEstimateApi(accessToken) {
  const url= "https://api.uber.com/v1.2/requests/estimate?start_latitude=37.7752278&start_longitude=-122.4197513&end_latitude=37.7773228&end_longitude=-122.4272052&authorization=Bearer${accessToken}";
  $.ajax({
    url,
    method: "POST",
    headers: {
      //"X-Requested-With": `XMLHttpRequest http://localhost:8080/`,
       "Authorization": `Bearer ${accessToken}`,
       "Accept-Language": "en_US",
       "Content-Type": "application/json"
       },

    success: function(response) {
         console.log(response);
          },
    error: function(error) {
         console.log(error);
          }

  })
}




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
