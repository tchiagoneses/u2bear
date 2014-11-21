"use strict";var u2bear=angular.module("u2bear.controllers",["u2bear.services"]),controllers={},API_PATH="/api";controllers.introCtrl=["$scope","$location","$timeout","Reqs","Consts","General",function(e,t,l,a,o,n){e.VIDEOS_DIRECTORY=o.VIDEOS_DIRECTORY,e.SONGS_DIRECTORY=o.SONGS_DIRECTORY,e.IMAGES_DIRECTORY=o.IMAGES_DIRECTORY,e.opts={maxResults:18,startIndex:1},e.displayedVids=[],e.searchPhrase="",e.maxIndex=0,e.stoppedLoading=!0,e.playerOn=!1,e.playerActive=!1,e.repeatOn=!1,e.superFullscreen=!1,e.hideCheetsheet=!0,e.backgroundPlayer=!1,e.cheetSheet=[{key:"Esc",desc:"Stop the current playing video and exit the player (also exit full screen)"},{key:"Spacebar",desc:"Pause and resume video"},{key:"f",desc:"Toogle in and out of full screen"},{key:"d",desc:"Search focus"},{key:"s",desc:"Stop the current video"},{key:"a",desc:"Toogle always on top"},{key:"?",desc:"Open this cheet sheet"},{key:"\\",desc:"Switch between the search categories"},{key:"F12",desc:"Open debugger"}],e.version=a.Pkg.version,e.playerPlay="fa-play",e.searchSwitch=o.searchOptions.youtube,e.localVids=[],e.localSongs=[],e.playList=[],e.currentlyDownloading={MAX_DOWNLOADS:3,currentSize:0},e.currListIndex=0,e.intervalue,e.searchModified=!1,e.win=a.Gui.Window.get(),a.Updater(e.win),e.loadLocalData=function(){a.Fs.readdir(o.VIDEOS_DIRECTORY,function(t,l){t?(console.log(t),e.localVids=[]):(e.localVids=l,e.search({charCode:13})),e.$apply()}),a.Fs.readdir(o.SONGS_DIRECTORY,function(t,l){t?(console.log(t),e.localSongs=[]):e.localSongs=l,e.$apply()})},e.initGui=function(){var t=new a.Gui.Tray({title:"U2Bear",icon:"u2bearFlat.png"}),l=new a.Gui.Menu;l.append(new a.Gui.MenuItem({type:"normal",label:"Open",click:function(){e.win.show(),e.win.focus()}})),e.aot=new a.Gui.MenuItem({type:"checkbox",label:"Always on top",click:function(){e.win.setAlwaysOnTop(this.checked)}}),l.append(e.aot),l.append(new a.Gui.MenuItem({type:"separator"})),l.append(new a.Gui.MenuItem({type:"normal",label:"Close",click:function(){e.win.close()}})),t.menu=l,e.win.on("minimize",function(){this.hide()}),t.on("click",function(){e.win.show(),e.win.focus()}),e.initStreamingServer()},e.initStreamingServer=function(){a.Http.createServer(function(t,l){var a=decodeURIComponent(t.url.replace("/",""));e.currentlyDownloading[a]?(l.writeHead(200,{"Transfer-Encoding":"chunked","Content-Type":"video/mp4","Accept-Ranges":"bytes"}),e.currentlyDownloading[a].video.pipe(l)):(l.writeHead(200,{"Content-Type":"text/html"}),l.end())}).listen(8433)},e.close=function(){e.win.close()},e.minimize=function(){e.win.minimize()},e.enterFullscreen=function(){e.win.isFullscreen?(clearInterval(e.intervalue),e.superFullscreen=!1,$("#player").unbind("mousemove")):e.intervalue=setInterval(e.fuller,3e3),e.win.toggleFullscreen()},e.fuller=function(){e.playerOn&&(e.superFullscreen=!0,e.$apply(),$("#player").mousemove(e.mouseMovement))},e.mouseMovement=function(){clearInterval(e.intervalue),e.superFullscreen=!1,e.$apply(),e.intervalue=setInterval(e.fuller,3e3)},e.toogleCheetSheet=function(){e.hideCheetsheet=!e.hideCheetsheet,l(function(){$("#cheetsheet .close").focus()},15)},e.switch=function(t){e.displayedVids=[],e.searchSwitch=t,e.search({charCode:13}),$("#search").focus()},e.playerRepeat=function(){e.repeatOn=!e.repeatOn},e.operateBackground=function(){e.backgroundPlayer=!e.backgroundPlayer},e.tooglePlayerStop=function(){e.tooglePlayer(o.playerOptions.STOP),e.currListIndex++},e.tooglePlayerPlay=function(){e.tooglePlayer(o.playerOptions.PLAY)},e.tooglePlayerPause=function(){e.tooglePlayer(o.playerOptions.PAUSE_PLAY)},e.playerBackward=function(){e.currListIndex>0&&(e.tooglePlayer(o.playerOptions.STOP),e.currListIndex--,e.playVideos())},e.nextVideo=function(){e.currListIndex<e.playList.length&&(e.tooglePlayer(o.playerOptions.STOP),e.currListIndex++,e.currListIndex==e.playList.length&&e.repeatOn&&(e.currListIndex=0)),e.playVideos()},e.tooglePlayer=function(t){t==o.playerOptions.STOP?e.playerOn&&(videojs("player").pause(),e.playerPlay="fa-play",e.playerActive=!1,e.playerOn=!1):t==o.playerOptions.PAUSE_PLAY?e.playerOn&&"fa-play"!=e.playerPlay?(videojs("player").pause(),"fa-pause"==e.playerPlay&&(e.playerPlay="fa-play")):(e.playerOn||(e.playerActive=!0),videojs("player").play(),"fa-play"==e.playerPlay&&(e.playerPlay="fa-pause"),e.playerOn=!0):t==o.playerOptions.PLAY&&(e.playerOn||(e.playerActive=!0),"fa-play"==e.playerPlay&&(e.playerPlay="fa-pause"),videojs("player").play(),e.playerOn=!0)},e.keyPreesed=function(t){27==t.keyCode?e.playerOn?e.tooglePlayer(o.playerOptions.STOP):e.hideCheetsheet?e.win.isFullscreen?e.enterFullscreen():e.win.close():e.hideCheetsheet=!0:220==t.keyCode?(t.preventDefault(),e.searchSwitch==o.searchOptions.youtube?e.switch(o.searchOptions.local):e.searchSwitch==o.searchOptions.local&&e.switch(o.searchOptions.youtube)):e.playerOn||t.keyCode!=o.arrows.DOWN?e.playerOn||t.keyCode!=o.arrows.UP?123==t.keyCode?e.win.showDevTools():$("#search").is(":focus")||(83==t.keyCode?e.tooglePlayer(o.playerOptions.STOP):68==t.keyCode?(t.preventDefault(),$("#search").focus()):32==t.keyCode?(t.preventDefault(),e.tooglePlayer(o.playerOptions.PAUSE_PLAY)):70==t.keyCode?e.enterFullscreen():65==t.keyCode?(e.aot.checked=!e.aot.checked,e.win.setAlwaysOnTop(e.aot.checked)):191==t.keyCode?e.toogleCheetSheet():e.playerOn||t.keyCode!=o.arrows.RIGHT?e.playerOn||t.keyCode!=o.arrows.LEFT||(t.preventDefault(),e.moveSelection(o.arrows.LEFT)):(t.preventDefault(),e.moveSelection(o.arrows.RIGHT))):(t.preventDefault(),e.moveSelection(o.arrows.UP)):(t.preventDefault(),e.moveSelection(o.arrows.DOWN))},e.search=function(t){if(13==t.charCode)if(e.searchModified=!1,e.stoppedLoading=!1,e.searchSwitch==o.searchOptions.youtube)if(0==e.searchPhrase.indexOf("https://www.youtube.com/watch?v=")||0==e.searchPhrase.indexOf("http://www.youtube.com/watch?v=")){var l=n.getParam(e.searchPhrase,"list");l?a.Request({url:"http://gdata.youtube.com/feeds/api/playlists/"+l+"?v=2&alt=json",json:!0},function(t,l,a){if(!t&&200===l.statusCode&&a.feed&&a.feed.entry){for(var o=[],r=0;r<a.feed.entry.length;r++){var i=a.feed.entry[r],s=i.content.src.substring(0,i.content.src.indexOf("?")).replace("v/","watch?v=");o.push({url:s,title:n.validateVideoName(i.title.$t),thumbnails:[{url:i.media$group.media$thumbnail[3].url}]})}e.showResaults(o),e.$apply()}}):a.Ytdl.getInfo(e.searchPhrase,function(t,l){t?console.log(t):(e.showResaults([{url:e.searchPhrase,title:n.validateVideoName(l.title),thumbnails:[{url:l.thumbnail_url}]}]),e.$apply())})}else e.opts.startIndex=1,a.Search(e.searchPhrase,e.opts,function(t,l){t||(e.showResaults($.map(l,function(t){return t.title=n.validateVideoName(t.title),e.currentlyDownloading[t.title]?(t.vidClass="downloading",t.overlay="active"):-1!=$.inArray(t.title+".mp4",e.localVids)?(t.vidClass="success",t.overlay="active"):-1!=$.inArray(t.title+".mp3",e.localSongs)&&(t.audClass="success",t.overlay="active"),t})),e.$apply())});else if(e.searchSwitch==o.searchOptions.local){for(var r=new RegExp(e.searchPhrase.replace(" ","|"),"i"),i=[],s=0;s<e.localVids.length;s++)e.localVids[s]&&r.test(e.localVids[s])&&i.push({title:e.localVids[s]});e.showResaults(i)}},e.showResaults=function(t){e.maxIndex=0,e.displayedVids=t,e.currHover=0,e.stoppedLoading=!0},e.moveSelection=function(t){var l=Math.floor($("#resultContainer").width()/$(".result").outerWidth(!0));t==o.arrows.RIGHT&&e.currHover<e.displayedVids.length-1?e.currHover++:t==o.arrows.LEFT&&e.currHover>0?e.currHover--:t==o.arrows.DOWN&&e.currHover<e.displayedVids.length-l?e.currHover+=l:t==o.arrows.UP&&e.currHover>=l&&(e.currHover-=l)},e.playLocalVideo=function(t){e.playList=[],e.currListIndex=0,e.tooglePlayer(o.playerOptions.STOP),e.playList.push({title:n.extractName(t.title)}),e.playVideos()},e.enqueLocalVideo=function(t){e.playList.push({title:n.extractName(t.title)}),e.playVideos()},e.playVideos=function(){if(e.currListIndex<e.playList.length){for(var t=e.playList[e.currListIndex],l=e.currListIndex;l<e.playList.length;l++)t=e.playList[l],a.Fs.existsSync(o.VIDEOS_DIRECTORY+t.title+".mp4")||e.downloadVideoParams(t,e.playVideos);e.playerOn||(a.Fs.existsSync(o.VIDEOS_DIRECTORY+t.title+".mp4")&&!e.currentlyDownloading[t.title]?videojs("player").ready(function(){var l=this;l.src({type:"video/mp4",src:o.VIDEOS_DIRECTORY+t.title+".mp4"}),l.load(),e.tooglePlayer(o.playerOptions.PLAY)}):e.currentlyDownloading[t.title]&&videojs("player").ready(function(){var l=this;l.src({type:"video/mp4",src:"http://localhost:8433/"+t.title}),l.load(),e.tooglePlayer(o.playerOptions.PLAY)}))}},e.deleteLocalVideo=function(t){a.Fs.unlink(o.VIDEOS_DIRECTORY+t.title),a.Fs.unlink(o.IMAGES_DIRECTORY+t.title+".jpg"),e.displayedVids.splice($.inArray(t,e.displayedVids),1),e.localVids.splice($.inArray(t.title,e.localVids),1)},e.deleteLocalVideoFromYoutube=function(t){a.Fs.unlink(o.VIDEOS_DIRECTORY+t.title+".mp4"),a.Fs.unlink(o.IMAGES_DIRECTORY+t.title+".mp4.jpg"),t.overlay="",t.vidClass="",e.localVids.splice($.inArray(t.title+".mp4",e.localVids),1)},e.enqueYoutubeVideo=function(t){e.playList.push(t),e.playVideos()},e.downloadMp3=function(t){n.downloadFile(t.thumbnails[0].url,o.IMAGES_DIRECTORY+t.title+".mp3.jpg"),a.Mp3.download(t.url,o.SONGS_DIRECTORY+t.title+".mp3",function(l){return l?console.log(l):(t.audClass="success",t.overlay="active",e.localSongs.push(t.title+".mp3"),void e.$apply())})},e.youtubeInfo=function(e){console.log(e),a.Ytdl.getInfo(e.url,function(e,t){console.log(e?e:t)})},e.downloadVideoParams=function(t,l){if(t.vidClass="downloading",t.overlay="active",e.currentlyDownloading.currentSize<e.currentlyDownloading.MAX_DOWNLOADS&&!e.currentlyDownloading[t.title]){n.downloadFile(t.thumbnails[0].url,o.IMAGES_DIRECTORY+t.title+".mp4.jpg"),e.currentlyDownloading.currentSize++;var r=a.Ytdl(t.url,{filter:function(e){return"mp4"===e.container},quality:"highest"});e.currentlyDownloading[t.title]={percentage:"0%",video:r},r.pipe(a.Fs.createWriteStream(o.VIDEOS_DIRECTORY+t.title+".mp4")),r.on("info",function(e,t){this.size=1*t.size,this.totalBytes=1*t.size}),r.on("data",function(){e.currentlyDownloading[t.title].percentage=this._readableState.pipes.length>1?Math.round(this._readableState.pipes[0].bytesWritten/this.size*100)+"%":Math.round(this._readableState.pipes.bytesWritten/this.size*100)+"%",e.$apply()}),r.on("end",function(){delete e.currentlyDownloading[t.title],e.currentlyDownloading.currentSize--,t.vidClass="success",t.overlay="active",e.localVids.push(t.title+".mp4"),l&&l(),e.$apply()}),r.on("error",function(l){console.log(l),delete e.currentlyDownloading[t.title],e.currentlyDownloading.currentSize--,a.Fs.unlink(o.VIDEOS_DIRECTORY+t.title+".mp4"),a.Fs.unlink(o.IMAGES_DIRECTORY+t.title+".mp4.jpg"),t.vidClass="failure",t.overlay="active",e.$apply()})}},e.loadMore=function(){e.stoppedLoading=!1,e.opts.startIndex+=e.opts.maxResults,a.Search(e.searchPhrase,e.opts,function(t,l){t||(e.displayedVids=e.displayedVids.concat($.map(l,function(t){return t.title=n.validateVideoName(t.title),e.currentlyDownloading[t.title]?(t.vidClass="downloading",t.overlay="active"):-1!=$.inArray(t.title+".mp4",e.localVids)?(t.vidClass="success",t.overlay="active"):-1!=$.inArray(t.title+".mp3",e.localSongs)&&(t.audClass="success",t.overlay="active"),t}))),e.stoppedLoading=!0,e.$apply()})},e.loadLocalData(),e.initGui(),e.search({charCode:13})}],u2bear.controller(controllers);