SongPop.Routers.QuizRouter =  Backbone.Router.extend({
	
	routes: {
		'' 					: 'home',
		'create' 			: 'getFriends',
		'create/t/:id' 		: 'selectChallengeTopic',
		't/:id' 			: 'quizTopic',
		'reason/:id' 		: 'quizReason',
		'quiz_q/:id' 		: 'quizQuestion',
		'quiz_q/:id/ans' 	: 'quizQuestionAnswered',
		'results/:id' 		: 'quizResults',
		'source/:id' 		: 'quizQuestionSource',
		
	},
	
	initialize: function(options) {
		this.current_user = options.current_user;
		this.users = options.users;
		this.topics = options.topics;
		this.reasons = options.reasons;
		this.sources = options.sources;
		this.quiz_qs = options.quiz_qs;
		this.quiz_tasks = options.quiz_tasks;
		this.challenges = options.challenges;
	},
	
	home: function() {
		var view = new SongPop.Views.QuizTasksHome({
			current_user: this.current_user,
			challenges: this.challenges,
			users: this.users
		});
		$('#page').html(view.render().el);
	},
	
	createChallenge: function() {
		var view = new SongPop.Views.QuizTasksCreateChallenge({
			current_user: this.current_user,
			friends: this.friends,
			users: this.users,
			challenges: this.challenges
		});
		$('#page').html(view.render().el);
	},
	
	getFriends: function() {
		var that = this;
		FB.api('/me/friends?access_token=' + this.current_user.get("token"), function(response) {
			that.friends = response["data"];
			that.createChallenge();
		});
	},
	
	selectChallengeTopic: function(id) {
		var view = new SongPop.Views.QuizTasksSelectChallengeTopic({
			topics: this.topics,
			challenges: this.challenges,
			challenge: this.challenges.where({id: parseInt(id)})[0],
			current_user: this.current_user,
			reasons: this.reasons
		});
		$('#page').html(view.render().el);
	},
	
	quizTopic: function(id) {
		var view = new SongPop.Views.QuizTasksQuizTopic({
			challenge: this.challenges.where({id: parseInt(id)})[0],
			topics: this.topics
		});
		$('#page').html(view.render().el);
	},
	
	quizReason: function(id) {
		var view = new SongPop.Views.QuizTasksQuizReason({
			challenge: this.challenges.where({id: parseInt(id)})[0],
			reasons: this.reasons
		});
		$('#page').html(view.render().el);
	},
	
	quizQuestion: function(id) {
		var view = new SongPop.Views.QuizTasksQuizQuestion({
			quiz_qs: this.quiz_qs.where({reason_id: this.challenges.where({id: parseInt(id)})[0].get('reason_id')}),
			challenge: this.challenges.where({id: parseInt(id)})[0],
			current_user: this.current_user,
			quiz_tasks: this.quiz_tasks,
			users: this.users
		});
		$('#page').html(view.render().el);
	},
	
	quizQuestionAnswered: function(id) {
		var view = new SongPop.Views.QuizTasksQuizQuestionAnswered({
			quizzes: this.quiz_qs.where({reason_id: this.challenges.where({id: parseInt(id)})[0].get('reason_id')}),
			quiz_tasks: this.quiz_tasks,
			challenge: this.challenges.where({id: parseInt(id)})[0],
			current_user: this.current_user,
			quiz_qs: this.quiz_qs
		});
		$('#page').html(view.render().el);
	},
	
	quizResults: function(id) {
		var view = new SongPop.Views.QuizTasksQuizResults({
			challenge: this.challenges.where({id: parseInt(id)})[0],
			users: this.users,
			current_user: this.current_user,
			reasons: this.reasons,
			topics: this.topics,
			quiz_qs: this.quiz_qs,
			quiz_tasks: this.quiz_tasks,
			challenges: this.challenges
		});
		$('#page').html(view.render().el);
	},
	
	quizQuestionSource: function(id) {
		var view = new SongPop.Views.QuizTasksQuizQuestionSource({
			source: this.sources.where({id: parseInt(id)})[0]
		});
		$('#page').html(view.render().el);
	}
});