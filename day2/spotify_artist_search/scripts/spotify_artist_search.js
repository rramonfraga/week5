function fetchArtist (event) {
  event.preventDefault();
  var artist = $('.js-search').val();
  var url = 'https://api.spotify.com/v1/search?type=artist&query=' + artist;
  var request = $.get(url);
 
  function handleArtists (artists) {
    $('.js-artist-list').text("");
    console.log(artists);
    var index = 1;
    artists.artists.items.forEach( function appendLi(artist){

      var html = '<li class="col-md-3 list-group-item"><ul class="list-group"><li class="list-group-item">' + artist.name + '</li>';
      if(artist.images.length > 0){
        html = html + '<li class="list-group-item js-artist"><a href="#"><img class="js-artist-img" data-id="'+ artist.id +'" src="' + artist.images[0].url + '"></a></li>';
      }else{
        html = html + '<li class="list-group-item js-artist"><a href="#"><img class="js-artist-img" data-id="'+ artist.id +'" src="no-img.png"></a></li>';      
      }
      html = html + '</ul></li>';
      $('.js-artist-list').append(html);
      });
    };
  

  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(handleArtists);
  request.fail(handleError);
}

$('.js-submit').on('click', fetchArtist);



//--------------------------------------

function fetchAlbums (event) {
  var id = event.currentTarget.dataset.id;
  event.preventDefault();
  var url = 'https://api.spotify.com/v1/artists/'+id+'/albums';
  var request = $.get(url);
 
  function handleAlbums (albums) {
    $('#js-modal-body, #js-modal-title').empty();
    $('.modal-body').text("");
    var index = 1;
    var html = "<ul>";
    albums.items.forEach( function appendLi(album){
      html = html + '<li list-group-item">' + album.name + '</li>';
    });
    html = html + "</ul>";
    $('.modal-body').append(html);
    $('#js-modal').modal('show');
  }

  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(handleAlbums);
  request.fail(handleError);
}

$('.container-artist').on('click', '.js-artist-img', fetchAlbums);


