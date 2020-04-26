const request = require('request');
const cheerio = require('cheerio');

const HOST = 'https://t24.com.tr';
const PATH = '/yazarlar/';

const AUTHORS = ['murat-belge', 'mehmet-y-yilmaz'];

request(HOST + PATH + AUTHORS[1], (error, response, html) => {
	if(!error && response.statusCode == 200) {
		const $ = cheerio.load(html);

		$('._1fE_V').each((i, el) => {
		
			const date = $(el).find('._2J9OF.col-sm-3.col-xs-12').find('p').next().text();
			const headline = $(el).find('._31Tbh.col-sm-9.col-xs-12').find('h3').find('a').text();
			const link = $(el).find('._31Tbh.col-sm-9.col-xs-12').find('h3').find('a').attr('href');
			
			
			request(HOST + link, (error, response, html) => {
				if(!error && response.statusCode == 200) {
					const $ = cheerio.load(html);

					const h2 = $('._2teaB').find('h2').text()
					const mainBody = $('._1NMxy').find('div').html()
					console.log(h2, mainBody);
				}
			})

			console.log(date, headline, link);
		});
	}
});
