// Create database 
--munuaaly
--SQL command

CREATE DATABASE ssss;




// Creating table
--manually
--sql command
CREATE TABLE student3 (
id INT NOT NULL AUTO_INCREMENT,
name varchar (100),
roll varchar (10),
phone varchar (20),
degree_id int,
PRIMARY Key (id),
UNIQUE (roll, phone),
Foreign key (degree_id) references degree(id)
);
