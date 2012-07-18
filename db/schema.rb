# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120717195527) do

  create_table "challenge_scores", :force => true do |t|
    t.integer  "a_id"
    t.integer  "b_id"
    t.integer  "a_wins"
    t.integer  "b_wins"
    t.integer  "ties"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "challenges", :force => true do |t|
    t.integer  "t_id"
    t.integer  "reason_id"
    t.integer  "challenger_id"
    t.integer  "user_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.integer  "challenger_score", :default => 0
    t.integer  "user_score",       :default => 0
    t.boolean  "is_finished",      :default => false
    t.integer  "time_created"
  end

  create_table "quiz_qs", :force => true do |t|
    t.integer  "t_id"
    t.integer  "source_id"
    t.string   "question"
    t.string   "correct"
    t.string   "wrong1"
    t.string   "wrong2"
    t.string   "wrong3"
    t.string   "wrong4"
    t.boolean  "is_approved", :default => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.integer  "score",       :default => 0
    t.integer  "reason_id"
  end

  create_table "quiz_tasks", :force => true do |t|
    t.integer  "t_id"
    t.integer  "reason_id"
    t.integer  "quiz_q_id"
    t.integer  "user_id"
    t.string   "answer"
    t.integer  "score"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.float    "time"
  end

  create_table "reasons", :force => true do |t|
    t.integer  "t_id"
    t.string   "title"
    t.text     "description"
    t.boolean  "is_pro"
    t.integer  "score",       :default => 0
    t.boolean  "is_approved", :default => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  create_table "sources", :force => true do |t|
    t.integer  "t_id"
    t.integer  "reason_id"
    t.text     "description"
    t.boolean  "is_approved", :default => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.text     "url"
  end

  create_table "ts", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "source_url"
    t.string   "url"
    t.integer  "score",          :default => 0
    t.boolean  "is_approved",    :default => false
    t.integer  "current_events", :default => 0
    t.integer  "education",      :default => 0
    t.integer  "finance",        :default => 0
    t.integer  "health",         :default => 0
    t.integer  "politics",       :default => 0
    t.integer  "tech",           :default => 0
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
    t.integer  "score",          :default => 0
    t.integer  "level",          :default => 0
    t.integer  "current_events", :default => 0
    t.integer  "education",      :default => 0
    t.integer  "finance",        :default => 0
    t.integer  "health",         :default => 0
    t.integer  "politics",       :default => 0
    t.integer  "tech",           :default => 0
    t.boolean  "is_admin",       :default => false
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
    t.string   "first_name"
    t.string   "last_initial"
    t.boolean  "is_temp_user",   :default => true
  end

end
