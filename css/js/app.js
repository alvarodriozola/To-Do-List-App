var Application = {
	initApplication : function(){
		// $(window).load('pageinit', '#page-boards', function(){
		// 	Application.initShowBoards();
		// })

		$(document).on('click', '#detail-board', function(){
			var board_id = $(this).data('boardid');
			Application.initShowDetailList(board_id);
		})

		$(document).on('click', '#detail-list', function(){
			var list_id = $(this).data('listid');
			Application.initShowCardList(list_id);
		})

		$(document).on('click', '#detail-card', function(){
			var card_id = $(this).data('cardid');
			Application.initShowCardDetail(card_id);
		})

		$(document).on('click', '#btn-login', function(){
			Application.login();
		})
	},

	initShowBoards : function(user_id){
		var appendList ="";
		$.ajax({
			url: 'http://alvayonara.tk/web_service_board.php',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show',{
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				$('#list-boards').empty();
				for (var i = 0; i < dataObject.length; i++) {
					if(dataObject[i].user_id == user_id){
						appendList = '<li><a href="#page-list?board_id='+dataObject[i].id+'" target="_self" id="detail-board" data-boardid="'+dataObject[i].id+'"><h2>'+dataObject[i].title+'</h2></a></li>';
						$('#list-boards').append(appendList);
					}
				}
				$('#list-boards').listview('refresh');
			},
			complete : function(){
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailList : function(board_id){
		var appendList ="";
		$.ajax({
			url: 'http://alvayonara.tk/web_service.php',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show',{
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				$('#list-list').empty();
				for (var i = 0; i < dataObject.length; i++) {
					if(dataObject[i].board_id == board_id){
						appendList = '<li><a href="#page-card?list_id='+dataObject[i].id+'" target="_self" id="detail-list" data-listid="'+dataObject[i].id+'"><h2>'+dataObject[i].title+'</h2></a></li>';
						$('#list-list').append(appendList);
					}
				}
				$('#list-list').listview('refresh');
			},
			complete : function(){
				$.mobile.loading('hide');
			}
		});
	},

	initShowCardList : function(list_id){
		var appendList ="";
		$.ajax({
			url: 'http://alvayonara.tk/web_service_card.php',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show',{
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				$('#list-card').empty();
				for (var i = 0; i < dataObject.length; i++) {
					if(dataObject[i].list_id == list_id){
						appendList = '<li><a href="#page-card_detail?card_id='+dataObject[i].id+'" target="_self" id="detail-card" data-cardid="'+dataObject[i].id+
						'"><h2>'+dataObject[i].title+'</h2><p>'+ dataObject[i].description +'</p><p>'+ dataObject[i].due_date +'</p></a></li>';
						$('#list-card').append(appendList);
					}
				}
				$('#list-card').listview('refresh');
			},
			complete : function(){
				$.mobile.loading('hide');
			}
		});
	},

	initShowCardDetail : function(card_id){
		$.ajax({
			url: 'http://alvayonara.tk/web_service_card.php',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show',{
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				for(var i=0; i<dataObject.length; i++){
					if(dataObject[i].id == card_id){
						$('#p-title,#p-description,#p-duedate').empty();
						$('#p-title').append('<b>Title: </b>'+dataObject[i].title);
						$('#p-description').append('<b>Description: </b>'+dataObject[i].description);
						$('#p-duedate').append('<b>Due date: </b>'+dataObject[i].due_date);
					}
				}
			},
			complete : function(){
				$.mobile.loading('hide');
			}
		});
	},

	login : function(){
		$.ajax({
			url: 'http://alvayonara.tk/web_service_user.php',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show',{
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				var error = true;
				var index;
				var username = document.getElementById('username').value;
				var password = document.getElementById('password').value;
				for(var i=0; i<dataObject.length; i++){
					if(dataObject[i].username == username && dataObject[i].password == password){
						index = dataObject[i].id;

						error = false;
					}
				}
				if(error == false){
					location.href = "#page-boards?user_id=" + index;
					Application.initShowBoards(index);
				}else{
					alert('Gagal login');
				}
			},
			complete : function(){
				$.mobile.loading('hide');
			}
		});
	},
}
