# AdAttributionUnfurl
Follow all of a links redirects to distinguish all attribution resources and the final destination link

## Starting server
`npm start`

## Performing a request

```
$.ajax({
  url: 'http://localhost:5000/',
  type: 'GET',
  data: {
    'secure':false,
    'url':'http://trackdat.pinsightmedia.com/aff_c?offer_id=216&aff_id=32'
  }
}).done(function(res){
  console.log('Response: ',res);
}).fail(function(err){
  console.error(err);
});
```
