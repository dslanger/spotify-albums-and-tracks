function bootstrapSpotifySearch(){var a,t,s,i=$("#q-results");$("#spotify-q-button").on("click",function(){i.html("");var a;spotifyQueryString=$("#spotify-q").val(),t="https://api.spotify.com/v1/search?type=artist&q="+spotifyQueryString,a=$.ajax({type:"GET",dataType:"json",url:t}),a.done(function(a){var t=a.artists;t.items.forEach(function(a){var t=$('<li class="artist">'+a.name+"</li>");t.attr("data-spotify-id",a.id),i.append(t),t.click(displayAlbumsAndTracks)})}),a.fail(function(a){console.log("Something Failed During Spotify Q Request:"),console.log(a)})})}function displayAlbumsAndTracks(a){var t=$("#albums-and-tracks");t.html("");var s,i;s=$(a.target).attr("data-spotify-id"),i="https://api.spotify.com/v1/artists/"+s+"/albums";var o=$.ajax(i,{type:"GET",dataTYPE:"json"});o.done(function(a){var s=a.items;s.forEach(function(a){var s=$('<ul><span class="album" data-albumID="'+a.id+'"><a href="'+a.external_urls.spotify+'">'+a.name+"</a></span></ul>");t.append(s);var i;i="https://api.spotify.com/v1/albums/"+a.id;var o=$.ajax(i,{type:"GET",dataType:"json"});o.done(function(a){var t=$('<span class="release-date">'+a.release_date+"</span>");s.append(t)});var n,r;n="https://api.spotify.com/v1/albums/"+a.id+"/tracks",r=$.ajax(n,{type:"GET",dataType:"json"}),r.done(function(a){var t=a.items;t.forEach(function(a){var t=$('<li class="track" data-trackID="'+a.id+'"><a href="'+a.external_urls.spotify+'">'+a.name+"</a></ul>");s.append(t)})})})})}!function(){$(document).ready(function(){$("h1").before('<p style="color: red">this is refactor-app.js</p>'),bootstrapSpotifySearch()})}();