SongPop.Views.QuizTasksQuizReason = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_reason'],
	
	events: {
		'click #start' : 'startQuiz'
	},
	
	render: function() {
		$(this.el).html(this.template({
			reason: this.options.reasons.where({id: this.options.challenge.get('reason_id')})[0]
		}));
		return this;
	},
	
	startQuiz: function() {
		Backbone.history.navigate('quiz_q/' + this.options.challenge.get('id'), true);
	}
});