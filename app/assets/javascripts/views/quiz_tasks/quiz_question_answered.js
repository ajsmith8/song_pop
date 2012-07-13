SongPop.Views.QuizTasksQuizQuestionAnswered = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_question_answered'],
	
	events: {
		'click #next' : 'nextQuestion',
		'click #done' : 'quizResults'
	},
	
	render: function() {
		this.setVars();
		$(this.el).html(this.template({
			points: this.points,
			quiz_q: this.quiz_q,
			correct: this.correct,
			last_q: this.last_q
		}));
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
		var quiz_task = _.last(quiz_tasks.where({user_id: current_user.get('id'), t_id: challenge.get('t_id'), reason_id: challenge.get('reason_id')}));
		
		quiz_q = quiz_qs.where({id: quiz_task.get('quiz_q_id')})[0];
		if (quiz_task.get('answer') === 'correct') {
			correct = true;
		} else {
			correct = false;
		}
		points = Math.round(500 + (10000 - quiz_task.get('time')) * 0.45);
		if (quiz_qs.where({reason_id: challenge.get('reason_id')}).length === quiz_tasks.where({user_id: current_user.get('id'), t_id: challenge.get('t_id'), reason_id: challenge.get('reason_id')}).length) {
			last_q = true;
		} else {
			last_q = false;
		}
		
		this.quiz_q = quiz_q;
		this.correct = correct;
		this.points = points;
		this.last_q = last_q;
	},
	
	nextQuestion: function() {
		Backbone.history.navigate('quiz_q/' + this.options.challenge.get('id'), true);
	}
});