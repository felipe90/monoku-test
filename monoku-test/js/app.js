var obj; //data artits
var artistName; //string to save artistname 

$( function () {

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

	//seemore button action 0
	$("#seemorebtn_0").on("click",function (e) {
		e.preventDefault();
		console.log(obj[0]);

		html = '<div id="myModal" class="modal fade" role="dialog">';
		html += '<div class="modal-dialog">';
		// Modal content
		html += '<div class="modal-content">';
		html += '<div class="modal-header">';
		html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
		html += '<h4 class="modal-title">Modal Header</h4>';
		html += '</div>';
		html += '<div class="modal-body">';
		html += '<p>Some text in the modal.</p>';
		html += '</div>';
		html += '<div class="modal-footer">';
		html += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';


		//var  = $("#artistName").val();
		//getLastFMData(url);
	});


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

	// show artist biography
	function showModalBio (artistData) {
		html= "";
	}

	// render artist data table 
	function showArtistData(dataArray){
		obj = dataArray.artist;

		var html = "<br><table class='table-striped' style='width:100%; border: none;' border=1> ";
	  	
		html +=  "<tr><th>Image</th><th>Name</th><th>Actions</th></tr>"
	
	  	for (var i = 0; i < obj.length; i++) {

	    	html += "<tr>";
	      	html += '<td><img src='+obj[i].image[1]['#text']+ ' ></td>';  
	      	html += "<td>"+obj[i].name+"</td>";
	      	html += "<td><input type='submit' class='btn btn-primary' id='seemorebtn_"+i+"' value='See More...'' ></td>";
      		html += "</tr>";
	    }

		html += "</table>";

		$("#resutlContainer").html(html);

	}

});