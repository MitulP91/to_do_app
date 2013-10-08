/////////////////////////
// Controller ToDo App //
/////////////////////////
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
			new_item.dueDate();
			new_item.timeRemaining();
			new_item.completedButton();
			new_item.deleteButton();
			new_item.appendChildren();
		}
	}
}

///////////////////////////
// ToDo Item Constructor //
///////////////////////////
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
		// todo_items.appendChild(li);
	};
	this.createTime = function() {
		var created = document.createElement('p');
		var create_time = getCurrentTime();
		created.innerHTML = '<div>Created on ' + create_time + '</div>';
		this.created = created;
		// todo_items.appendChild(created);
	};
	this.completeTime = function() {
		var completed = document.createElement('p');
		var complete_time = getCurrentTime();
		completed.innerHTML = '<div>Completed At: ' + complete_time + '</div>';
		this.completed = completed;	
	};
	this.dueDate = function() {
		var due_date = document.createElement('p');
		var due_date_long_time = new Date(year, month - 1, day, hour, minute);
		this.due = due_date_long_time;
		if(due_date_long_time.getMinutes() < 10) {
			var due_date_time = (due_date_long_time.getMonth()+1) + '/' + due_date_long_time.getDate() + '/' + due_date_long_time.getFullYear() + ' at ' + due_date_long_time.getHours() + ':0' + due_date_long_time.getMinutes();
		} else {
			var due_date_time = (due_date_long_time.getMonth()+1) + '/' + due_date_long_time.getDate() + '/' + due_date_long_time.getFullYear() + ' at ' + due_date_long_time.getHours() + ':' + due_date_long_time.getMinutes();
		}
		due_date.innerHTML = '<div>Due on ' + due_date_time + '</div>';
		this.due_date = due_date;	
		// todo_items.appendChild(due_date);
	};
	this.timeRemaining = function() {
		var self = this;
		var remaining = document.createElement('p');
		remaining.className = "countdown"
		var due_time = this.due;
		var days, hours, minutes, seconds
		var timer = setInterval(function () {
			var current_time = new Date();
			var time_remaining = due_time - current_time;
		    var seconds_left = time_remaining / 1000;
		    days = parseInt(seconds_left / 86400);
		    seconds_left = seconds_left % 86400;
		    hours = parseInt(seconds_left / 3600);
		    seconds_left = seconds_left % 3600;
		    minutes = parseInt(seconds_left / 60);
		    seconds = parseInt(seconds_left % 60);
		    remaining.innerHTML = days + "d, " + hours + "h, "
		    + minutes + "m, " + seconds + "s remaining."; 
		    if(days >= 1) {
		    	self.li.style.cssText = 'background-color: green;';
		    }
		    if(days < 1 && hours >= 5) {
		    	self.li.style.cssText = 'background-color: yellow; color: black;';
		    }
		    if(days < 1 && hours < 5) {
		    	self.li.style.cssText = 'background-color: orange;';
		    }
		    if(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
		    	clearInterval(timer);
		    	self.li.style.cssText = 'background-color: red;';
		    	alert("You did not complete " + self.text + " on time!")
		    } 
		}, 1000);
		this.remaining = remaining;
		// todo_items.appendChild(remaining);
	};
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
			self.li.style.cssText = '';
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
		todo_items.removeChild(this.due_date);
		todo_items.removeChild(this.remaining);
		todo_items.removeChild(this.complete_button);
		todo_items.removeChild(this.delete_button);
		todo_items.removeChild(this.hr);
	};
	this.appendChildren = function() {
		todo_items.appendChild(this.li);
		todo_items.appendChild(this.created);
		todo_items.appendChild(this.due_date);
		todo_items.appendChild(this.remaining);
		todo_items.appendChild(this.complete_button);
		todo_items.appendChild(this.delete_button);
		todo_items.appendChild(this.hr);
	}
}

// Capitalize Function
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Get Current Time Function
function getCurrentTime() {
	var current_time = new Date();
	if(current_time.getMinutes() < 10) {
		return (current_time.getMonth()+1) + '/' + current_time.getDate() + '/' + current_time.getFullYear() + ' at ' + current_time.getHours() + ':0' + current_time.getMinutes();
	} else {
		return (current_time.getMonth()+1) + '/' + current_time.getDate() + '/' + current_time.getFullYear() + ' at ' + current_time.getHours() + ':' + current_time.getMinutes();
	}
}

///////////////////
// Window Onload //
///////////////////
var year, month, day, hour, minute;
window.onload = function() {
	document.getElementById('add-item').addEventListener('click', function() {
		year = document.getElementById('year-field').value;
		month = document.getElementById('month-field').value;
		day = document.getElementById('day-field').value;
		hour = document.getElementById('hour-field').value;
		minute = document.getElementById('minute-field').value;
		todo_app.createTask(document.getElementById('new-task-field').value);
	});
}


