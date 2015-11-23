var phrases = [
  "“Woop Woop Woop!” – Zoidberg",
  "“You Win Again Gravity.” – Zapp Brannigan",
  "“Just Shut Up And Take My Money!” – Fry",
  "“Bite My Shiny Metal Ass!” – Bender",
];


$('#show').hide();
$('.list-phrases').html(list_phrases());


function change_phrase() {
  var random = Math.ceil(Math.random() * phrases.length) - 1;
  $('#js-phrases').text(phrases[random]);
};

function create_link_to_img(number){
  var link = "<a href='#' name='" + number +"'><img style='height: 12px' src='delete.png'> </a>" 
  return link;
}


function list_phrases(){
  var list = ""
  for(var i = 0; i < phrases.length ; i++){
    list = list + "<li>" + phrases[i] + "  " + create_link_to_img(i) + "</li>";
  }
  return list;
};

function show_list(){
  $('.list-phrases').html(list_phrases()).toggle();
};


$(document).on('ready', function(){
  change_phrase();
});

$('.js-refresh').on('click', function(){
  change_phrase();
});

$('.js-form').on('submit',function(event){
  var new_phrase = $('#js-new-phrase').val();
  phrases.push(new_phrase);
  change_phrase();
  event.preventDefault();
});

$('.hide-show a').on('click', function(){
  $('#hide').toggle();
  $('#show').toggle();
  show_list();
});

$('.list-phrases').on('click', 'a',function(event){
  event.preventDefault();
  var number = $(event.currentTarget).name
  phrases.splice(number, 1);
  $(event.currentTarget).parent().remove();
});

