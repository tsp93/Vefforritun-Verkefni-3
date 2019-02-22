CREATE TABLE applications (
  id serial primary key,
  name varchar(64) not null,
  email varchar(64) not null,
  phone int not null,
  text text not null,
  job varchar(64) not null,
  processed boolean default false,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);

CREATE TABLE users (
  id serial primary key,
  name varchar(64) not null,
  email varchar(64) not null,
  username varchar(64) unique not null,
  password text not null,
  admin boolean default false
);
