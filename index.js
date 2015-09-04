var express = require('express'),
    cors = require('cors');
    app = express(),
    http = require('follow-redirects').http,
    https = require('follow-redirects').https;

app.use(cors());

app.get('/', function(req, res) {
  var url = req.query.url,
      secure = req.query.secure||false;

  if(secure){
    http
      .get(url, getUrl)
      .on('error', getUrlFailed);
  }else{
    https
      .get(url, getUrl)
      .on('error', getUrlFailed);
  } //end if

  function getUrl(response){
    res.send(response.fetchedUrls);
  } //end getUrl()

  function getUrlFailed(error){
    res.send(err);
  } //end geturlFailed()
});

app.listen(5000);

console.log('Listening on port 5000...');
