SongPop.Views.QuizTasksCreateChallenge = Backbone.View.extend({
	
	template: JST['quiz_tasks/create_challenge'],
	
	events: {
		'click #friend' : 'challengeFriend'
	},
	
	render: function() {
		this.arrangeFriends();
		this.user = this.options.users.create();
		this.challenge = this.options.challenges.create();
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
		var new_challenge = this.challenge;
		
		if (users.where({uid: friend['id']})[0] && !(users.where({uid: friend['id']})[0].get('is_temp_user'))) {
			var user = users.where({uid: friend['id']})[0];
			new_challenge.set({challenger_id: current_user.get('id'), user_id: user.get('id'), time_created: current_time.getTime()});
			new_challenge.save();
			Backbone.history.navigate('create/t/' + new_challenge.get('id'), true);
		} else {
			this.newUserChallenge(friend);
		}
	},
	
	feedPost: function(user) {
		var current_user = this.options.current_user;
        var obj = { method: 'feed', link: 'http://www.fusegap.com', name: 'fuseGap', to: user['id'], from: current_user.get('uid')};

		function callback(response) 
		{
			if (!response) {
				
			} else {
				this.newUserChallenge(user);
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
	},
	
	newUserChallenge: function(user) {
		var new_user = this.user, new_challenge = this.challenge;
		var users = this.options.users;
		var current_user = this.options.current_user;
		var challenges = this.options.challenges;
		var current_time = new Date();
		
		if (users.where({uid: user['id']})[0]) {
			new_user = users.where({uid: user['id']})[0];
		} else {
			var name = user['name'].split(' ');
			new_user.set({uid: user['id'], provider: 'facebook', name: user['name'], first_name: name[0], last_initial: name[1][0].toUpperCase()});
			new_user.save();
		}
		
		new_challenge.set({challenger_id: current_user.get('id'), user_id: new_user.get('id'), time_created: current_time.getTime()});
		new_challenge.save();
		Backbone.history.navigate('create/t/' + new_challenge.get('id'), true);
	}
});