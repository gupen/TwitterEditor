var which_TL=null;

$(function(){

    //自分のhomeTLを取得して表示する
    var ViewTLButton = $('#ViewTLButton');
    ViewTLButton.click(function(){
        which_TL="home_TL"

        client.get('statuses/home_timeline', {screen_name:login_userID}, function(error, tweets, response) {
            var json=JSON.parse(JSON.stringify(tweets));
            view_Timeline(json);
        });


    });





    //リストを表示する
    var ViewListTLButton = $('#ViewListTLButton');
    ViewListTLButton.click(function(){
        //console.log(selected_list);
        //typeof selected_list[0];
        var list_id=json_list[selected_list].id;
        //console.log(list_id);
        which_TL=String(selected_list);
        console.log(which_TL);
        client.get('lists/statuses', {list_id : list_id}, function(error, tweets, response) {
            var json=JSON.parse(JSON.stringify(tweets));
            view_Timeline(json);
        });
    });


//TLを自動更新する(UserStreamではない)
$('#check1').change(function(){
  console.log("aa");
  if($('#check1').is(':checked')) {
    console.log("checked");
      setInterval(function(){
          console.log("Reload_TL");
          if(which_TL=="home_TL"){
              client.get('statuses/home_timeline', {screen_name: login_userID}, function(error, tweets, response) {
                  var json=JSON.parse(JSON.stringify(tweets));
                  view_Timeline(json);
              });
          }else if(which_TL=="null"){

          }else{
              var list_id=json_list[selected_list].id;
              client.get('lists/statuses', {list_id : list_id}, function(error, tweets, response) {
                  var json=JSON.parse(JSON.stringify(tweets));
                  view_Timeline(json);
              });
          }
      },60000);
    }
    else {
      console.log("not checked");
    }
  });









//ドロップダウンメニューから選択したvalueを取得する
var target = $("#ListOverview");
target.change(function(){
    if($("#ListOverview option:selected").attr("value") != "") {
        //console.log($("#list3 option:selected").attr("value"));
        selected_list=$('select[name="user_list"]').val();
        //console.log(selected_list);

    }
});


});


function Delete_Timeline(){
    $("div#TL").remove();
}



//取得したjsonからTL情報を取り出して画面上に表示する
function view_Timeline(tweet_json){
    Delete_Timeline();
    for(var i=0;i<tweet_json.length;i++){
        $("p.tweet").after("<div class=\"alert alert-info\" id='TL'><button class=\"close\" data-dismiss=\"alert\">&times;</button>"+"<img id=\"icon\" src="+tweet_json[i].user.profile_image_url+">"+tweet_json[i].user.name+":"+tweet_json[i].text+"</div>");
        $('#icon').height(30).width(30);
    }


}



function CountString( str ) {

      document.getElementById("CountString").innerHTML = str.length + "/140文字";
      CountStringNumber=str.length;

   }
