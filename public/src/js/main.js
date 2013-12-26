var Task = Backbone.Model.extend({});

var task = new Task();
task.set({
    'name': 'do homework',
    'done': false
});

console.log(task);
