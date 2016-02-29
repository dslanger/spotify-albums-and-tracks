// Self envoking function! once the document is ready, bootstrap our application.
// We do this to make sure that all the HTML is rendered before we do things
// like attach event listeners and any dom manipulation.
(function(){
  $(document).ready(function(){
    $('h1').before('<p style="color: red">this is refactor-app.js</p>');
    bootstrapSpotifySearch();
  });
})();

/**
  This function bootstraps the spotify request functionality.
*/
function bootstrapSpotifySearch(){

  var userInput, searchUrl, results;
  var outputArea = $("#q-results");
  $('#spotify-q-button').on("click", function(){
      outputArea.html('');
      var spotifyQueryRequest;
      spotifyQueryString = $('#spotify-q').val();
      searchUrl = "https://api.spotify.com/v1/search?type=artist&q=" + spotifyQueryString;

      // Generate the request object
      spotifyQueryRequest = $.ajax({
          type: "GET",
          dataType: 'json',
          url: searchUrl
      });

      // Attach the callback for success
      // (We could have used the success callback directly)
      spotifyQueryRequest.done(function (data) {
        var artists = data.artists;

        // Clear the output area
        //outputArea.html('');

        // The spotify API sends back an arrat 'items'
        // Which contains the first 20 matching elements.
        // In our case they are artists.
        artists.items.forEach(function(artist){
          //var artistLi = $("<li>" + artist.name + " - " + artist.id + "</li>");
          var artistLi = $('<li class="artist">' + artist.name + '</li>');
          artistLi.attr('data-spotify-id', artist.id);
          outputArea.append(artistLi);

          artistLi.click(displayAlbumsAndTracks);
        });
      });

      // Attach the callback for failure
      // (Again, we could have used the error callback direcetly)
      spotifyQueryRequest.fail(function (error) {
        console.log("Something Failed During Spotify Q Request:");
        console.log(error);
      });
  });
}
// COMPLETE THIS FUNCTION
function displayAlbumsAndTracks(event) {
  //hook for results
  var appendToMe = $('#albums-and-tracks');
  //remove old results from hook
  appendToMe.html('');


  function listAlbums () {
    var artistID = $(event.target).attr('data-spotify-id')
    var albumSearchUrl = "https://api.spotify.com/v1/artists/"+ artistID + "/albums";
    var albumSearch = $.ajax(albumSearchUrl, {
      type: "GET",
      dataTYPE: 'json'
    });
    albumSearch.done(function(data){
    var albums = data.items;
    albums.forEach(function(album){
      var albumHTML = $('<ul><span class="album" data-albumID="' + album.id + '"><a href="' + album.external_urls.spotify + '">' + album.name + '</a></span></ul>');
      appendToMe.append(albumHTML);
  }

  function listDates () {
    var dateSearchUrl = "https://api.spotify.com/v1/albums/" + album.id;
    var dateSearch = $.ajax(dateSearchUrl, {
      type: "GET",
      dataType: 'json'
    });
    dateSearch.done(function(data){
      var date = $('<span class="release-date">' + data.release_date + '</span>');
      albumHTML.append(date);
    });
  }



      var trackSearchUrl, trackSearch;
      trackSearchUrl = "https://api.spotify.com/v1/albums/" + album.id + "/tracks";
      trackSearch = $.ajax(trackSearchUrl, {
        type: "GET",
        dataType: 'json'
      });
      //loop through tracks and list out
      trackSearch.done(function(data){
        var tracks = data.items;
        tracks.forEach(function(track){
          //setup track html with track id as data type and track url as href
          // var trackHTML = '<li class="track" data-trackID="' track.id + '"><a href="' + track.href + '">';
          var trackHTML = $('<li class="track" data-trackID="' + track.id + '"><a href="' + track.external_urls.spotify + '">' + track.name + '</a></ul>');
          //add track name to track html
          // trackHTML += track.name;
          // trackHTML += '</li>';
          //append track html to album html
          albumHTML.append(trackHTML);
        }); //end track each loop
      }); //end trackSearch ajax request
    }); //end album each loop
  }); //end albumSearch ajax reqest
} //end displayAlbumsAndTracks function



  // 1. Query the Spotify API for every album produced by the artist you clicked on.
//   artistID = $(event.target).attr('data-spotify-id');
//   albumSearchUrl = 'https://api.spotify.com/v1/artists/' + artistID + '/albums';
//   albumSearch = $.ajax(albumSearchUrl, {
//     type: "GET",
//     dataType: 'json'
//   });
//   var albumsHTML = '<ul class="albums">';
//   albumSearch.done(function(data){
//     var albums = data.items;
//     albums.forEach(function(album){
//       albumsHTML += '<li>' + album.name + '</li>';
//     });
//   });
//   albumsHTML += '</ul>';
//   appendToMe.html('');
//   appendToMe.html(albumsHTML);
// }




/* COMPLETE THIS FUNCTION! */
// function displayAlbumsAndTracks(event) {
//   var appendToMe = $('#albums-and-tracks');
//     $('li').css("color", "blue");
//     $(this).css("color", "red");
//     var artistID = $(this).data('spotify-id');
//     var albumSearch = 'https://api.spotify.com/v1/artists/' + artistID + '/albums';
//     var albumsRequest = $.ajax({
//       type: "GET",
//       dataType: "json",
//       url: albumSearch
//     });
//     albumsRequest.done(function (data) {
//       var albums = data;
//
//       appendToMe.html('');
//
//       //var albumsHTML = '<ul class="albums">';
//
//       albums.items.forEach(function(album){
//       var albumLi = '<li class="single-album" data-album-id="' + album.id + '>' + album.name + '</li>';
//       albumsHTML += albumLi;
//       });
//       albumsHTML += '</ul>';
//       //$('#q-results li').append(albumsHTML);
//
//       console.log(albumsHTML);
//
//     });
//}


/* YOU MAY  WANT TO CREATE HELPER FUNCTIONS OF YOUR OWN */
/* THEN CALL THEM OR REFERENCE THEM FROM displayAlbumsAndTracks */
/* THATS PERFECTLY FINE, CREATE AS MANY AS YOU'D LIKE */
