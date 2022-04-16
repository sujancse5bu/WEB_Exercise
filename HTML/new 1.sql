CREATE DATABASE Sujan_Mridha_18CSE019;
CREATE TABLE location 
(
    Location_Id INT (5),
    City VARCHAR (10),
    State VARCHAR (10),
    PRIMARY KEY (Location_Id)
);

INSERT INTO location (Location_Id,City,State)
VALUES (1001,'Chhoto Bighai','Patuakhali'),
(1002,'Rupatoli','Barisal'),
(1003,'Notullabad','Barisal'),
(1004,'New Market','Patuakhali'),
(1005,'Choumatha','Barisal');



CREATE TABLE department 
(
    D_Id INT (5),
    D_Name VARCHAR (20),
    PRIMARY KEY (D_Id)
    );
    
CREATE TABLE employee (
    Id INT (5) AUTO_INCREMENT,
    Name VARCHAR (20),
    Email VARCHAR (30),
    Phone VARCHAR (20),
    Adress VARCHAR (100),
    Salary INT (10),
    Supervisor INT (5) ,
    Dept_No INT (5),
    Join_Date VARCHAR (12),
    PRIMARY KEY (Id),
    FOREIGN KEY (Supervisor) REFERENCES employee(Id) ,
    FOREIGN KEY (Dept_No) REFERENCES department(D_Id)
    );

ALTER TABLE department ADD Manager INT (5);

ALTER TABLE department ADD Location_Id INT (5);

ALTER TABLE department
ADD FOREIGN KEY (Manager) REFERENCES employee(Id);

ALTER TABLE department
ADD FOREIGN KEY (Location_Id) REFERENCES location(Location_Id);

CREATE TABLE project (
    Project_Id INT (5),
    P_Name VARCHAR (20),
    Dept INT (5),
    PRIMARY KEY (Project_Id),
    FOREIGN KEY (Dept) REFERENCES department(D_Id)
    );

CREATE TABLE Works_On (
    E_Id INT (5),
    P_Id INT (5),
    Hours INT (5),
    FOREIGN KEY (E_Id) REFERENCES employee(Id),
    FOREIGN KEY (P_Id) REFERENCES project(Project_Id)
    );

INSERT INTO department (D_Id,D_Name)
VALUES (1,'CSE'),
(2,'PHI');

INSERT INTO employee
(Name,	Email,	Phone,	Adress,	Salary,	Dept_No, Join_Date)
VALUES 
('Sujan Mridha','sujanm.cse5.bu@gmail.com','+8801736073878','Chhoto Bighai, Patuakhali',50000,1,'07-01-2018'),
('Tarikul Islam','tarik.cse5.bu@gmail.com','+8801736073879','Pirojpur',50000,1,'07-01-2018');

INSERT INTO project(Project_Id, P_Name, Dept) 
VALUES (1,'Calculator',1),
(2,'Voltage Converter',2)
;


INSERT INTO works_on(E_Id, P_Id, Hours) VALUES (3,1,5),
(4,2,5);
UPDATE department SET Manager=3,Location_Id=1001
WHERE D_Id=1;

UPDATE department SET Manager=4,Location_Id=1002
WHERE D_Id=2;

UPDATE employee SET Supervisor=4
WHERE Id=3;

UPDATE employee SET Supervisor=3
WHERE Id=4;

