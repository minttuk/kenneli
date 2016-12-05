# start MySQL. Will create an empty database on first start
$ mysql-ctl start

# kirjaudu mysql:ään root käyttäjällä
mysql -u root




create database kennel;

use kennel;

create table user (
id int not null auto_increment,
firstname varchar(40),
lastname varchar(40),
email varchar(255) not null,
password varchar(255) not null,
address varchar(255),
zipcode int(5),
phonenumber int(25),
Primary key (id)
);

create table dog (
id int not null auto_increment,
name varchar(40) not null,
owner int not null,
image varchar(255),
description varchar(255),
Primary key (id),
foreign key (owner) references user(id)
);

create table message (
id int not null auto_increment,
title varchar(255),
message varchar(500),
user_id int not null,
dog_id int not null,
posttime TIMESTAMP,
Primary key (id),
foreign key (user_id) references user(id),
foreign key (dog_id) references dog(id)
);

insert into user (firstname, lastname, email, password) values ("Leena", "Jokiaho", "testi@testi.fi", "testipassword");
insert into user (firstname, lastname, email, password) values ("Maija", "Honka", "testi2@testi2.fi", "testi2password");

insert into dog (name, owner, description) values ("Fanni", "2", "Fanni on hieman ujo, mutta erittäin älykäs koira.");
insert into dog (name, owner, description) values ("Ruffe", '1', "Ruffe on kaikkien kaveri");
insert into dog (name, owner, description) values ("Musti", "1", "Kiltti koira.");

insert into message (title, message, user_id, dog_id) values ("Fannin eka päivitys", "Päivitys nro 1", "2", "1");
insert into message (title, message, user_id, dog_id) values ("Mustin eka päivitys", "Päivitys nro 2", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Ruffen eka päivitys", "Päivitys nro 3", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Fannin toka päivitys", "Päivitys nro 4", "2", "1");
insert into message (title, message, user_id, dog_id) values ("Ruffen toka päivitys", "Päivitys nro 5", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Ruffen kolmas päivitys", "Päivitys nro 6", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Fannin kolmas päivitys", "Päivitys nro 7", "2", "1");
insert into message (title, message, user_id, dog_id) values ("Mustin toka päivitys", "Päivitys nro 8", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Mustin kolmas päivitys", "Päivitys nro 9", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Mustin neljäs päivitys", "Päivitys nro 10", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Ruffen neljäs päivitys", "Päivitys nro 11", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Fannin neljäs päivitys", "Päivitys nro 12", "2", "1");