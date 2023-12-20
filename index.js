const config = require('./utils/config');
const app = require('./app');
const { info } = require('./utils/logger');

app.listen(config.PORT, () => {
	info(`Server running on port ${config.PORT}`);
});
