SongPop.Views.QuizTasksHome = Backbone.View.extend({
	
	template: JST['quiz_tasks/home'],
	
	events: {
		'click #play' 	: 'quizTopic',
		'click #create' : 'createChallenge',
		'click #nudge' 	: 'nudge'
	},
	
	render: function() {
		var array = [];
		this.getChallenges(array);
		$(this.el).html(this.template({
			challenges: array,
			current_user: this.options.current_user,
			users: this.options.users
		}));
		return this;
	},
	
	quizTopic: function() {
		var challenge_id = parseInt($(event.target).val());
		Backbone.history.navigate('t/' + challenge_id, true);
	},
	
	createChallenge: function() {
		Backbone.history.navigate('create', true);
	},
	
	getChallenges: function(array) {
		var challenges = this.options.challenges;
		var current_user = this.options.current_user
		var recieved = challenges.where({user_id: current_user.get('id'), user_score: 0});
		var sent = challenges.where({challenger_id: current_user.get('id'), user_score: 0});
		
		this.sortChallenges(recieved);
		for (i = 0; i < recieved.length; i++) {
			this.getMatchup(recieved[i], array);
		}
		this.sortChallenges(sent);
		for (i = sent.length; i > 0; i--) {
			this.getMatchup(sent[i - 1], array);
		}
	},
	
	sortChallenges: function(array) {
		array.sort(function(a,b) {
			return b.get('created_at') - a.get('created_at');
		});
	},
	
	getMatchup: function(challenge, array) {
		var scores = this.options.challenge_scores;
		var current_user = this.options.current_user
		var matchup;
		
		if (scores.where({a_id: current_user.get('id'), b_id: challenge.get('challenger_id')})[0] || scores.where({a_id: challenge.get('challenger_id'), b_id: current_user.get('id')})[0]) {
			if (scores.where({a_id: current_user.get('id'), b_id: challenge.get('challenger_id')})[0]) {
				matchup = scores.where({a_id: current_user.get('id'), b_id: challenge.get('challenger_id')})[0];
				array.push({challenge: challenge, my_score: matchup.get('a_wins'), opponent_score: matchup.get('b_wins')});
			}
			if (scores.where({a_id: challenge.get('challenger_id'), b_id: current_user.get('id')})[0]) {
				matchup = scores.where({a_id: challenge.get('challenger_id'), b_id: current_user.get('id')})[0];
				array.push({challenge: challenge, my_score: matchup.get('b_wins'), opponent_score: matchup.get('a_wins')});
			}
		} else {
			array.push({challenge: challenge, my_score: 0, opponent_score: 0});
		}
	},
	
	nudge: function() {
		var users = this.options.users;
		var challenges = this.options.challenges;
		var challenge = this.options.challenges.where({id: parseInt($(event.target).val())})[0];
		var to_user = users.where({id: challenge.get('user_id')})[0];
		var currentTime = new Date();
		var obj = { method: 'feed', link: 'http://www.fusegap.com', name: 'fuseGap', to: to_user.get('uid'), from: this.options.current_user.get('uid')};
		
		function callback(response) 
		{
			if (!response) {
				document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
			} else {
				challenge.set({time_created: currentTime.getTime()});
				challenge.save();
			}
        }
		FB.ui(obj, callback);
		this.render();
	}
});