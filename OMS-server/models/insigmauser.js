module.exports = {
    id: 'insigma_Users',
    table: 'insigma_Users',
    titleField: 'UserName',
    searchFields: ['UserName', 'description'],
    fields: [
        {
            id: 'UserName', column: 'UserName', type: 'text', 
            label: 'Name', required: true,
            maxLength: 255,
            inMany: true
        },
        {
            id: 'Pwd', column: 'Pwd', type: 'text', 
            label: 'Pwd', 
            maxLength: 255
        },
    ]
};

/*
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
);*/