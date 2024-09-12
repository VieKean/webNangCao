import http from 'http';
import date from './date';
import { getPath, getParamsURL as get} from './getURL';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write(date() + "<br>");

    res.write(getPath(req) + "<br>");
    res.write(get(req) + "<br>");

    res.end('Hello KTPM0121, heslyly');
}).listen(8080);
