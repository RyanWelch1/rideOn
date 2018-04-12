const UBER_CLIENT_KEY="6RKJrLdnQfwsdkLRWzkJDVDuFy1RERuy";
const UBER_SERVER_TOKEN="SV-Rt3mhdPpAmXnf-cvZKLJmzmzxsPObY9MU2FUi";
const UBER_URL="https://api.uber.com/V1.2";
const UBER_Price_Estimates="https://api.uber.com/V1.2/estimates/price";
const UBER_Time_Estimates="https://api.uber.com/V1.2/estimates/time";
const UBER_Get_Ride_Details="https://api.uber.com/V1.2/requests/{request_id}";
const UBER_Tracking_Map="https://api.uber.com/V1.2/requests/{request_id}/map";
const UBER_Get_Reciept="https://api.uber.com/V1.2/requests/{request_id}/receipts";


function fetchApiData(){
    $.ajax({
        url: UBER_Price_Estimates,
        method: 'GET',
        headers: {Authorization: `Bearer <UBER_SERVER_TOKEN>`
       },
       success: function(){
          console.log("im running");
        }
    })
}
fetchApiData();
        
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