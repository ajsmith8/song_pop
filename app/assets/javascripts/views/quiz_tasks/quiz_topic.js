SongPop.Views.QuizTasksQuizTopic = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_topic'],
	
	events: {
		'click #next' : 'quizReason',
		'click #study_guide' : 'studyGuide'
	},
	
	render: function() {
		$(this.el).html(this.template({
			topic: this.options.topics.where({id: this.options.challenge.get('t_id')})[0]
		}));
		return this;
	},
	
	quizReason: function() {
		Backbone.history.navigate('reason/' + this.options.challenge.get('id'), true);
	},
	
	studyGuide: function() {
		alert("Only nubs study!");
	}
});