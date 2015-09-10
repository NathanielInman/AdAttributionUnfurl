var express = require('express'),
    cors = require('cors');
    app = express(),
    http = require('follow-redirects').http,
    request = require('request'),
    https = require('follow-redirects').https;

process.on('uncaughtException', function(err){
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.error(err);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
});

app.use(cors());

app.get('/', function(req, res) {
  var url=''; //holds the passed url parameter

  // Reconstruct all of the queries to make it into one query. We are 
  // not dissecting the queries, the proxied destination servers process them
  Object.keys(req.query).forEach(function(key){
    if(key!=='url')url+='&'+key+'=';
    url+=req.query[key];
  });
  
  // Make sure to separate the secure protocol library as well as start out with
  // validating that the query is acceptable
  if(url.indexOf('http')<0||!url.length){
    res.status(400).send({ error: 'Url parameter is missing or invalid.'  });
  }else{
    request({
      followAllRedirects: true,
      url: url
    }, function (error, response, body) {
      var targetUrl = response.request.uri.href;
      if(targetUrl.indexOf('https://play.google.com/store/apps/')>=0){
        targetUrl.replace('https://play.google.com/store/apps/','market://');
      } //end if
      if (!error) {
        console.log('Request @'+(new Date()));
        console.log('-->'+targetUrl);
        res.redirect(targetUrl);
      }else{
        console.log(error);
      } //end if
    });
  } //end if
});

app.listen(5000);

console.log('Listening on port 5000...');
