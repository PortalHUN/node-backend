CREATE TABLE users (
  ID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Username varchar(255) NOT NULL UNIQUE,
  Email varchar(255) NOT NULL UNIQUE,
  Password varchar(255) NOT NULL,
  Active tinyint UNSIGNED DEFAULT 0
);

CREATE TABLE roles (
  ID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  RoleName varchar(255) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
  ID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  UserID int(11) NOT NULL,
  RoleID int(11) NOT NULL,
  CONSTRAINT F_UserID FOREIGN KEY (UserID) REFERENCES users(ID),
  CONSTRAINT F_RoleID FOREIGN KEY (RoleID) REFERENCES roles(ID)
);

CREATE TABLE blood_pressure (
  ID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  UserID int(11) NOT NULL,
  Systolic int NOT NULL,
  Diastolic int NOT NULL,
  Date datetime NOT NULL,
  CONSTRAINT FB_UserID FOREIGN KEY (UserID) REFERENCES users(ID)
);

INSERT INTO users (Username,Email,Password,Active) VALUES ("Dummy", "Dummy+Dummy@dummy.com", "HelloWorld!", 1);
INSERT INTO roles (RoleName) VALUES ("Creator"), ("Administrator");
INSERT INTO user_roles (UserID, RoleID) VALUES (1,1), (1,2);
INSERT INTO blood_pressure (UserID, Systolic, Diastolic, Date) VALUES (1,120,90,NOW()), (1,140,99, NOW());