create database easywebsite;
use easywebsite;

create table users(
    ID int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255),
    password varchar(255)
);

create table websites(
	ID int PRIMARY KEY AUTO_INCREMENT,
    userID int,
    title varchar(255),
    theme varchar(255),
	description varchar(255),
    FOREIGN KEY (userID) REFERENCES users(ID)
);

CREATE TABLE stages(
    id int PRIMARY KEY AUTO_INCREMENT,
	websiteID int,
    stage int,
    code MEDIUMTEXT,
    FOREIGN KEY (websiteID) REFERENCES websites(ID)
);

INSERT INTO users(username,password)
VALUES ("admin","adminpassword");

INSERT INTO websites(userID,title,theme,description)
VALUES (1,"f1","f1","creating test");