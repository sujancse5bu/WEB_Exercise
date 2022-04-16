UPDATE `teacherwc` SET `Salary`=31000.00 WHERE ID=1002; //  salary update

UPDATE `teacherwc` 
SET `Name`='Shankar Shikari' WHERE ID=1002;
//  name update


UPDATE `teacherwc` 
SET `Salary`=`Salary`+5000 WHERE `Salary`>30000;