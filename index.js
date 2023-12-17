import config from './utils/config.js';
import app from './app.js';
import { info } from './utils/logger.js';

app.listen(config.PORT, () => {
	info(`Server running on port ${config.PORT}`);
});
