TwitterEditor
====

Twitterっぽく進捗を生み出す
<https://drive.google.com/file/d/0B46aslgPvqVCMHdtbk9HaEFTNUE/view?usp=sharing>

##概要
Electron+Firebase作られたTwitter感覚でガンガン進捗を生み出すエディターです．
filenameを記入し，Twitterっぽく執筆(Editボタン or Shift+Enter)していけばFirebaseに進捗がストックされていきます．
作った進捗はtxtでダウンロードできます．

##使う前に
oauth.js:19と20行目にconsumerkeyとconsumersecretkeyを入れてください．
onload_script.js:23行目にFirebaseのURLを入れてください(取得するのがめんどくさい人は１行下のテスト用の物を使ってください)．


##ボタンの説明
Shift+Enter → Firebaseにテキストボックスの内容を送る．そして，TLっぽく表示します．
Editボタン →  Firebaseにテキストボックスの内容を送る．そして，TLっぽく表示します．
Tweetボタン  →　テキストボックスの内容をTweetします．
TLボタン →　あなたのホームTLを表示します．
ListTLボタン →　プルダウンで選択したリストTLを表示します
進捗を見るボタン  →　Firebaseにストックした進捗を見ます．filenameの指定が必要です．
進捗を吐き出すボタン  →　Firebaseにストックした進捗をtxtで吐き出します．filenameの指定が必要です．
AutoTL　→　チェックするとタイムラインが自動更新されます，1回/1分


##動かない時
Reloadしてみてください．回線状況によっては処理が前後してしまいうまくいかないことがあります（近日修正予定）
初回起動以降，ローカルに"User.txt"と"OAuth.txt"が作成されます．
-User.txtは１行目にtwitterのID,2行目にアイコン画像のURLが記載されています．
-Oauth.txtは1行目にあなたのconsumerkey,2行目にあなたのconsumersecretkeyが記載されています．
-これらの何かが上手く記載されていない時は，手動で入力すると動きます．
