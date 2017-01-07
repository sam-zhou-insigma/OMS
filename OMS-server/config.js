
module.exports = {

	// Path to REST API
	apiPath: '/api/v1/OMS/',
	apiPort: 3000,

	// DB connection
	connectionString: process.env.DATABASE_URL || 'postgres://evol:love@localhost:5432/OMS',
	schema: 'oms',

	// Pagination and max rows
	pageSize: 50,
	csvSize: 1000,
	lovSize: 100,

	// Directory for files uploaded
	uploadPath: '../OMS-ui-react/public/pix/',

	// Console log
	consoleLog: true,

};
