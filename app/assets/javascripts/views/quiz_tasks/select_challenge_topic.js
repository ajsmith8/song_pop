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
		var challenges = this.options.challenges;
		if (reasons[0].get('id') === _.last(challenges.where({user_id: challenge.get('challenger_id'), challenger_id: challenge.get('user_id')})).get('reason_id')) {
			var reason = reasons[1];
		} else {
			var reason = reasons[0];
		}
		
		challenge.set({t_id: topic.get('id'), reason_id: reason.get('id')});
		challenge.save();
		Backbone.history.navigate('t/' + challenge.get('id'), true);
	}
});