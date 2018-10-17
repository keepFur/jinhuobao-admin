const http = require('http');
class Home {
    readNewsList(req, res) {
        const type = 'top';
        http.get('http://v.juhe.cn/toutiao/index?type=' + type + '&key=0966e25ae00d46d3e15a4a303d3f0031', resData => {
            resData.setEncoding('utf8');
            let rawData = '';
            resData.on('data', (chunk) => { rawData += chunk; });
            resData.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    res.send({
                        ret: 0,
                        data: parsedData
                    });
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }
}
module.exports = new Home();

