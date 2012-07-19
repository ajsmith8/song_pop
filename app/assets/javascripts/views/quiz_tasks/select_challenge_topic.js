SongPop.Views.QuizTasksSelectChallengeTopic = Backbone.View.extend({
	
	template: JST['quiz_tasks/select_challenge_topic'],
	
	events: {
		'click #topic' : 'selectChallengeTopic'
	},
	
	render: function() {
		$(this.el).html(this.template({
			topics: this.options.topics
		}));
		return this;
	},
	
	selectChallengeTopic: function() {
		var challenge = this.options.challenge;
		var topic = this.options.topics.where({id: parseInt($(event.target).val())})[0];
		var reasons = _.shuffle(this.options.reasons.where({t_id: topic.get('id')}));
		var reason = reasons[0];
		
		challenge.set({t_id: topic.get('id'), reason_id: reason.get('id')});
		challenge.save();
		Backbone.history.navigate('t/' + challenge.get('id'), true);
	}
});