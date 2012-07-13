SongPop.Views.QuizTasksCreateChallenge = Backbone.View.extend({
	
	template: JST['quiz_tasks/create_challenge'],
	
	events: {
		'click #friend' : 'challengeFriend'
	},
	
	render: function() {
		this.arrangeFriends();
		$(this.el).html(this.template({
			friends: this.options.friends
		}));
		return this;
	},
	
	challengeFriend: function() {
		var friend = this.options.friends[parseInt($(event.target).val())];
		var current_user = this.options.current_user;
		var users = this.options.users;
		var challenges = this.options.challenges;
		var current_time = new Date();
		var new_challenge, new_user;
		
		if (users.where({uid: friend['id']})[0] && !(users.where({uid: friend['id']})[0].get('is_temp_user'))) {
			var user = users.where({uid: friend['id']})[0];
			new_challenge = challenges.create({challenger_id: current_user.get('id'), user_id: user.get('id'), time_created: current_time.getTime()});
			Backbone.history.navigate('create/t/' + new_challenge.get('id'), true);
		} else {
			if (users.where({uid: friend['id']})[0]) {
				new_user = users.where({uid: friend['id']})[0];
			} else {
				var name = friend['name'].split(' ');
				new_user = users.create({uid: friend['id'], provider: 'facebook', name: friend['name'], first_name: name[0], last_initial: name[1][0].toUpperCase()});
			}
			this.feedPost(new_user);
		}
	},
	
	feedPost: function(user) {
		var current_user = this.options.current_user;
		var challenges = this.options.challenges;
		var users = this.options.users;
		var current_time = new Date();
		var new_challenge;
        var obj = { method: 'feed', link: 'http://www.fusegap.com', name: 'fuseGap', to: user['id'], from: current_user.get('uid')};

		function callback(response) 
		{
			if (!response) {

			} else {
       			new_challenge = challenges.create({challenger_id: current_user.get('id'), user_id: user.get('id'), time_created: current_time.getTime()});
				Backbone.history.navigate('create/t/' + new_challenge.get('id'), true);
			}
        }
		FB.ui(obj, callback);
	},
	
	arrangeFriends: function() {
		var friends = this.options.friends;
		var length = friends.length;
		var challenges = this.options.challenges;
		var current_user = this.options.current_user;
		var users = this.options.users;
		var count = 0;
		
		for (i = 0; i < length; i++) {
			var user;
			if (users.where({uid: friends[i - count]['id'], provider: 'facebook'})[0]) {
				user = users.where({uid: friends[i - count]['id'], provider: 'facebook'})[0];
				if (challenges.where({user_id: user.get('id'), challenger_id: current_user.get('id'), is_finished: false})[0] || 
					challenges.where({user_id: current_user.get('id'), challenger_id: user.get('id'), is_finished: false})[0]) {
					friends.splice(i - count, 1);
					count = count + 1;
				}
			} 
		}
		friends.sort(function(a,b) {
			var nameA = a['name'].toLowerCase();
			var nameB = b['name'].toLowerCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameB < nameA) {
				return 1;
			}
			return 0;
		});
	}
});