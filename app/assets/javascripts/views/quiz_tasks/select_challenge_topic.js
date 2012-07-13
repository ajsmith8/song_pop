SongPop.Views.QuizTasksSelectChallengeTopic = Backbone.View.extend({
	
	template: JST['quiz_tasks/select_challenge_topic'],
	
	events: {
		'click #topic' : 'selectChallengeTopic'
	},
	
	render: function() {
		$(this.el).html(this.template({
			
		}));
		return this;
	},
	
	selectChallengeTopic: function() {
		Backbone.history.navigate('t/' + Math.floor(Math.random() * 101), true);
	}
});