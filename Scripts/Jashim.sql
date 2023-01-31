Use master
IF DB_ID('CRUDDB') IS NOT NULL
DROP Database CRUDDB
CREATE DATABASE CRUDDB;
GO

USE CRUDDB;
GO

--Creating Necessary Tables
CREATE TABLE Country (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE City (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    CountryId INT NOT NULL,
    FOREIGN KEY (CountryId) REFERENCES Country(Id)
);
GO

CREATE TABLE Language (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE Person (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
	CountryId INT NOT NULL DEFAULT(1),
	CityId INT NOT NULL DEFAULT(1),
    LanguageSkills NVARCHAR(1000),
    DateOfBirth DATE NOT NULL,
    ResumeFileName NVARCHAR(100),
	FOREIGN KEY (CountryId) REFERENCES Country(Id),
    FOREIGN KEY (CityId) REFERENCES City(Id)
);
GO

CREATE TABLE PersonLanguage (
    PersonId INT NOT NULL,
    LanguageId INT NOT NULL,
    PRIMARY KEY (PersonId, LanguageId),
    FOREIGN KEY (PersonId) REFERENCES Person(Id),
    FOREIGN KEY (LanguageId) REFERENCES Language(Id)
);
GO


--Inserting Some Data

--Insert sample data into the Country table
INSERT INTO Country (Name) VALUES ('Bangladesh');
INSERT INTO Country (Name) VALUES ('USA');
INSERT INTO Country (Name) VALUES ('Canada');
INSERT INTO Country (Name) VALUES ('Mexico');
GO

--Insert sample data into the City table
INSERT INTO City (Name, CountryId) VALUES ('Dhaka', 1);
INSERT INTO City (Name, CountryId) VALUES ('Chattogram', 1);
INSERT INTO City (Name, CountryId) VALUES ('Rangpur', 1);
INSERT INTO City (Name, CountryId) VALUES ('Khulna', 1);
INSERT INTO City (Name, CountryId) VALUES ('New York', 2);
INSERT INTO City (Name, CountryId) VALUES ('Los Angeles', 2);
INSERT INTO City (Name, CountryId) VALUES ('Chicago', 2);
INSERT INTO City (Name, CountryId) VALUES ('Vancouver', 3);
INSERT INTO City (Name, CountryId) VALUES ('Toronto', 3);
INSERT INTO City (Name, CountryId) VALUES ('Mexico City', 4);
INSERT INTO City (Name, CountryId) VALUES ('Guadalajara', 4);
GO


--Insert sample data into the Language table
INSERT INTO Language (Name) VALUES ('C#');
INSERT INTO Language (Name) VALUES ('C++');
INSERT INTO Language (Name) VALUES ('Java');
INSERT INTO Language (Name) VALUES ('PHP');
INSERT INTO Language (Name) VALUES ('SQL');
GO

--Insert sample data into the Person table
INSERT INTO Person (Name, CountryId, CityId, LanguageSkills, DateOfBirth, ResumeFileName) VALUES ('Jashim Uddin', 1, 2, 'C#, SQL', '2000-01-01', 'JashimResume.pdf');
INSERT INTO Person (Name, CountryId, CityId, LanguageSkills, DateOfBirth, ResumeFileName) VALUES ('John Doe', 2, 1, 'C#, C++', '2000-01-01', 'JohnDoeResume.pdf');
INSERT INTO Person (Name, CountryId, CityId, LanguageSkills, DateOfBirth, ResumeFileName) VALUES ('Jane Smith', 3, 1, 'C#, Java', '1995-03-15', 'JaneSmithResume.doc');
GO

--Insert sample data into the PersonLanguage table
INSERT INTO PersonLanguage (PersonId, LanguageId) VALUES (1, 1);
INSERT INTO PersonLanguage (PersonId, LanguageId) VALUES (1, 2);
INSERT INTO PersonLanguage (PersonId, LanguageId) VALUES (2, 1);
INSERT INTO PersonLanguage (PersonId, LanguageId) VALUES (2, 3);
GO


--Store Procedure for CRUD for Persons

--Stored procedure for getting all persons
CREATE PROCEDURE GetAllPersons
AS
BEGIN
    SELECT * FROM Person
END
GO

--Stored procedure for getting a person by ID
CREATE PROCEDURE GetPersonById
    @Id INT
AS
BEGIN
    SELECT * FROM Person WHERE Id = @Id
END
GO

--Stored procedure for inserting a new person
CREATE PROCEDURE InsertPerson
    @Name NVARCHAR(50),
    @CountryId INT,
    @CityId INT,
    @LanguageSkills NVARCHAR(MAX),
    @DateOfBirth DATE,
    @ResumeFileName NVARCHAR(50)
AS
BEGIN
    INSERT INTO Person (Name, CountryId, CityId, LanguageSkills, DateOfBirth, ResumeFileName)
    VALUES (@Name, @CountryId, @CityId, @LanguageSkills, @DateOfBirth, @ResumeFileName)
END
GO

--Stored procedure for updating a person
CREATE PROCEDURE UpdatePerson
    @Id INT,
    @Name NVARCHAR(50),
    @CountryId NVARCHAR(50),
    @CityId NVARCHAR(50),
    @LanguageSkills NVARCHAR(MAX),
    @DateOfBirth DATE,
    @ResumeFileName NVARCHAR(50)
AS
BEGIN
    UPDATE Person
    SET Name = @Name, CountryId = @CountryId, CityId = @CityId, LanguageSkills = @LanguageSkills, DateOfBirth = @DateOfBirth, ResumeFileName = @ResumeFileName
    WHERE Id = @Id
END
GO

--Stored procedure for deleting a person
CREATE PROCEDURE DeletePerson
    @Id INT
AS
BEGIN
    DELETE FROM Person WHERE Id = @Id
END
GO


-- Store Procedure for file handling

--Stored procedure for inserting a new resume file
CREATE PROCEDURE InsertResumeFile
    @PersonId INT,
    @FileName NVARCHAR(50),
    @FileContent VARBINARY(MAX)
AS
BEGIN
    INSERT INTO ResumeFile (PersonId, FileName, FileContent)
    VALUES (@PersonId, @FileName, @FileContent)
END
GO



--Stored procedure for getting a resume file by ID
CREATE PROCEDURE GetResumeFileById
    @Id INT
AS
BEGIN
    SELECT * FROM ResumeFile WHERE Id = @Id
END
GO

--Stored procedure for getting a resume file by person ID
CREATE PROCEDURE GetResumeFileByPersonId
    @PersonId INT
AS
BEGIN
    SELECT * FROM ResumeFile WHERE PersonId = @PersonId
END
GO


--Stored procedure for deleting a resume file
CREATE PROCEDURE DeleteResumeFile
    @Id INT
AS
BEGIN
    DELETE FROM ResumeFile WHERE Id = @Id
END
GO


SELECT * FROM Country
SELECT * FROM City
SELECT * FROM Language
SELECT * FROM PersonLanguage
SELECT * FROM Person
GO
