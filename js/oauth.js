'use strict';
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');
var Twitter = require('twitter');
var OAuth = require('oauth').OAuth;

var authUrl = "https://api.twitter.com/oauth/authenticate?oauth_token=";


var user_oauth_access_token;
var user_oauth_access_token_secret;

var consumerkey="ここにConsumerKeyを書く";
var consumersecret="ここにConsumerSecretKeyを書く";

var oauth = new OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	consumerkey,
	consumersecret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

var twitter = require('twitter');


$(function(){
	//ローカルファイルが存在している，かつ中身がある→ローカル認証
	//無い→OAuth認証
	var fs = require('fs');
	try{
		console.log("file found");
		var text = fs.readFileSync('OAuth.txt', 'utf-8');
		var local_user_token=new Array();
		local_user_token=text.split("\n");
		twitter = require('twitter');
		Local_Twitter_login(local_user_token[0],local_user_token[1]);





	}catch(err){
		console.log("file not found→now OAuth Login")
		OAuth_Twitter_Login();

	}

});


function OAuth_Twitter_Login(){


	oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
		if(error) {
			console.error(error);
			return;
		}

		//console.log('oauth_token :' + oauth_token);
		//console.log('oauth_token_secret :' + oauth_token_secret);
		var url = authUrl + oauth_token;
		var loginWindow = new BrowserWindow({width: 800, height: 600});
		loginWindow.webContents.on('will-navigate', function (event, url) {
			var urlinfo = require('url').parse(url, true);
			if(urlinfo.query.oauth_verifier) {
				oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, urlinfo.query.oauth_verifier, function(error, oauth_access_token, oauth_access_token_secret) {
					if(error) {
						console.error(error);
						return;
					}
					user_oauth_access_token=oauth_access_token;
					user_oauth_access_token_secret=oauth_access_token_secret;
					var fs = require('fs');
					var text = user_oauth_access_token+"\n"+user_oauth_access_token_secret+"\n";
					fs.writeFile('OAuth.txt', text);

					loginWindow.close();
				});
			} else {
				loginWindow.close();
			}

			loginWindow.on('close', function(event){
				event.preventDefault();
			});

		});

		loginWindow.loadUrl(url);




	});


}


function Local_Twitter_login(user_oauth_access_token,user_oauth_access_token_secret){
	console.log("in local login",user_oauth_access_token,"\n",user_oauth_access_token_secret);
    		client = new twitter({
			consumer_key: consumerkey,
			consumer_secret: consumersecret,
			access_token_key:user_oauth_access_token,
			access_token_secret:user_oauth_access_token_secret
		});



    		return client;
		}

function Twitter_login(user_oauth_access_token,user_oauth_access_token_secret){
	console.log("Twitter_login\n",user_oauth_access_token,user_oauth_access_token_secret);
		client = new twitter({
		consumer_key: consumerkey,
		consumer_secret: consumersecret,
		access_token_key:user_oauth_access_token,
		access_token_secret:user_oauth_access_token_secret
	});
	}




$(function(){



    var RegisterButton = $('#RegisterButton');
    RegisterButton.click(function(){
    	console.log("in RegisterButton Function");
    	location.reload();


    });



});
