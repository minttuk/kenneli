# start MySQL. Will create an empty database on first start
$ mysql-ctl start

# kirjaudu mysql:ään root käyttäjällä
mysql -u root

#passwords for users 1-> hash 2-> maijahonka 3-> patekoivisto



create database kennel;

use kennel;

create table user (
id int not null auto_increment,
firstname varchar(40),
lastname varchar(40),
email varchar(255) not null,
password varchar(255) not null,
address varchar(150),
zipcode varchar(5),
city varchar(40),
phonenumber varchar(40),
Primary key (id)
);

create table dog (
id int not null auto_increment,
name varchar(40) not null,
owner int null,
image varchar(255),
title varchar(255),
description varchar(1000),
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

insert into user (firstname, lastname, email, password, address, zipcode, city, phonenumber) values ("Leena", "Jokiaho", "hash@hash.fi", "$2y$10$r85x52ep7OvUuxtnJhozseNVNtE2BVdCypJzTO8UNClmMPlr2sjju", "Bulevardi 18", "00140", "Helsinki", "050 1234 5678");
insert into user (firstname, lastname, email, password, address, zipcode, city, phonenumber) values ("Maija", "Honka", "maija.honka@koira.fi", "$2y$10$dKQjF5/1v9H4NImAHySs8.lea7DsSooN7XedmCPdM9eOFZW57Q7Ga", "Hirsikuja 6", "02500", "Espoo", "040 554 7898");
insert into user (firstname, lastname, email, password, address, zipcode, city, phonenumber) values ("Pate", "Koivisto", "pate.koivisto@koira.fi", "$2y$10$ynhNbYXleX1CbB6OTSA8Y.lP5abFiqkG9pdaB456I3Dk0DTM7C68i", "Rapatie 59", "04850", "Vantaa", "044 697 3332");


insert into dog (name, owner, title) values ("Fanni", "1", "Fanni on hieman ujo, mutta erittäin älykäs koira.");
insert into dog (name, owner, title, description) values ("Ruffe", "2", "Ruffe on kaikkien kaveri", "Ruffe on maailman ystävällisin koira, joka rakastaa uusia tuttavuuksia. Vahtikoiraa Ruffesta ei saa, koska se ottaa vieraan kuin vieraan häntä heiluen vastaan. Ruffe rakastaa käydä metsällä, jossa voi törmätä silloin tällöin jäniksiin, oraviin tai metsän muihin pikkueläimiin. Olemme käyneet Ruffen kanssa myös Agility-radalla, mutta sen kanssa on vielä opeteltavaa. Pienet esteet se osaa jo ylittää.");
insert into dog (name, owner, title) values ("Musti", "3", "Kiltti koira.");

insert into message (title, message, user_id, dog_id) values ("Fannin eka päivitys", "Päivitys nro 1", "2", "1");
insert into message (title, message, user_id, dog_id) values ("Mustin eka päivitys", "Päivitys nro 2", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Ruffe rannalla", "Kävimme tänään Ruffen kanssa rannalla. Heitimme keppiä veteen, mutta Ruffe ei uskaltanut uida. Kahlaamisesta se kyllä piti.", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Fannin toka päivitys", "Päivitys nro 4", "2", "1");
insert into message (title, message, user_id, dog_id) values ("Ruffen ulvoi yöllä", "Mikähän siinä on, että Ruffe alkoi ulkova keskellä yötä? Onko teillä käynyt koskaan samaa?", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Koirapuistossa", "Ruffe pääsi tänään läheiseen koirapuistoon. Siellä oli paljon koiria, mutta Ruffe tuli tietysti kaikkien kanssa toimeen.", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Fannin kolmas päivitys", "Päivitys nro 7", "2", "1");
insert into message (title, message, user_id, dog_id) values ("Mustin toka päivitys", "Päivitys nro 8", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Mustin kolmas päivitys", "Päivitys nro 9", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Mustin neljäs päivitys", "Päivitys nro 10", "1", "3");
insert into message (title, message, user_id, dog_id) values ("Eroahdistus??", "Naapuri sanoi, että Ruffe on haukkunut kotona yksin ollessaan... Mitenköhän siitä pääsisi eroon? Vinkkejä?", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Fannin neljäs päivitys", "Päivitys nro 12", "2", "1");