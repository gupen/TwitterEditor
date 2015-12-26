//jQueryの読み込み
var $ = jQuery = require("./jquery-2.1.4.js");

//parseしたjsonの中身
var json_list;

//選択したリスト番号(int)
var selected_list=0;

var login_userName;
var login_userIcon=0;
var login_userID;

//ツイートボックスの文字数
var CountStringNumber;
//TwitterEditor機能のファイル名
var EditFileName;

var client;

var Firebase =require("firebase");

var dataStore = new Firebase('FirebaseのURLをここに書く');
//var dataStore = new Firebase('https://rinattertest.firebaseio.com/');


$(function(){


	$("#header").css("background-color", "#EEE");

		//UserIDを取得する
		//15回/15分の制限あり
		//ローカルをまずはじめに見てなければ取りに行く感じで
		var fs = require('fs');
		try{
			console.log("UserDataFile found");
			var text = fs.readFileSync('User.txt', 'utf-8');
			var Local_User_Data=new Array();
			Local_User_Data=text.split("\n");
			login_userID=Local_User_Data[0];
			login_userIcon=Local_User_Data[1];


		}catch(err){
			console.log("file not found→now Watch LocalUserData")
			client.get('account/settings', function(error, setting, response) {
	            login_userID=setting.screen_name;
	            console.log(login_userID);
							var fs = require('fs');
							var text = login_userID+"\n";
							fs.writeFile('User.txt', text);
	        });

		}




	//list一覧を取得する
	client.get('lists/list', function(error, list, response) {
		//console.log(list);
		json_list=JSON.parse(JSON.stringify(list));


		//取得したリストの一覧をドロップダウンに格納する
		Set_UserList(json_list);


});










	setTimeout(function(){

		client.get('users/show.json',{screen_name:login_userID},function(error,value,response){
			login_userName=value.name;
			login_userIcon=value.profile_image_url;
			console.log("icon is",login_userIcon);
			var fs = require('fs');
			var text = login_userID+"\n" +login_userIcon+"\n";
			fs.writeFile('User.txt', text);
		});


	},1000);






	function Set_UserList(value_json){
		var select=document.getElementById('select');

		for (var i in value_json){
			var option = document.createElement('option');

			option.setAttribute('value', i);
		    option.innerHTML = value_json[i].name;

	    	ListOverview.appendChild(option);
	}
	}


	//デバッグする関数を作ろうとしてる
	//引数に処理の内容と対象
	function Debug(which_function,value){
		switch (which_function){
			case 'view_list_overview':
				console.log("in");
				console.log(value.length)
				for(var i=0;i<value.length;i++){
					console.log(i+":"+value[i].name+" "+value[i].id);
				}
			break;

			case 'view_UserID_and_Icon':
					console.log(value,value.name,value.profile_image_url);

		}
	}


});
