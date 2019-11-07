Rails.application.routes.draw do
  devise_for :users
  root to: 'messages#index'
  resources :messages
  resources :users, only: [:edit, :update]
end
