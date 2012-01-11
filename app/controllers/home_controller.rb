class HomeController < ApplicationController
  
  skip_before_filter :verify_authenticity_token, :only => :authenticate
  
  def index
  end

  def send_message
    message = params[:message]
    Pusher['instant-messaging-channel'].trigger('new-message', {:message => message, :member => current_user.email}) unless message.blank?
    head :ok
  end
  
  def authenticate
    if user_signed_in?
      response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {:user_id => current_user.id, :user_info => { :email => current_user.email}})
      p response.as_json
      render :json => response
    else
      render :text => "Not authorized", :status => '403'
    end
  end
end
