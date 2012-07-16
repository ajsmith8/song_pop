SongPop.Views.QuizTasksSelectChallengeTopic = Backbone.View.extend({
	
	template: JST['quiz_tasks/select_challenge_topic'],
	
	events: {
		'click #topic' : 'selectChallengeTopic'
	},
	
	render: function() {
		this.getTopics();
		$(this.el).html(this.template({
			topics: this.topics
		}));
		return this;
	},
	
	selectChallengeTopic: function() {
		var challenge = this.options.challenge;
		var reasons = this.reasons;
		var topic = this.topics[parseInt($(event.target).val())];
		var reason, count = 0, reason_found = false;
		
		while (count < reasons.length && !reason_found) {
			if (reasons[count].get('t_id') === topic.get('id')) {
				reason = reasons[count];
				reason_found = true;
			}
			count = count + 1;
		}
		challenge.set({t_id: topic.get('id'), reason_id: reason.get('id')});
		challenge.save();
		Backbone.history.navigate('t/' + challenge.get('id'), true);
	},
	
	getTopics: function() {
		var topics = this.options.topics;
		var challenges = this.options.challenges;
		var current_user = this.options.current_user;
		var reasons = this.options.reasons;
		var available_topics = [];
		var available_reasons = [];
		var topic_reasons;
		
		topics.each(function(t) {
			topic_reasons = reasons.where({t_id: t.get('id')});
			if (challenges.where({user_id: current_user.get('id'), t_id: t.get('id')}).length + 
				challenges.where({challenger_id: current_user.get('id'), t_id: t.get('id')}).length >= 
				topic_reasons.length) {
				
			} else {
				for (i = 0; i < topic_reasons.length; i++) {
					if (!(challenges.where({user_id: current_user.get('id'), t_id: t.get('id'), reason_id: topic_reasons[i].get('id')})[0] ||
						challenges.where({challenger_id: current_user.get('id'), t_id: t.get('id'), reason_id: topic_reasons[i].get('id')})[0])) {
						available_reasons.push(topic_reasons[i]);	
						} 
				}
				available_topics.push(t);
			}
		});
		available_topics.sort(function(a,b) {
			return b.get('score') - a.get('score');
		});
		available_reasons.sort(function(a,b) {
			return b.get('score') - a.get('score');
		});
		this.topics = available_topics;
		this.reasons = available_reasons;
	}
});