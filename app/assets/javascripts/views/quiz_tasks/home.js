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
		var recieved = challenges.where({user_id: current_user.get('id'), user_score: 0, is_finished: false});
		var sent = challenges.where({challenger_id: current_user.get('id'), user_score: 0, is_finished: false});
		
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
		var challenges = this.options.challenges;
		var me = this.options.current_user;
		var users = this.options.users;
		var matchup = [], player, my_wins = 0, player_wins = 0;
		
		if (challenge.get('user_id') === me.get('id')) {
			player = users.where({id: challenge.get('challenger_id')})[0];
		} else {
			player = users.where({id: challenge.get('user_id')})[0];
		}
		_.each(challenges.where({user_id: me.get('id'), challenger_id: player.get('id'), is_finished: true}), function(c) {
			matchup.push(c);
		});
		_.each(challenges.where({user_id: player.get('id'), challenger_id: me.get('id'), is_finished: true}), function(c) {
			matchup.push(c);
		});
		_.each(matchup, function(m) {
			if (m.get('user_score') > m.get('challenger_score')) {
				winner_id = m.get('user_id');
			} else {
				winner_id = m.get('challenger_id');
			}
			if (winner_id === me.get('id')) {
				my_wins = my_wins + 1;
			} else {
				player_wins = player_wins + 1;
			}
		});
		array.push({challenge: challenge, my_score: my_wins, opponent_score: player_wins});
	},
	
	nudge: function() {
		var users = this.options.users;
		var challenges = this.options.challenges;
		var challenge = this.options.challenges.where({id: parseInt($(event.target).val())})[0];
		var to_user = users.where({id: challenge.get('user_id')})[0];
		var currentTime = new Date();
		var obj = { 
			method: 'feed', 
			link: 'http://www.fusegap.com', 
			name: 'fuseGap', 
			to: to_user.get('uid'), 
			from: this.options.current_user.get('uid'),
			description: me.get('name') + " has challenged your knowledge, think you can beat them?"
		};
		
		function callback(response) 
		{
			if (!response) {
				
			} else {
				challenge.set({time_created: currentTime.getTime()});
				challenge.save();
			}
        }
		FB.ui(obj, callback);
		this.render();
	}
});