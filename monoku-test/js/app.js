$(function () {


	function showGithubData(data) {
		if(data.message == "Not Found") {
        	$('#ghapidata').html("<h2>No User Info Found</h2>");
      	}
      
      	else {

	      	var outhtml = '<h2>'+data.name+' <span class="smallname">(@<a href="'+data.profileurl+'" target="_blank">'+data.login+'</a>)</span></h2>';
	        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+data.html_url+'" target="_blank"><img src="'+data.avatar_url+'" width="80" height="80" alt="'+data.login+'"></a></div>';
	        outhtml = outhtml + '<p>Followers: '+data.followers+' - Following: '+data.following+'<br>Repos: '+data.public_repos+'</p></div>';
	        outhtml = outhtml + '<div class="repolist clearfix">';

      		$("#ghapidata").html(outhtml);
      	}

			
	}

	function getGithubData (url, githubName) {
		$.ajax(url)  
			.done(function(res) {
			    console.log(res);
			    showGithubData(res);
			})
			.fail(function(res) {
			   	console.log(res);
			})
			.always(function(res) {
				console.log("complete");
		});

		
	}

	$("#ghsubmitbtn").on("click",function (e) {
		e.preventDefault();
		var gitName = $("#ghusername").val();

		var requri   = 'https://api.github.com/users/'+gitName;
		
		$('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
		getGithubData(requri,gitName);

	});
})