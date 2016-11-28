# start MySQL. Will create an empty database on first start
$ mysql-ctl start

# kirjaudu mysql:ään root käyttäjällä
mysql -u root




create database kennel;

use kennel;

create table user (
id int not null auto_increment,
email varchar(40) not null,
password varchar(40) not null,
Primary key (id)
);

create table dog (
id int not null auto_increment,
name varchar(40) not null,
owner int not null,
image varchar(40),
description varchar(40),
Primary key (id),
foreign key (owner) references user(id)
);

create table message (
id int not null auto_increment,
message varchar(40),
user_id int not null,
Primary key (id),
foreign key (user_id) references user(id)
);