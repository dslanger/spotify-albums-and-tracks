// Self envoking function! once the document is ready, bootstrap our application.
// We do this to make sure that all the HTML is rendered before we do things
// like attach event listeners and any dom manipulation.
(function(){
  $(document).ready(function(){
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
        outputArea.html('');

        // The spotify API sends back an arrat 'items'
        // Which contains the first 20 matching elements.
        // In our case they are artists.
        artists.items.forEach(function(artist){
          //var artistLi = $("<li>" + artist.name + " - " + artist.id + "</li>");
          var artistLi = $("<li>" + artist.name + "</li>");
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

/* COMPLETE THIS FUNCTION! */
function displayAlbumsAndTracks(event) {
  var appendToMe = $('#albums-and-tracks');
    $('li').css("color", "blue");
    $(this).css("color", "red");
    var artistID = $(this).data('spotify-id');
    var albumUrl = 'https://api.spotify.com/v1/artists/' + artistID + '/albums';
    var albumsRequest = $.ajax(albumUrl, {
      type: "GET",
      dataType: "json"
    });
    albumsRequest.done(function (data) {
      var albums = data.items;
      var albumsHTML = '<ul class="albums">';
      albums.forEach(function(album){
        var albumLi = '<li class="single-album" data-album-id="' + album.id + '>' + album.name + '</li>';
      });
      albumsHTML += albumLi + '</ul>';
      //$('#q-results li').append(albumsHTML);
      $(event.target).append(albumsHTML);
      console.log(albumsHTML);
    });


  //console.log($(event.target).attr('data-spotify-id'));//.attr('data-spotify-id'));
}


/* YOU MAY  WANT TO CREATE HELPER FUNCTIONS OF YOUR OWN */
/* THEN CALL THEM OR REFERENCE THEM FROM displayAlbumsAndTracks */
/* THATS PERFECTLY FINE, CREATE AS MANY AS YOU'D LIKE */
