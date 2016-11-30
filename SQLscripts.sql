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
title varchar(40),
message varchar(40),
user_id int not null,
dog_id int not null,
posttime TIMESTAMP,
Primary key (id),
foreign key (user_id) references user(id),
foreign key (dog_id) references dog(id)
);

insert into user (email, password) values ("testi@testi.fi", "testipassword");
insert into user (email, password) values ("testi2@testi2.fi", "testi2password");

insert into dog (name, owner, description) values ("musti", "1", "Kiltti koira.");

insert into message (title, message, user_id, dog_id) values ("Hei Koiraihmiset!", "Minulla on ilo kertoa tästä sivusta teille.", "1", "1");
insert into message (title, message, user_id, dog_id) values ("Musti karkasi", "Onko kukaan nähnyt mustia!!??!?", "1", "1");
insert into message (title, message, user_id, dog_id) values ("Musti", "MessageMusti", "1", "1");