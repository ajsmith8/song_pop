SongPop.Views.QuizTasksQuizResults = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_results'],
	
	events: {
		'click #send_challenge' : 'sendChallenge',
		'click #new_challenge' : 'newChallenge'
	},
	
	render: function() {
		this.setVars();
		$(this.el).html(this.template({
			is_challenge: this.is_challenge,
			topic: this.topic,
			reason: this.reason,
			questions: this.questions,
			my_quiz: this.my_quiz,
			player_quiz: this.player_quiz,
			my_points: this.my_points,
			player_points: this.player_points ,
			player: this.player,
			me: this.me
		}));
		return this;
	},
	
	setVars: function() {
		var is_challenge, topic, reason, my_points, player_points, challenge, me, player, quiz_tasks;
		var questions = [], my_quiz = [], player_quiz = [];
		challenge = this.options.challenge;
		topic = this.options.topics.where({id: challenge.get('t_id')})[0];
		reason = this.options.reasons.where({id: challenge.get('reason_id')})[0];
		questions = this.options.quiz_qs.where({reason_id: reason.get('id'), t_id: topic.get('id')});
		me = this.options.current_user;
		quiz_tasks = this.options.quiz_tasks;
		
		if (challenge.get('challenger_id') === me.get('id')) {
			is_challenge = true;
			my_points = challenge.get('challenger_score');
			player_points = challenge.get('user_score');
			player = this.options.users.where({id: challenge.get('user_id')})[0];
			for (i = 0; i < questions.length; i++) {
				my_quiz.push(quiz_tasks.where({quiz_q_id: questions[i].get('id'), user_id: me.get('id')})[0]);
			}
		} else {
			is_challenge = false;
			my_points = challenge.get('user_score');
			player_points = challenge.get('challenger_score');
			player = this.options.users.where({id: challenge.get('challenger_id')})[0];
			for (i = 0; i < questions.length; i++) {
				player_quiz.push(quiz_tasks.where({quiz_q_id: questions[i].get('id'), user_id: player.get('id')})[0]);
				my_quiz.push(quiz_tasks.where({quiz_q_id: questions[i].get('id'), user_id: me.get('id')})[0]);
			}
		}
		this.me = me;
		this.my_points = my_points;
		this.my_quiz = my_quiz;
		this.player = player;
		this.player_points = player_points;
		this.player_quiz = player_quiz;
		this.is_challenge = is_challenge;
		this.challenge = challenge;
		this.topic = topic;
		this.reason = reason;
		this.questions = questions;
		if (!is_challenge) {
			this.new_challenge = this.options.challenges.create();
			this.updateChallenge();
		}
	},
	
	updateChallenge: function() {
		var challenges = this.options.challenge_scores;
		var users = this.options.users;
		var record;
		
		if (challenges.where({a_id: this.me.get('id'), b_id: this.player.get('id')})[0] || challenges.where({b_id: this.me.get('id'), a_id: this.player.get('id')})[0]) {
			if (challenges.where({a_id: this.me.get('id'), b_id: this.player.get('id')})[0]) {
				record = challenges.where({a_id: this.me.get('id'), b_id: this.player.get('id')})[0];
				if (this.my_points === this.player_points) {
					record.set({ties: record.get('ties') + 1});
					record.save();
				} else {
					if (this.my_points > this.player_points) {
						record.set({a_wins: record.get('a_wins') + 1});
						record.save();
					} else {
						record.set({b_wins: record.get('b_wins') + 1});
						record.save();
					}
				}
			} else {
				record = challenges.where({b_id: this.me.get('id'), a_id: this.player.get('id')})[0];
				if (this.my_points === this.player_points) {
					record.set({ties: record.get('ties') + 1});
					record.save();
				} else {
					if (this.my_points > this.player_points) {
						record.set({b_wins: record.get('b_wins') + 1});
						record.save();
					} else {
						record.set({a_wins: record.get('a_wins') + 1});
						record.save();
					}
				}
			}
		} else {
			if (this.my_points === this.player_points) {
				challenges.create({a_id: this.me.get('id'), b_id: this.player.get('id'), a_wins: 0, b_wins: 0, ties: 1});
			} else {
				if (this.my_points > this.player_points) {
					challenges.create({a_id: this.me.get('id'), b_id: this.player.get('id'), a_wins: 1, b_wins: 0, ties: 0});
				} else {
					challenges.create({a_id: this.me.get('id'), b_id: this.player.get('id'), a_wins: 0, b_wins: 1, ties: 0});
				}
			}
		}
		this.challenge.set({is_finished: true});
		this.challenge.save();
	},
	
	sendChallenge: function() {
		var obj = { method: 'feed', link: 'http://www.fusegap.com', name: 'fuseGap', to: this.player.get('uid'), from: this.me.get('uid')};
		function callback(response) 
		{
			Backbone.history.navigate('', true);
        }
		FB.ui(obj, callback);
	},
	
	newChallenge: function() {
		var current_time = new Date();
		
		this.new_challenge.set({challenger_id: this.me.get('id'), user_id: this.player.get('id'), time_created: current_time.getTime()});
		this.new_challenge.save();
		Backbone.history.navigate('create/t/' + this.new_challenge.get('id'), true);
	}
});