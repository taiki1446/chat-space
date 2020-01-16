# 簡易チャットアプリ
http://52.193.71.36/
### 作成目的
以下の点について重点的に学習を行うため。  
・railsの基本的な機能  
・一般的なメッセージ投稿機能付きwebアプリの作成
### 環境
・Rails 5.0.7.2  
・ruby 2.5.1  
・MySQL    
・AWS
### 機能概要
・メッセージ投稿  
・グループ作成、編集    
### 使用した技術
・非同期通信（Ajax）  
・自動更新（メッセージ自動読み込み）  
・Haml  
・scss  
・gem : devise, pry-rails, font-awesome-rails, carrierwave, mini_magick, fog-aws


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many  :groups,  through:  :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many  :users,  through:  :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
