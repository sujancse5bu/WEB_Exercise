CREATE TABLE `lab3`.`Salesman` ( `S-ID` INT(10) NOT NULL , `Name` VARCHAR(10) NOT NULL , `City` VARCHAR(10) NOT NULL , `Commision` FLOAT(10) NOT NULL ) ENGINE = InnoDB;
INSERT INTO `Salesman` (`S-ID`, `Name`, `City`, `Commision`) VALUES ('5001', 'James', 'Paris', '0.15'), ('5002', 'Hong', 'New-York', '0.12');
INSERT INTO `Salesman` (`S-ID`, `Name`, `City`, `Commision`) VALUES ('5003', 'Kim', 'London', '0.18'), ('5004', 'Jong', 'Paris', '0.19');

CREATE TABLE `lab3`.`Customer` ( `C-ID` INT(10) NOT NULL , `C-Name` VARCHAR(10) NOT NULL , `City` VARCHAR(10) NOT NULL , `Grade` INT(10) NOT NULL , `S-ID` VARCHAR(10) NOT NULL ) ENGINE = InnoDB;
INSERT INTO `Customer` (`C-ID`, `C-Name`, `City`, `Grade`, `S-ID`) VALUES ('3002', 'Peter', 'New-York', '100', '5003'), ('3001', 'Ronald', 'Paris', '200', '5004')
INSERT INTO `Customer` (`C-ID`, `C-Name`, `City`, `Grade`, `S-ID`) VALUES ('3003', 'Hans', 'London', '', '5001'), ('3004', 'Tram', 'London', '300', '5003')