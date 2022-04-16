SELECT * FROM `studentd` 
WHERE Name LIKE 'S%'; // mane name s diye start hobe, pore ja thakuk.

SELECT * FROM `studentd` 
WHERE Name LIKE '%a'; // mane name er last okkhor a, age ja thakuk;


SELECT * FROM `studentd` 
WHERE Name LIKE '%a%'; // mane name er majhkhane okkhor a thaklei hobe , 
age pore ja thakuk;

SELECT * FROM `studentd` WHERE Name LIKE '__a%';
// mane first two char ja thakuk , 3rd char a holei hobe abong pore ja thukuk.