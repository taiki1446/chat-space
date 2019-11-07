Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index'
  resources :messages
  resources :users, only: [:edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :create]
end
