var express = require('express'),
    cors = require('cors');
    app = express(),
    http = require('follow-redirects').http,
    https = require('follow-redirects').https;

app.use(cors());

app.get('/', function(req, res) {
  var url=''; //holds the passed url parameter

  // Reconstruct all of the queries to make it into one query. We are 
  // not dissecting the queries, the proxied destination servers process them
  Object.keys(req.query).forEach(function(key){
    if(key!=='url')url+='&'+key+'=';
    url+=req.query[key];
  });
  
  // Now validate that query is acceptable, or even there before continuing
  if(url.indexOf('http')<0||!url.length){
    res.status(400).send({ error: 'Url parameter is missing or invalid.'  });
  }else if(url.indexOf('https')<0){
    http
      .get(url, getUrl)
      .on('error', getUrlFailed);
  }else{
    https
      .get(url, getUrl)
      .on('error', getUrlFailed);
  } //end if

  function getUrl(response){
    console.log(response.fetchedUrls);
    res.redirect(response.fetchedUrls[0])
  } //end getUrl()

  function getUrlFailed(error){
    res.send(err);
  } //end geturlFailed()
});

app.listen(5000);

console.log('Listening on port 5000...');
