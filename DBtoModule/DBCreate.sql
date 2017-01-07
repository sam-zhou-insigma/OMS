CREATE TABLE evol_demo.insigma_Users(	
	id serial primary key,
	UserName varchar(256) NOT NULL,
	LoweredUserName varchar(256) NOT NULL,
	MobileAlias varchar(16) NULL,	
    pwd varchar(128) NOT NULL,
	PasswordFormat int NOT NULL,
	PasswordSalt varchar(128) NOT NULL,
	MobilePIN varchar(16) NULL,
	Email varchar(256) NULL,
	LoweredEmail varchar(256) NULL,
	PasswordQuestion varchar(256) NULL,
	PasswordAnswer varchar(128) NULL,
    IsAnonymous boolean NOT NULL Default false,
	IsApproved bool NOT NULL default false,
	IsLockedOut bool NOT NULL default false,
	CreateDate timestamp NOT NULL,
	LastLoginDate timestamp NOT NULL,
    LastActivityDate timestamp NOT NULL,
	LastPasswordChangedDate timestamp NOT NULL,
	LastLockoutDate timestamp NOT NULL,
	FailedPasswordAttemptCount int NOT NULL,
	FailedPasswordAttemptWindowStart timestamp NOT NULL,
	FailedPasswordAnswerAttemptCount int NOT NULL,
	FailedPasswordAnswerAttemptWindowStart timestamp NOT NULL,
	Description text NULL
);

CREATE TABLE evol_demo.insigma_Roles(
	id serial primary key,
	RoleName varchar(256) NOT NULL,
	LoweredRoleName  varchar(256) NOT NULL,
	Description varchar(256) NULL
 );

CREATE TABLE evol_demo.insigma_UsersInRoles(
	UserId integer NOT NULL REFERENCES evol_demo.insigma_Users (id),
	RoleId integer NOT NULL REFERENCES evol_demo.insigma_Roles (id),
    PRIMARY KEY 
    (
        UserId ,
        RoleId 
    )
);

Create View evol_demo.insigma_view_TableInfo
as
SELECT
row_number() over(order by c.relname asc) as id,
c.relname as tableName,
a.attnum as columnNo,
a.attname AS fieldName,
t.typname AS typeName,
case when a.attlen<0 and a.atttypmod>4 then a.atttypmod-4 else a.attlen end  AS fieldLength,
a.attnotnull AS notNullFlag
        FROM
                pg_class c,
                pg_attribute a,
                pg_type t
        WHERE
                c.relname LIKE 'insigma_%' and c.relkind='r'
                and a.attnum > 0
                and a.attrelid = c.oid
                and a.atttypid = t.oid
