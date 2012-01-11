// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

jQuery(function() {
	subscribeToPush();
})

function subscribeToPush() {
	Pusher.channel_auth_endpoint = 'home/authenticate'
	
	var pusher = new Pusher(jQuery('#instant-messaging').attr('data-pusher-key'));
	
	var messages_channel = pusher.subscribe('instant-messaging-channel');
	messages_channel.bind('new-message', function(data) {
		jQuery('#instant-messaging').append(data.member + " : " + data.message + "<br />");
	});
	
	var presence_channel = pusher.subscribe('presence-instant-messaging-channel');
	presence_channel.bind('pusher:subscription_succeeded', function(members) {
		console.log(members.count)
		members.each(function(member) {
			jQuery('#members-list').append("<div id='member_" + member.id + "'>" + member.info.email + "</div><br />");
		});
	});
	
	presence_channel.bind('pusher:member_added', function(member) {
		jQuery('#members-list').append("<div id='member_" + member.id + "'>" + member.info.email + "</div><br />");
	});
	
	presence_channel.bind('pusher:member_removed', function(member) {
		jQuery('#member_' + member.id).remove();
	});
}