SongPop.Views.QuizTasksQuizQuestion = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_question'],
	
	events: {
		'click #answer' : 'quizQuestionAnswered'
	},
	
	render: function() {
		this.getQuizQ();
		$(this.el).html(this.template({
			quiz_q: this.quiz_q,
			answers: this.answers
		}));
		return this;
	},
	
	quizQuestionAnswered: function() {
		var time = 5000;
		this.assignAnswer(this.answers[parseInt($(event.target).val())]);
		this.options.quiz_tasks.create({
			t_id: this.options.challenge.get('t_id'),
			reason_id: this.options.challenge.get('reason_id'),
			quiz_q_id: this.quiz_q.get('id'),
			user_id: this.options.current_user.get('id'),
			answer: this.answer,
			time: time
		});
		if (this.options.current_user.get('id') === this.options.challenge.get('user_id')) {
			this.options.challenge.set({user_score: this.options.challenge.get('user_score') + Math.round(500 + (10000 - time) * 0.45)});
			this.options.challenge.save();
		} else {
			this.options.challenge.set({challenger_score: this.options.challenge.get('challenger_score') + Math.round(500 + (10000 - time) * 0.45)});
			this.options.challenge.save();
		}
		Backbone.history.navigate('quiz_q/' + this.options.challenge.get('id') + '/ans', true);
	},
	
	getQuizQ: function() {
		var quiz_qs = this.options.quiz_qs;
		var current_user = this.options.current_user;
		var quiz_tasks = this.options.quiz_tasks;
		var reason_id = this.options.challenge.get('reason_id');
		var quiz_q;
		var count = 0, quiz_found = false;
		
		while (count < quiz_qs.length && !quiz_found) {
			if (!(quiz_tasks.where({user_id: current_user.get('id'), reason_id: reason_id, quiz_q_id: quiz_qs[count].get('id')})[0])) {
				quiz_q = quiz_qs[count];
				quiz_found = true;
			}
			count = count + 1
		}
		this.quiz_q = quiz_q;
		this.shuffleAnswers();
	},
	
	shuffleAnswers: function() {
		var array = [];
		var quiz_q = this.quiz_q;

		array.push(quiz_q.get("correct"));
		array.push(quiz_q.get("wrong1"));
		if (quiz_q.get("wrong2") && quiz_q.get("wrong2") !== "") {
			array.push(quiz_q.get("wrong2"));
		}
		if (quiz_q.get("wrong3") && quiz_q.get("wrong3") !== "") {
			array.push(quiz_q.get("wrong3"));
		}
		if (quiz_q.get("wrong4") && quiz_q.get("wrong4") !== "") {
			array.push(quiz_q.get("wrong4"));
		}
		array = _.shuffle(array);
		this.answers = array;
	},
	
	assignAnswer: function(answer_string) {
		var answer;
		
		if (answer_string === this.quiz_q.get('correct')) {
			answer = 'correct';
		}
		if (answer_string === this.quiz_q.get('wrong1')) {
			answer = 'wrong1';
		}
		if (answer_string === this.quiz_q.get('wrong2')) {
			answer = 'wrong2';
		}
		if (answer_string === this.quiz_q.get('wrong3')) {
			answer = 'wrong3';	
		}
		if (answer_string === this.quiz_q.get('wrong4')) {
			answer = 'wrong4';	
		}
		
		this.answer = answer;
	}
});