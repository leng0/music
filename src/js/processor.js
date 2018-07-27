(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPercent = 0;
    var startTime;
    function format(duration){
        duration = Math.round(duration);//四舍五入不让走毫秒
        var minutes = Math.floor(duration/60);
        var seconds = duration % 60;
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        if(seconds <10){
            seconds = "0"+seconds;
        }
        return minutes + ":" +seconds;
    }
    function renderAlltime(duration){
        lastPercent = 0;//渲染一个新的歌曲
        curDuration = duration;
        var allTime = format(duration);
        $scope.find(".all-time").text(allTime);
    }
    function renderPro(percent){
        var percentage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform : 'translateX('+percentage+')'
        });
    }
    function upDate(percent){
        var currentTime = percent * curDuration;
        currentTime = format(currentTime);
        $scope.find('.current-time').text(currentTime);
        renderPro(percent);
    }
    function start(percentage){
        lastPercent = percentage?percentage:lastPercent;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var culTime = new Date().getTime();
            var percent = lastPercent + (culTime - startTime) / (curDuration * 1000)
            if(percent <1){
               frameId = requestAnimationFrame(frame);
                upDate(percent);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime-startTime)/(curDuration*1000);
        cancelAnimationFrame(frameId)
    }
    root.processor={
        renderAlltime : renderAlltime,
        start : start,
        stop : stop,
        upDate : upDate
    }
}(window.Zepto,window.player))