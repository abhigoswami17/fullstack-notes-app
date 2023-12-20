const info = (...params) => {
	console.log(...params);
};

const errorLog = (...params) => {
	console.error(...params);
};

module.exports = { info, errorLog };
