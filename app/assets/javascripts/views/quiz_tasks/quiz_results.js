SongPop.Views.QuizTasksQuizResults = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_results'],
	
	events: {
		'click #home' : 'home',
	},
	
	render: function() {
		var challenge = this.options.challenge;
		var my_points = challenge.get('user_score');
		var player_points = challenge.get('challenger_score');
		var winner;
		
		if (my_points > player_points) {
			winner = true;
		} else {
			winner = false;
		}
		this.winner = winner;
		$(this.el).html(this.template({
			player: this.options.users.where({id: challenge.get('challenger_id')})[0],
			player_points: player_points,
			my_points: my_points,
			winner: this.winner
		}));
		return this;
	},
	
	home: function() {
		var current_user = this.options.current_user;
		var challenges = this.options.challenge_scores;
		var challenge = this.options.challenge;
		var users = this.options.users;
		var player = users.where({id: challenge.get('challenger_id')})[0];
		var winner = this.winner;
		var record;
		
		if (challenges.where({a_id: current_user.get('id'), b_id: player.get('id')})[0] || challenges.where({b_id: current_user.get('id'), a_id: player.get('id')})[0]) {
			if (challenges.where({a_id: current_user.get('id'), b_id: player.get('id')})[0]) {
				record = challenges.where({a_id: current_user.get('id'), b_id: player.get('id')})[0];
				if (winner) {
					record.set({a_wins: record.get('a_wins') + 1});
					record.save();
				} else {
					record.set({b_wins: record.get('b_wins') + 1});
					record.save();
				}
			} else {
				record = challenges.where({b_id: current_user.get('id'), a_id: player.get('id')})[0];
				if (winner) {
					record.set({b_wins: record.get('b_wins') + 1});
					record.save();
				} else {
					record.set({a_wins: record.get('a_wins') + 1});
					record.save();
				}
			}
		} else {
			if (winner) {
				challenges.create({a_id: current_user.get('id'), b_id: player.get('id'), a_wins: 1, b_wins: 0});
			} else {
				challenges.create({a_id: current_user.get('id'), b_id: player.get('id'), a_wins: 0, b_wins: 1});
			}
		}
		challenge.set({is_finished: true});
		challenge.save();
		Backbone.history.navigate('', true);
	}
});