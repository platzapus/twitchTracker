$(document).ready(function(){
  var allTab = true;
  var streams = ['northernlion','baertaffy','imaqtpie','freecodecamp','nalcs1','brunofin','ESL_SC2'];
  var clientID = 'w4m5ivfknxy7vaq3y9phcb5o21xdt3';
  var name, url, logo, status, game;
  $('#onlineBtn').click(function(){
    $('#onlineBtn').addClass('activeButton');
    $('#allBtn').removeClass('activeButton');
    $('#offlineBox').addClass('hide');
    $('#daveyJonesLocker').addClass('hide');
  
  });
  
  $('#allBtn').click(function(){
    $('#allBtn').addClass('activeButton');
    $('#onlineBtn').removeClass('activeButton');
    $('#offlineBox').removeClass('hide');
    $('#daveyJonesLocker').removeClass('hide');
  });
  
  for(var i=0;i<streams.length;i++){
  //ajax calls for both streams and channels data
 
    $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/kraken/streams/'+streams[i],
     async: false,
     headers: {
       'Client-ID': clientID
     },
     success: function(data) {

       if (data.stream == null){
         game = 'Offline';
         status = 'Offline';
       }
       /*else if (data.stream == undefined){
         game = 'Channel Not Found';
         status = 'Closed';
       }*/
       else {
         game = data.stream.game;
         status = 'Online';
        }

      $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/channels/'+streams[i],
        async: false,
        headers: {
          'Client-ID': clientID
        },
        success: function(data1) {
          name = data1.display_name;
          url = data1.url;
          logo = data1.logo;
          console.log(data1);
      
        //Combine
        if(status == 'Online'){
          $('#onlineBox').prepend('<a href="'+url+'"><div class="element onlineElement"><img src="'+logo+'"> <div class="name">'+name+' </div><div class="game">Playing</br> '+game+'</div></div></a>');
        }
          else if(status == 'Closed'){
            $('#onlineBox').prepend('<a href="'+url+'"><div class="element onlineElement"><img src="'+logo+'"> <div class="name">'+name+' </div><div class="game"> '+game+'</div></div></a>');
            
          }
        else{
          $('#offlineBox').prepend('<a href="'+url+'"><div class="element offlineElement"><img src="'+logo+'"> <div class="name">'+name+'</div><div class="game"> '+game+'</div></div></a>');
        }
          
        },
        error: function(){
        $('#daveyJonesLocker').prepend('<div class="element failure">Channel '+streams[i]+' does not exist.</div>')
      }
      }); //inner
      } //success outer
    }); //ajax outer
      
  }; //for
}); //doc ready