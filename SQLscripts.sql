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
image varchar(255) DEFAULT "default.png",
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


insert into dog (name, owner, image, title, description) values ("Fanni", "1", "1.png", "Fanni on hieman ujo, mutta erittäin älykäs koira.", "Fanni ei hötkyile jokaisen vieraan syliin vaan muutaman nuuhkaisun jälkeen jää mieluummin vahtimaan laumaa. Etsimisleikkejä Fanni rakastaa. Piiloitamme hänen purulelun, ja Fanni löytää sen nopeasti. Olemme Fannin kanssa kokeilleet myös agilitya, josta hän kovasti nauttii. Käymme siis jatkossakin! ");
insert into dog (name, owner, image,  title, description) values ("Ruffe", "2", "2.png", "Ruffe on kaikkien kaveri", "Ruffe on maailman ystävällisin koira, joka rakastaa uusia tuttavuuksia. Vahtikoiraa Ruffesta ei saa, koska se ottaa vieraan kuin vieraan häntä heiluen vastaan. Ruffe rakastaa käydä metsällä, jossa voi törmätä silloin tällöin jäniksiin, oraviin tai metsän muihin pikkueläimiin. Olemme käyneet Ruffen kanssa myös Agility-radalla, mutta sen kanssa on vielä opeteltavaa. Pienet esteet se osaa jo ylittää.");
insert into dog (name, owner, image, title, description) values ("Musti", "3", "3.png", "Musti on haastava koira", "Pienempänä Musti oli erittäin vilkas ja energinen koira, joka ei uuvahtanut sitten millään. Kasvettuaan isommaksi se on kuitenkin rauhoittunut huomattavasti. Musti on leikkisä ja herttainen, mutta omaa reviiriään se puolustaa erittäin ärhäkästi, jos tarve vaatii. Musti karkaa yleensä aina tilaisuuden tultua ulko-ovesta, joten paikallaolo ja luoksetulo ovat kaikkien kannalta tärkeitä käskyjä. Tämän koiran kanssa kärsivällisyys on kova sana!");

insert into message (title, message, user_id, dog_id) values ("Ulkoilua", "Tänään käytiin ulkoilemassa Nuuksiossa. Oli ihanan aurinkoinen ilma ja Fanni söi mustikoita suoraan puskista.", "1", "1");
insert into message (title, message, user_id, dog_id) values ("Musti maalla", "Olimme  Mustin kanssa koko viikonlopun maalla Asikkalassa. Musti nautti vapaana olosta ja tapasi paljon uusia eläintuttavuuksia.", "3", "3");
insert into message (title, message, user_id, dog_id) values ("Ruffe rannalla", "Kävimme tänään Ruffen kanssa rannalla. Heitimme keppiä veteen, mutta Ruffe ei uskaltanut uida. Kahlaamisesta se kyllä piti.", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Ruokavalio", "Olemme kokeilleet muutaman viikon kasvattajan suosittelemaa koiranruokaa. Fannin turkki voi hyvin ja uusi ruoka kaikenpuolin sopii hänelle loistavasti.", "1", "1");
insert into message (title, message, user_id, dog_id) values ("Ruffen ulvoi yöllä", "Mikähän siinä on, että Ruffe alkoi ulkova keskellä yötä? Onko teillä käynyt koskaan samaa?", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Koirapuistossa", "Ruffe pääsi tänään läheiseen koirapuistoon. Siellä oli paljon koiria, mutta Ruffe tuli tietysti kaikkien kanssa toimeen.", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Pentuetreffit", "Mukavaa oli nähdä teitä kaikkia pentuetreffeillä. Otetaan pian uudestaan!", "1", "1");
insert into message (title, message, user_id, dog_id) values ("Eläinlääkärissä", "Kävimme tänään Mustin kanssa eläinlääkärissä puolivuotistarkastuksessa. Kaikki oli kunnossa ja Musti käyttäytyi mallikkaasti.", "3", "3");
insert into message (title, message, user_id, dog_id) values ("Messuilla", "Saimme Mustin kanssa kutsun koiramessuille Messukeskukseen. Esittelin Mustin kehässä ja se käyttäytyi taas yhtä hienosti kuin aina.", "3", "3");
insert into message (title, message, user_id, dog_id) values ("Ontumista", "Musti ontui lenkillä vasenta etutassuaan. Täytyy seurata tilannetta.", "3", "3");
insert into message (title, message, user_id, dog_id) values ("Eroahdistus??", "Naapuri sanoi, että Ruffe on haukkunut kotona yksin ollessaan... Mitenköhän siitä pääsisi eroon? Vinkkejä?", "1", "2");
insert into message (title, message, user_id, dog_id) values ("Ihanat sadepäivät!", "Voi kun meidän Fanni tykkää kieriskellä mutalammikoissa! Ehkäpä itsekin kohta otan pienen mutakylvyn =) !", "1", "1");