var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var render = root.render;
var songList;
var controlmanager;
var processor = root.processor;
var audiomanager = new root.audioManager();
var playList = root.playlist;

function bindClick(){
    $scope.on("playchange",function(e,index,flag){
        render(songList[index]);
        audiomanager.setAudioSource(songList[index].audio);
        if(audiomanager.status=="play"||flag){
            audiomanager.play();
            $scope.find(".play-btn").addClass("playing");
            processor.start();//在播放中切换歌曲清除上一个的进度重新开始新的
        }
        processor.renderAlltime(songList[index].duration);
        processor.upDate(0);//切换歌曲的重置时间和进度
    })
    $scope.find(".next-btn").on("click",function(){
        var index = controlmanager.next();
        $scope.trigger("playchange",index);
    })
    $scope.find(".prev-btn").on("click",function(){
        var index = controlmanager.prev();
        $scope.trigger("playchange",index);        
    })
    $scope.find(".play-btn").on('click',function(){
        if(audiomanager.status =="pause"){
            audiomanager.play();
            $(this).addClass("playing");
            processor.start();
        }else{
            audiomanager.pause();  
            $(this).removeClass("playing");  
            processor.stop();        
        }
    })
    $scope.find('.list-btn').on('click',function(){
        playList.show(controlmanager);
    })
}



function bindTouch(){
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".processor").offset();
    var left = offset.left;
    var width = offset.width;
    console.log($sliderPoint)
    $sliderPoint.on('touchstart',function(){
        processor.stop();
    }).on('touchmove',function(e){
        //时间对象e包含radiusXY    
        var x = e.changedTouches[0].clientX;
        var percent = (x-left)/width;
        processor.upDate(percent);
        if(percent < 0){
            percent = 0;
        }else if(percent>1){
            percent =1;
        }
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x-left)/width;
        var curDuration = songList[controlmanager.index].duration*percent;
        processor.start(percent);
        audiomanager.jumpToPlay(curDuration);
        $scope.find('.play-btn').addClass('playing');
    })
}

function getData(url){
    $.ajax({
        url : url,
        type : "GET",
        success : function(data){
            playList.renderList(data);
            controlmanager = new root.controlManager(data.length);
            songList = data;
            render(data[0]); 
            bindClick();
            bindTouch();
            $scope.trigger('playchange',0);
        }
    })
}
getData("./mock/data.json");
