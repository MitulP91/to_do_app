var todo_app = {
	createTask: function(text) {
		var new_item = new todo_item();
		new_item.setTaskText(toTitleCase(text));
		this.appendTask(new_item);
	},
	appendTask: function(new_item) {
		if(new_item.text === '') {

		} else {
			new_item.renderItem();
			new_item.createTime();
			new_item.completedButton();
			new_item.deleteButton();
		}
	}
}

function todo_item() {
	var todo_items = document.getElementById('todo-items');
	var completed_items = document.getElementById('completed-items');

	this.text = '';

	this.setTaskText = function(text) {
		this.text = text;
	};
	this.renderItem = function() {
		var li = document.createElement('li');

		li.innerHTML = '<div id="text">' + this.text + '</div>';
		this.li = li;
		todo_items.appendChild(li);
	};
	this.createTime = function() {
		var current_time = new Date();
		var created = document.createElement('p');

		if(current_time.getMinutes() < 10) {
			var short_date = (current_time.getMonth()+1) + ' / ' + current_time.getDate() + ' / ' + current_time.getFullYear() + ' at ' + current_time.getHours() + ':0' + current_time.getMinutes();
		} else {
			var short_date = (current_time.getMonth()+1) + ' / ' + current_time.getDate() + ' / ' + current_time.getFullYear() + ' at ' + current_time.getHours() + ':' + current_time.getMinutes();
		}

		created.innerHTML = '<div>Created At: ' + short_date + '</div>';
		this.created = created;
		todo_items.appendChild(created);
	};
	this.completeTime = function() {
		var current_time = new Date();
		var completed = document.createElement('p');

		if(current_time.getMinutes() < 10) {
			var short_date = (current_time.getMonth()+1) + ' / ' + current_time.getDate() + ' / ' + current_time.getFullYear() + ' at ' + current_time.getHours() + ':0' + current_time.getMinutes();
		} else {
			var short_date = (current_time.getMonth()+1) + ' / ' + current_time.getDate() + ' / ' + current_time.getFullYear() + ' at ' + current_time.getHours() + ':' + current_time.getMinutes();
		}

		completed.innerHTML = '<div>Completed At: ' + short_date + '</div>';
		this.completed = completed;	
	}
	this.completedButton = function() {
		var self = this;

		var hr = document.createElement('hr');
		this.hr = hr;

		var complete_button = document.createElement('button');
		complete_button.innerHTML = "Complete";
		this.complete_button = complete_button;
		todo_items.appendChild(complete_button);

		complete_button.addEventListener('click', function() {
			self.removeChildrenFromItems();
			self.completeTime();
			completed_items.appendChild(self.li);
			completed_items.appendChild(self.completed);
			completed_items.appendChild(self.delete_button);
			completed_items.appendChild(self.hr);
		});
	};
	this.deleteButton = function() {
		var self = this;

		var delete_button = document.createElement('button');
		delete_button.innerHTML = "Delete";
		todo_items.appendChild(delete_button);
		this.delete_button = delete_button;

		var hr = document.createElement('hr');
		todo_items.appendChild(hr);
		this.hr = hr;

		delete_button.addEventListener('click', function() {
			if(self.delete_button.parentElement.id === 'todo-items') {
				self.removeChildrenFromItems();
			} else {
				completed_items.removeChild(self.li);
				completed_items.removeChild(self.completed);
				completed_items.removeChild(self.delete_button);
				completed_items.removeChild(self.hr);
			}
		});
	};
	this.removeChildrenFromItems = function() {
		todo_items.removeChild(this.li);
		todo_items.removeChild(this.created);
		todo_items.removeChild(this.complete_button);
		todo_items.removeChild(this.delete_button);
		todo_items.removeChild(this.hr);
	};
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

window.onload = function() {
	document.getElementById('add-item').addEventListener('click', function() {
		todo_app.createTask(document.getElementById('new-task-field').value);
	});
}



