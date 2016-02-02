var obj; //data artits
var artistName; //string to save artistname 




$( function () {


	validatePrevSearch();

	//search input action
	$( "#artistName" ).keypress( function( event ) {
		if ( event.which == 13 ) {
     		event.preventDefault();
  		}
  		else
  		{
			artistName = $("#artistName").val();
			var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+artistName+'&limit=15&api_key=42f75f939105d2110d6a0daf27db431c&format=json';
		

			console.log(url);
			$('#resutlContainer').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
			getLastFMData(url);		
  		}
	});

	//clear search button 
	$("#clearTxtBtn").on("click",function (e) {
		e.preventDefault();
		console.log("asdasd");
		
		//reset search input
		$( "#artistName" ).val('');

		//reset modals container
		$("#artistBioModal").html('');

		//reset result contaniner
		$("#resutlContainer").html('');

	});


	//back search validation
	function validatePrevSearch() {

		var tempName = $( "#artistName" ).val();
		console.log(tempName);
		if (tempName!='')
		{
			var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+tempName+'&limit=15&api_key=42f75f939105d2110d6a0daf27db431c&format=json';
		
			$('#resutlContainer').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
			getLastFMData(url);
		}

	}

	//render bootstrap modals
	function showArtistBio (index, data) {
		
		html = '<div id="modal_'+index+'" class="modal fade" role="dialog">';
		html += '<div class="modal-dialog">';
		// Modal content
		html += '<div class="modal-content">';
		html += '<div class="modal-header">';
		html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
		html += '<h4 class="modal-title">Artist: '+ data.name+' </h4>';
		html += '</div>';
		html += '<div class="modal-body">';
		html += '<img src="'+data.image[4]['#text']+'"  height="300" width=="300" />';
		html += '<p>Listeners: '+data.listeners+'</p>';
		html += '<p>Bio URL: <a href='+data.url+' >'+data.url+'</a></p>';
		html += '<p>Streameble: '+data.streamable+'</p>';
		html += '</div>';
		html += '<div class="modal-footer">';
		html += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';


		$("#artistBioModal").append(html);
	}


	// http resquest from lastFM
	function getLastFMData (url) {
		$.ajax(url)  
			.done(function(res) {
			    var artistArray = parseDataArtist(res);
			    showArtistData(artistArray);
			})
			.fail(function(res) {
			   	console.log(res);
			})
			.always(function(res) {
				console.log("complete");
		});
	}

	// parse data artist array
	function parseDataArtist (data) {
		var artist = data.results.artistmatches;
		return artist;
	}

	// render artist data table 
	function showArtistData(dataArray){
		obj = dataArray.artist;

		//reset modals container
		$("#artistBioModal").html("");

		var html = "<br><table class='table-striped' style='width:100%; border: none;' border=1> ";
	  	
	  	for (var i = 0; i < obj.length; i++) {

	    	html += "<tr>";
	      	html += '<td><a href='+obj[i].url+' ><img src='+obj[i].image[2]['#text']+ ' ></td>';  
	      	html += "<td><h2>"+obj[i].name+"</h2></td>";

	      	html += "<td><buton type='button' class='btn btn-success btn.lg' data-toggle='modal' data-target='#modal_"+i+"'>See More...</button></td>";
      		html += "</tr>";

      		showArtistBio(i, obj[i]);
	    }

		html += "</table>";

		$("#resutlContainer").html(html);

	}

});