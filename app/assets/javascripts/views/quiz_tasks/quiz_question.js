SongPop.Views.QuizTasksQuizQuestion = Backbone.View.extend({
	
	template: JST['quiz_tasks/quiz_question'],
	
	events: {
		'click #answer0' : 'answerZero',
		'click #answer1' : 'answerOne',
		'click #answer2' : 'answerTwo',
		'click #answer3' : 'answerThree',
		'click #answer4' : 'answerFour',
		'click #start' : 'showAnswers'
	},
	
	render: function() {
		this.time = 10;
		var that = this;
		this.getQuizQ();
		$(this.el).html(this.template({
			quiz_q: this.quiz_q,
			answers: this.answers
		}));
		setTimeout(function() {that.setProgressBars(that.options.quiz_qs.length);}, 1);
		return this;
	},
	
	quizQuestionAnswered: function(num) {
		this.is_answered = true;
		var challenge = this.options.challenge;
		var current_user = this.options.current_user;
		var time = Math.round((12.5 - this.time) * 10) / 10;
		
		this.assignAnswer(this.answers[num]);
		this.options.quiz_tasks.create({
			t_id: this.options.challenge.get('t_id'),
			reason_id: this.options.challenge.get('reason_id'),
			quiz_q_id: this.quiz_q.get('id'),
			user_id: this.options.current_user.get('id'),
			answer: this.answer,
			time: time,
			challenge_id: this.options.challenge.get('id')
		});
		if (this.answer === 'correct') {
			if (current_user.get('id') === challenge.get('user_id')) {
				challenge.set({user_score: challenge.get('user_score') + Math.round(500 + (12.5 - time) * 160)});
				challenge.save();
			} else {
				challenge.set({challenger_score: challenge.get('challenger_score') + Math.round(500 + (12.5 - time) * 160)});
				challenge.save();
			}
		}
		Backbone.history.navigate('quiz_q/' + challenge.get('id') + '/ans', true);
	},
	
	getQuizQ: function() {
		var quiz_qs = this.options.quiz_qs;
		var current_user = this.options.current_user;
		var quiz_tasks = this.options.quiz_tasks;
		var reason_id = this.options.challenge.get('reason_id');
		var quiz_q;
		var count = 0, quiz_found = false;
		this.player_uid = 0;
		
		while (count < quiz_qs.length && !quiz_found) {
			if (!(quiz_tasks.where({user_id: current_user.get('id'), reason_id: reason_id, quiz_q_id: quiz_qs[count].get('id'), challenge_id: this.options.challenge.get('id')})[0])) {
				quiz_q = quiz_qs[count];
				quiz_found = true;
			}
			count = count + 1
		}
		this.quiz_q = quiz_q;
		this.shuffleAnswers();
		if (current_user.get('id') === this.options.challenge.get('user_id')) {
			var player = this.options.users.where({id: this.options.challenge.get('challenger_id')})[0];
			this.player_task = this.options.quiz_tasks.where({user_id: player.get('id'), quiz_q_id: this.quiz_q.get('id'), challenge_id: this.options.challenge.get('id')})[0];
			this.player_time = this.options.quiz_tasks.where({user_id: player.get('id'), quiz_q_id: this.quiz_q.get('id'), challenge_id: this.options.challenge.get('id')})[0].get('time');
			this.player_uid = player.get('uid');
		}
		this.setTimeInterval(this.answers.length);
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
	},
	
	timer: function() {
		var inter, count, inter_count;
		var running = false;
		var that = this;
		var current_user = this.options.current_user;
		var challenge = this.options.challenge;

		if (!running) { 
			running = true;
			count = 125;
			that.time = 12.5;
			inter_count = 0;
			
			function run() {
				if (current_user.get('id') === challenge.get('user_id')) {
					if (Math.round((12.5 - that.time) * 10) / 10 === that.player_time) {
						that.showPlayer();
					}
				}
				if (that.interval[inter_count] === Math.round(that.time *10) / 10) {
					that.eliminateAnswer(inter_count);
					inter_count = inter_count + 1;
				}
				count = count - 1;
				that.time = that.time - 0.1;
				$('#meter').css('width', Math.round((count / 1.25) * 100) / 100 + "%");
				if (that.stopTimer(count)) {
					clearInterval(inter);
					running = false;
					if (current_user.get('id') === challenge.get('user_id')) {
						if (Math.round((12.5 - that.time) * 10) / 10 === that.player_time) {
							that.showPlayer();
						}
					}
				}
			}
			inter = setInterval(run, 100);		
		}
	},
	
	stopTimer: function(num) {
		if (num === 0 || this.is_answered) {
			return true;
		} else {
			return false;
		}
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
		var quiz_qs = this.options.quiz_qs;
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
	},
	
	showPlayer: function() {
		var player_task = this.player_task;
		var answers = this.answers;
		var quiz_q = this.quiz_q;
		var uid = this.player_uid;
		var elements;
		
		for (i = 0; i < answers.length; i++) {
			if (quiz_q.get(player_task.get('answer')) === answers[i]) {
				elements = document.getElementsByTagName('button');
				for (j = 0; j < elements.length; j++) {
					if (parseInt($(elements[j]).val()) === i) {
						$(elements[j]).addClass('highlight-ans');
						var source = '<img src="https://graph.facebook.com/' + String(uid) + '/picture" height = "25px" width = "25px"/>'
						$(elements[j]).find('#pic').html(source);
					}
				}
			}
		}
	},
	
	answerZero: function() {
		this.quizQuestionAnswered(0);
	},
	
	answerOne: function() {
		this.quizQuestionAnswered(1);
	},
	
	answerTwo: function() {
		this.quizQuestionAnswered(2);
	},
	
	answerThree: function() {
		this.quizQuestionAnswered(3);
	},
	
	answerFour: function() {
		this.quizQuestionAnswered(4);
	},
	
	eliminateAnswer: function(num) {
		var answers = this.answers;
		var quiz_q = this.quiz_q;
		
		for (i = 0; i < answers.length; i++) {
			if (answers[i] === quiz_q.get('wrong' + String(num + 1))) {
				$('#answer' + String(i)).addClass('darken-ans');
			}
		}
	},
	
	setTimeInterval: function(num) {
		var inter = [];
		for(i = num; i > 1; i--) {
			inter.push((Math.round((12.5 / num) * 10) / 10) * (i - 1));
		}
		this.interval = inter;
	},
	
	showAnswers: function() {
		var that = this;
		var buttons = $('#page').find('button');
		
		$('#the_timer').removeClass('hide');
		for (i = 0; i < buttons.length; i++) {
			if ($(buttons[i]).hasClass('hide')) {
				$(buttons[i]).removeClass('hide');
			} else {
				$(buttons[i]).addClass('hide');
			}
		}
		setTimeout(function() {that.timer()}, 1000);
	}
});