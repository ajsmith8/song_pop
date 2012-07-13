SongPop.Views.QuizTasksQuizQuestionSource = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_question_source'],
	
	events: {
		'click #back' : 'back',
		'click #dispute' : 'disputeSource'
	},
	
	render: function() {
		$(this.el).html(this.template({
			
		}));
		return this;
	},
	
	back: function() {
		parent.history.back();
	},
	
	disputeSource: function() {
		alert("That's not allowed!");
	}
});