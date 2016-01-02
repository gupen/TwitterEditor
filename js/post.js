var Array_shinchoku = [];

//テキストボックスに入力→ボタンクリック→Tweetする
//ボタンクリックするとテキストボックスの情報を取り出す
//
$(function(){




    //Tweetボタン
    var TweetButton = $('#TweetButton');
    TweetButton.click(function(){

        //文字数が140文字を超えていないかチェック
        if(CountStringNumber>140){
           //140文字以上の場合，エラー文を表示＆Tweet不可
            document.getElementById("CountString").innerHTML = "文字数オーバーです";
        }else{
          //140文字以内の場合，テキストボックスの内容をTweet
            var textdata = document.fm.tweetText.value;

            client.post('statuses/update', {status: textdata}, function(error, tweet, response) {
                VirtualInterrupt_Timeline(textdata);
                $('textarea').val("");
            });
        }

    });




    //テキストエリアの内容をfirebaseへ
    //twitter editorボタン
    var TwitterEditorButton = $('#TwitterEditorButton');
    TwitterEditorButton.click(function(){
        Edit_newFunction();
    });



    //ファイル名取得
    function Get_EditFileName(){
    //ファイル名を取得，ファイル名が空の場合，デフォルトの値を代入する
      var filename = document.EditFileName.EditFileName.value;
      if(filename=="") filename="TwitterEditorMemo";

      return filename;
    }



    //執筆機能
    function Edit_newFunction(){
      //テキストボックスから文章を取得
        var textdata = document.fm.tweetText.value;
      //ファイル名を取得，ファイル名が空の場合，デフォルトの値を代入する
        EditFileName=Get_EditFileName();

      //ログインID/ファイル名に，テキストとログインIDを格納する
        dataStore.child(login_userID+'/'+EditFileName).push({
            'message':textdata,
            'user_id':login_userID
        });

      //仮想タイムラインに差し込む
        VirtualInterrupt_Timeline(textdata);
      //Editor画面にテキスト情報を差し込む
        Interrupt_EditorView(textdata);
      //テキストエリアをクリアする
        Reset_Textarea();
    }





    //テキストエリアをResetする
    function Reset_Textarea(){
        $('textarea').val("");
    }





    //テキストを擬似TLに差し込む
    function VirtualInterrupt_Timeline(vTweet){
        $("p.tweet").after("<div id='TL' class=\"alert alert-info\"><button class=\"close\" data-dismiss=\"alert\">&times;</button>"+"<img id=\"icon\" src="+login_userIcon+">"+login_userName+":"+vTweet+"</div>");
        $('#icon').height(30).width(30);
    }


    //テキストを執筆TLに差し込む
    function Interrupt_EditorView(vTweet){
        $("p.editor").after("<p id='interrupt'>"+vTweet+"</p>");
    }


　　 //Editor画面をクリアする
    function Delete_EditorView(){
        $("p#interrupt").remove();
    }




    //firebase内の執筆内容を取得し，配列に格納
    //進捗を表示する
    var ViewEditorButton = $('#ViewEditorButton');
    ViewEditorButton.click(function(){
        Array_shinchoku = [];
        Delete_EditorView();
      //ファイル名を取得，ファイル名が空の場合，デフォルトの値を代入する
        EditFileName=Get_EditFileName();

        var messages = dataStore.child(login_userID+'/'+EditFileName);
        messages.once("value",function(dataSnapshot){
            dataSnapshot.forEach(function(childSnapshot){
                // key will be "fred" the first time and "barney" the second time
                var key = childSnapshot.key();
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                if(childData.user_id==login_userID){
                    console.log(childSnapshot.val());
                    Array_shinchoku.push(childData.message);
                    Interrupt_EditorView(childData.message);
                }
            });


        });



    });

    //執筆内容をtxtで出力する
    var ExportEditorButton = $('#ExportEditorButton');

    ExportEditorButton.click(function(){
        //Set_Shinchoku_toArray();
        //ここでdelayが無いと多分配列に格納する前に出力してしまう
        ExportEditor(Array_shinchoku);
    });

    function Set_Shinchoku_toArray(){

      //ファイル名を取得，ファイル名が空の場合，デフォルトの値を代入する
        EditFileName=Get_EditFileName();

        var messages = dataStore.child(login_userID+'/'+EditFileName);

        messages.once("value",function(dataSnapshot){
            dataSnapshot.forEach(function(childSnapshot){
                var childData=childSnapshot.val();
                if(childData.user_id==login_userID){
                    Array_shinchoku.push(childData.message);
                }
            });
        });




    }


    //配列(進捗)をtxtに出力する
    function ExportEditor(export_vale){
      console.log(export_vale);
        var fileName;
        fileName=document.EditFileName.EditFileName.value+".txt";
        if(fileName==".txt") fileName="TwitterEditorMemo.txt";
        //console.log(fileName);
        var blob = new Blob([export_vale]);
        var url = window.URL || window.webkitURL;
        var blobURL = url.createObjectURL(blob);
        var a = document.createElement('a');
        a.download = fileName;
        a.href = blobURL;
        a.click();
    }




    $(window).keydown(function(e){
        if(event.shiftKey){
            if(e.keyCode === 13){
                Edit_newFunction();
                return false;

            }
        }
    });













});
