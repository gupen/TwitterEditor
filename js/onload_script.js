//jQueryの読み込み
var $ = jQuery = require("./jquery-2.1.4.js");

//parseしたjsonの中身
var json_list;

//選択したリスト番号(int)
var selected_list=0;

var login_userName;
var login_userIcon;
var login_userID;

//ツイートボックスの文字数
var CountStringNumber;
//TwitterEditor機能のファイル名
var EditFileName;

var client;


var Firebase =require("firebase");


$(function(){


	$("#header").css("background-color", "#EEE");

		//UserIDを取得する
		//15回/15分の制限あり
		//ローカルをまずはじめに見てなければ取りに行く感じで
		var fs = require('fs');
		//ローカルファイルを参照する処理．エラーがあればcatchして作成処理へ
		try{

			var Local_User_Data=SplitUsertxt();
			login_userID=Local_User_Data[0];

			if(Local_User_Data[1]=="undefined") {
				console.log("login_userName and login_userIcon are undefined");
					Get_UserName_UserIcon();
			}else{
					login_userIcon=Local_User_Data[1];
					login_userName=Local_User_Data[2];
			}

			selected_list=Local_User_Data[3];
			console.log("UserDataFile found");
			console.log(login_userID,login_userIcon,login_userName);

		}
		//ローカルファイルを作成する処理
		//ここにlogin_userIDの取得→login_userNameとlogin_userIconの取得の流れを書く
		catch(err){

			console.log("UserDataFile not found. Now create UserDataFile.")
			GetUserIDfrom_accountsettings();
			setTimeout(function(){
				Get_UserName_UserIcon();
			},1000);



		}




	//list一覧を取得する
	client.get('lists/list', function(error, list, response) {
		//console.log(list);
		json_list=JSON.parse(JSON.stringify(list));


		//取得したリストの一覧をドロップダウンに格納する
		Set_UserList(json_list);


	});

	function GetUserIDfrom_accountsettings(){
		client.get('account/settings', function(error, setting, response) {
						login_userID=setting.screen_name;
						console.log(login_userID);
				});
	}

	function Get_UserName_UserIcon(){
		client.get('users/show.json',{screen_name:login_userID},function(error,value,response){
					login_userName=value.name;
					login_userIcon=value.profile_image_url;
					console.log("userName is",login_userName);
					console.log("icon is",login_userIcon);
					var fs = require('fs');
					var text = login_userID+"\n"+login_userIcon+"\n"+login_userName+"\n";
					fs.writeFile('User.txt', text);
				});
	}

	function SplitUsertxt(){
		var text = fs.readFileSync('User.txt', 'utf-8');
		var Local_User_Data=new Array();
		Local_User_Data=text.split("\n");

		return Local_User_Data
	}



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
