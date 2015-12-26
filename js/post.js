var Array_shinchoku = [];

//テキストボックスに入力→ボタンクリック→Tweetする
//ボタンクリックするとテキストボックスの情報を取り出す
//
$(function(){


    //Tweetボタン
    var TweetButton = $('#TweetButton');
    TweetButton.click(function(){

        if(CountStringNumber>140){
            document.getElementById("CountString").innerHTML = "文字数オーバーです";
        }else{
            var textdata = document.fm.tweetText.value;

            client.post('statuses/update', {status: textdata}, function(error, tweet, response) {
                VirtualInterrupt_Timeline(textdata);
                $('textarea').val("");
            });
        }

    });




    //テキストエリアの内容をfirebaseへ
    //twitter editor
    var TwitterEditorButton = $('#TwitterEditorButton');
    TwitterEditorButton.click(function(){
        Edit();
    });

    //執筆機能
    function Edit(){

        Edit_newFunction();
        //↓デバッグ用
        //GetEditData_from_Firebse();
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

    function Delete_EditorView(){
        $("p#interrupt").remove();
    }




    //firebase内の執筆内容を取得し，配列に格納
    //進捗を表示する
    var ViewEditorButton = $('#ViewEditorButton');
    ViewEditorButton.click(function(){

        EditFileName=document.EditFileName.EditFileName.value;

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
        Set_Shinchoku_toArray();
        //ここでdelayが無いと多分配列に格納する前に出力してしまう
        ExportEditor(Array_shinchoku);
    });

    function Set_Shinchoku_toArray(){

        var messages = dataStore.child(login_userID+'/'+EditFileName);

        messages.once("value",function(dataSnapshot){
            dataSnapshot.forEach(function(childSnapshot){
                var key=childSnapshot.key();
                var childData=childSnapshot.val();
                if(childData.user_id==login_userName){
                    Array_shinchoku.push(childData.message);
                }
            });


        });



    }


    //配列(進捗)をtxtに出力する
    function ExportEditor(export_vale){
        var fileName="shinchoku.txt";
        fileName=document.EditFileName.EditFileName.value+".txt";
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
                Edit();
                return false;

            }
        }
    });


    var FirebaseTestButton = $('#FirebaseTestButton');
    FirebaseTestButton.click(function(){
        Edit_newFunction();
        GetEditData_from_Firebse();

    });


    //FirebaseからEdit_newFunction書式のデータを取得する
    //そしてconsoleに出力する
    function GetEditData_from_Firebse(){
        var messages = dataStore.child(login_userID+'/'+EditFileName);
        //messages.on('child_added', function(dataSnapshot) {
        messages.once("value",function(dataSnapshot){
            //var data = dataSnapshot.val();
            //console.log(data);
            dataSnapshot.forEach(function(childSnapshot){
                console.log(childSnapshot.val());
            });


        });

    }


    //執筆機能の改良版テスト
    function Edit_newFunction(){
        var textdata = document.fm.tweetText.value;
        var EditFileName = document.EditFileName.EditFileName.value;
        if(EditFileName=="") EditFileName="TwitterEditorMemo";

        dataStore.child(login_userID+'/'+EditFileName).push({
            'message':textdata,
            'user_id':login_userID
        });

        VirtualInterrupt_Timeline(textdata);
        Interrupt_EditorView(textdata);
        Reset_Textarea();
    }





});
