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
    var html = "<ul>";
    albums.items.forEach( function appendLi(album){
      html = html + '<li list-group-item"><a class="js-track" href="#" data-id="'+ album.id +'">'+ album.name + '</a></li>';
    });
    html = html + "</ul>";
    showModal(html);
  }

  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(handleAlbums);
  request.fail(handleError);
}

$('.container-artist').on('click', '.js-artist-img', fetchAlbums);


//--------------------------------------------------

function fetchTracks (event) {
  var id = event.currentTarget.dataset.id;
  event.preventDefault();
  var url = 'https://api.spotify.com/v1/albums/'+id+'/tracks';
  var request = $.get(url);
 
  function handleTracks (tracks) {
    var html = "<ul>";
    tracks.items.forEach( function appendLi(track){
      html = html + '<li list-group-item"><a target="_blank" href="'+track.preview_url+'">'+ track.name + '</a></li>';
    });
    html = html + "</ul>";
    showModal(html);
  }

  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(handleTracks);
  request.fail(handleError);
}

$('#js-modal').on('click', '.js-track', fetchTracks);


//------------------------------------------------------

function showModal(bodyText){
  $('#js-modal-body, #js-modal-title').empty();
  $('.modal-body').text("");
  $('.modal-body').append(bodyText);
  $('#js-modal').modal('show');
}


