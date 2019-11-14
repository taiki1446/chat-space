json.array! @messages do |message|
  json.content message.content
  json.image_url message.image.url
  json.created_at message.created_at
  json.user_name message.user.name
  json.message_id message.id
end