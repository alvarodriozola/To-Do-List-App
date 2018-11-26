var Card = {
	add : function (card) {
		$.ajax({
			url: 'http://alvayonara.tk/api/card/add.php',
			type: 'POST',
			data: card,
			beforeSend : function () {
				$.mobile.loading('show', {
					text : 'Creating card...',
					textVisible : true
				});
			},
			success : function (data) {
				console.log(data);
			},
			complete : function () {
				$.mobile.loading('hide');
			}
		});
	},

	list : function (list_id) {
		$.ajax({
			url: 'http://alvayonara.tk/api/card/list.php',
			type: 'GET',
			data: {
		    list_id: list_id
		  },
			beforeSend : function () {
				$.mobile.loading('show', {
					text : 'Fetching cards data...',
					textVisible : true
				});
			},
			success : function (response) {
				$('#list-card').attr("data-listid", list_id);
				$('#list-card-list').empty();
				for (var i = 0; i < response.cards.length; i++) {
					appendList = '<li>' +
						'<a href="#show-card?id=' + response.cards[i].id +
						'" target="_self" class="list-card-item" data-id="' + response.cards[i].id +
						'"><h2>' + response.cards[i].title + '</h2><p>' + response.cards[i].description +
						'</p><p>' + response.cards[i].due_date +'</p></a></li>';
					$('#list-card-list').append(appendList);
				}
				$('#list-card-list').listview('refresh');
			},
			complete : function () {
				$.mobile.loading('hide');
			}
		});
	},

	show : function (id) {
		$.ajax({
			url: 'http://alvayonara.tk/api/card/show.php',
			type: 'GET',
			data: {
		    id: id
		  },
			beforeSend : function () {
				$.mobile.loading('show', {
					text : 'Fetching card data...',
					textVisible : true
				});
			},
			success : function (response) {
				$('#show-card').attr("data-id", response.card.id);
        $('#show-card-title').text(response.card.title);
				$('#show-card-description').text(response.card.description);
				$('#show-card-due').text(response.card.due_date);
			},
			complete : function () {
				$.mobile.loading('hide');
			}
		});
	},

	edit : function (card) {
		$.ajax({
			url: 'http://alvayonara.tk/api/card/edit.php',
			type: 'POST',
			data: card,
			beforeSend : function () {
				$.mobile.loading('show', {
					text : 'Updating card data...',
					textVisible : true
				});
			},
			success : function (data) {
				console.log(data);
			},
			complete : function () {
				$.mobile.loading('hide');
			}
		});
	},

	delete : function (id) {
		$.ajax({
			url: 'http://alvayonara.tk/api/card/delete.php',
			type: 'GET',
			data: {
				id: id
			},
			beforeSend : function () {
				$.mobile.loading('show', {
					text : 'Deleting card...',
					textVisible : true
				});
			},
			success : function (data) {
				console.log(data);
			},
			complete : function () {
				$.mobile.loading('hide');
			}
		});
	},

	done : function (id) {
		$.ajax({
			url: 'http://alvayonara.tk/api/card/done.php',
			type: 'GET',
			data: {
				id: id
			},
			success : function (data) {
				console.log(data);
			},
			complete : function () {
				$.mobile.loading('hide');
			}
		});
	},
}

var addCardEventListeners = function () {
	$(document).on('click', '#add-card-btn', addCard)
	$(document).on('click', '#edit-card-btn', editCard)
	$(document).on('click', '#detail-list', listCard)
	$(document).on('click', '.list-card-item', showCard)
	$(document).on('click', '#show-card-delete', deleteCard)
	$(document).on('click', '#show-card-done', doneCard)
	$(document).on('click', '#show-card-edit', getEditedCard)
}

var addCard = function () {
	Card.add ({
		list_id: $('#list-card').data('listid'),
		title: $('#add-card-title').val(),
		description: $('#add-card-description').val(),
		due_date: $('#add-card-due').val()
	});
}

var getEditedCard = function(){
	var card_id = $('#show-card').data('id');
	$('#edit-card').attr("data-id", card_id);
	$('#edit-card-title').val($('#show-card-title').text());
	$('#edit-card-description').text($('#show-card-description').text());
	$('#edit-card-due').val($('#show-card-due').text());
	location.href = "#edit-card?id=" + card_id;
}

var editCard = function () {
	Card.edit ({
		title: $('#edit-card-title').val(),
		description: $('#edit-card-description').val(),
		due_date: $('#edit-card-due').val()
	});
}

var listCard = function () {
	Card.list ($(this).data('listid'));
}

var showCard = function () {
	Card.show ($(this).data('id'));
}

var deleteCard = function () {
	Card.delete ($('#show-card').data('id'));
}

var doneCard = function () {
	Card.done ($('#show-card').data('id'));
}
