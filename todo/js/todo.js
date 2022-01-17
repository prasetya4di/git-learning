var todoData = new Map();

$(window).on('load', function () {
  todoData.set(1, {
    title: "Tugas Sejarah",
    description: "Membuat laporan perang Diponegoro",
    waktu_mulai: "2020-12-20 19:00",
    waktu_selesai: "2020-12-28 19:00"
  });
  todoData.set(2, {
    title: "Tugas Matematika",
    description: "Mengerjakan soal buku halaman 20-100",
    waktu_mulai: "2020-12-20 19:00",
    waktu_selesai: "2020-12-28 19:00"
  });
  getAllTodo();
});

function createTodo() {
  if(!isValid(true)) {
  	return;
  }
  var id = [...todoData][todoData.size-1][0] + 1;
  todoData.set(id, {
    title: $('#todo-title').val(),
    description: $('#todo-description').val(),
    waktu_mulai: $('#todo-start').val().replace('T',' '),
    waktu_selesai: $('#todo-end').val().replace('T',' ')
  });
  Swal.fire(
    'Created!',
    'Your todo has been created.',
    'success'
  );
  $('#todo-title').val("");
  $('#todo-description').val("");
  $('#todo-start').val("");
  $('#todo-end').val("");
  $('#addTodoModal').modal('hide');
  getAllTodo();
}

function editTodo() {
  if(!isValid(false)) {
  	return;
  }
  var id = parseInt($('#edit-todo-id').val());
  todoData.delete(id);
  todoData.set(id, {
    title: $('#edit-todo-title').val(),
    description: $('#edit-todo-description').val(),
    waktu_mulai: $('#edit-todo-start').val().replace('T',' '),
    waktu_selesai: $('#edit-todo-end').val().replace('T',' ')
  });
  Swal.fire(
    'Updated!',
    'Your todo has been updated.',
    'success'
  );
  $('#editTodoModal').modal('hide');
  getAllTodo();
}

function getAllTodo() {
  $('.todo_data').remove();
  for (const id of todoData.keys()) {
    var todo = todoData.get(id);
    var newColumn = "<tr class=\"todo_data\">"
              +"<td>"+id+"</td>"
              +"<td>"+todo.title+"</td>"
              +"<td>"+todo.description+"</td>"
              +"<td>"+todo.waktu_mulai+"</td>"
              +"<td>"+todo.waktu_selesai+"</td>"
              +"<td>"
                +"<button class=\"btn btn-secondary\" type=\"button\" onClick=\"getTodoById("+id+")\">"
                +"<i class=\"fa fa-pencil\"></i> Edit"
                +"</button> &nbsp"
                +"<button class=\"btn btn-danger\" type=\"button\" onClick=\"deleteConfirmation("+id+")\">"
                  +"<i class=\"fa fa-trash\"></i> Delete"
                +"</button>"
              +"</td>"
             +"</tr>";
    $('#todo_table').append(newColumn);
  }
}

function getTodoById(id) {
  let data = todoData.get(id);
  var dateStart = new Date(data.waktu_mulai);
  var dateEnd = new Date(data.waktu_selesai);
  $('#edit-todo-id').val(id);
  $('#edit-todo-title').val(data.title);
  $('#edit-todo-description').val(data.description);
  $('#edit-todo-start').val(dateStart.toISOString().slice(0, -1));
  $('#edit-todo-end').val(dateEnd.toISOString().slice(0, -1));
  $('#editTodoModal').modal('show');
}

function deleteConfirmation(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
    	deleteTodo(id);
    }
  })
}

function deleteTodo(id) {
  todoData.delete(id);
  Swal.fire(
    'Deleted!',
    'Your todo has been deleted.',
    'success'
  );
  getAllTodo();
}

function isValid(isCreate) {
	var isValid = false;
	let editText = isCreate ? '' : 'edit-';
	let title = $('#'+editText+'todo-title').val();
	let description = $('#'+editText+'todo-description').val();;
	let waktu_mulai = $('#'+editText+'todo-start').val();;
	let waktu_selesai = $('#'+editText+'todo-end').val();;
	let errorText = "";
	if (title == null || title == "") {
		errorText = "Title harus diisi";
	} else if (description == null || description == "") {
		errorText = "Description harus diisi";
	} else if (waktu_mulai == null || waktu_mulai == "") {
		errorText = "Waktu mulai harus diisi";
	} else if (waktu_selesai == null || waktu_selesai == "") {
		errorText = "Waktu selesai harus diisi";
	} else {
		isValid = true;
	}

	if(isValid) {
		var date1 = new Date(waktu_mulai);
		var date2 = new Date(waktu_selesai);
		if(date1.getTime() > date2.getTime()){
    		errorText = "Waktu mulai tidak boleh lebih dari waktu selesai";
    		isValid = false;
		}
	}

	if(!isValid) {
		Swal.fire({
		  icon: 'error',
		  title: 'Oops...',
		  text: errorText,
		})
	}

	return isValid;
}