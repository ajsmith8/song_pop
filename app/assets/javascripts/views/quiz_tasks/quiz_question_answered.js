SongPop.Views.QuizTasksQuizQuestionAnswered = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_question_answered'],
	
	events: {

	},
	
	render: function() {
		var that = this;
		this.setVars();
		$(this.el).html(this.template({
			points: this.points,
			quiz_q: this.quiz_q,
			correct: this.correct,
			last_q: this.last_q,
			source: this.options.sources.where({id: this.quiz_q.get('source_id')})[0]
		}));
		setTimeout(function() {that.setProgressBars(that.options.quizzes.length);}, 1);
		return this;
	},
	
	quizResults: function() {
			Backbone.history.navigate('results/' + this.options.challenge.get('id'), true);
	},
	
	setVars: function() {
		var points, quiz_q, correct, last_q;
		var quiz_tasks = this.options.quiz_tasks;
		var quiz_qs = this.options.quiz_qs;
		var current_user = this.options.current_user;
		var challenge = this.options.challenge;
		var quiz_task = _.last(quiz_tasks.where({user_id: current_user.get('id'), t_id: challenge.get('t_id'), reason_id: challenge.get('reason_id'), challenge_id: challenge.get('id')}));
		var that = this;
		
		quiz_q = quiz_qs.where({id: quiz_task.get('quiz_q_id')})[0];
		if (quiz_task.get('answer') === 'correct') {
			correct = true;
		} else {
			correct = false;
		}
		points = Math.round(500 + (10 - quiz_task.get('time')) * 450);
		if (quiz_qs.where({reason_id: challenge.get('reason_id')}).length === quiz_tasks.where({
																					user_id: current_user.get('id'), 
																					t_id: challenge.get('t_id'), 
																					reason_id: challenge.get('reason_id'), 
																					challenge_id: challenge.get('id')}).length) {
			last_q = true;
			challenge.set({is_ready: true});
			challenge.save();
			setTimeout(function() {that.quizResults()}, 3000);
		} else {
			last_q = false;
			setTimeout(function() {that.nextQuestion()}, 3000);
		}
		
		this.quiz_q = quiz_q;
		this.correct = correct;
		this.points = points;
		this.last_q = last_q;
	},
	
	nextQuestion: function() {
		Backbone.history.navigate('quiz_q/' + this.options.challenge.get('id'), true);
	},
	
	setProgressBars: function(num) {
		if (num === 3) {
			$('#progress_bars').html(JST['quiz_tasks/three_question']);
			this.fillBars(num);
		}
		if (num === 4) {
			$('#progress_bars').html(JST['quiz_tasks/four_question']);
			this.fillBars(num);
		}
		if (num === 5) {
			$('#progress_bars').html(JST['quiz_tasks/five_question']);
			this.fillBars(num);
		}	
	},
	
	fillBars: function(num) {
		var quiz_qs = this.options.quizzes;
		var quiz_tasks = this.options.quiz_tasks;
		var current_user = this.options.current_user;
		var challenge = this.options.challenge;
		var task, time;
		
		for (i = 0; i < num; i++) {
			if (quiz_tasks.where({user_id: current_user.get('id'), quiz_q_id: quiz_qs[i].get('id'), challenge_id: challenge.get('id')})[0]) {
				task = 	quiz_tasks.where({quiz_q_id: quiz_qs[i].get('id'), user_id: current_user.get('id'), challenge_id: challenge.get('id')})[0];
				time = task.get('time');
				if (task.get('answer') === 'correct') {
					$('#bar_' + String(i + 1)).html(JST['quiz_tasks/success_meter']({time: i + 1}));
				} else {
					$('#bar_' + String(i + 1)).html(JST['quiz_tasks/fail_meter']({time: i + 1}));
				}
			} else {
				$('#bar_' + String(i + 1)).html(JST['quiz_tasks/empty_meter']({time: i + 1}));
			}
		}
	}
});