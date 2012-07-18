window.SongPop = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	init: function(data) {
		this.current_user = new SongPop.Models.User(data.current_user);
		this.users = new SongPop.Collections.Users(data.users);
		this.topics = new SongPop.Collections.Ts(data.topics);
		this.reasons = new SongPop.Collections.Reasons(data.reasons);
		this.sources = new SongPop.Collections.Sources(data.sources);
		this.quiz_qs = new SongPop.Collections.QuizQs(data.quiz_qs);
		this.quiz_tasks = new SongPop.Collections.QuizTasks(data.quiz_tasks);
		this.challenges = new SongPop.Collections.Challenges(data.challenges);
		
		new SongPop.Routers.QuizRouter({
			current_user: this.current_user,
			users: this.users,
			topics: this.topics,
			reasons: this.reasons,
			sources: this.sources,
			quiz_qs: this.quiz_qs,
			quiz_tasks: this.quiz_tasks,
			challenges: this.challenges
		});
		Backbone.history.start();
	}
};
