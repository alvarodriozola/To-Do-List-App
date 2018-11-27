var Application = {

	board_id : 0,
	user_id : 0,

	initApplication : function(){
		// $(window).load('pageinit', '#page-boards', function(){
		// 	Application.initShowBoards();
		// })
		$(document).on('pageinit','#splash',function(){ // the .on() method does require jQuery 1.7 + but this will allow you to have the contained code only run when the #splash page is initialized.
    setTimeout(function(){
        $.mobile.changePage("#page-one", "fade");
    }, 4000);
});
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
		$(document).on('click', '#btn-create_board', function(){
			Application.createBoard();
		})
		$(document).on('click', '#btn-create_list', function(){
			Application.createList();
		})

		$(document).on('click', '#btn-create_list', function(){
			Application.createList();
		})

		$(document).on('click', '#delete-list', function(){
			Application.deleteList();
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
						Application.user_id = dataObject[i].user_id;
						console.log(Application.user_id);
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
						Application.board_id = dataObject[i].board_id;
						console.log(Application.board_id);
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

	createList : function(){
		var list_title = document.getElementById('list-title').value;
		console.log("a"+list_title);
		console.log("b"+Application.board_id);
		$.ajax({
			method: "POST",
			url: "http://alvayonara.tk/api/list/add.php",
			data: { list_title: list_title, board_id : Application.board_id},
			success : function(){
				console.log("complete");
			},
		}).done(function(){
			Application.initShowDetailList(Application.board_id);
		});
	},

	createBoard : function(){
		var board_title = document.getElementById('board-title').value;
		console.log("a"+board_title);
		console.log("b"+Application.user_id);
		$.ajax({
			method: "POST",
			url: "http://alvayonara.tk/api/board/add.php",
			data: { board_title: board_title, user_id : Application.user_id},
			success : function(){
				console.log("complete");
			},
		}).done(function(){
			Application.initShowBoards(Application.user_id);
		});
	},
	deleteList : function(){
		$.ajax({
			method: "POST",
			url: "http://alvayonara.tk/api/list/delete.php",
			data: { id : Application.board_id},
			success : function(){
				console.log("complete");
			},
		}).done(function(){
			Application.initShowDetailList(Application.board_id);
		});
	}
}
