import connect from 'connect';
import { dirname } from 'path';
import serveStatic from 'serve-static';
console.log(dirname('.') + "/")
connect().use(serveStatic(dirname('.') + "/")).listen(8080, function () {
	console.log('Server running on 8080...');
});

