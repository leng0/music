(function($,root){
    var $scope = $(document.body);
    function audioManager(){
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();
    }
    audioManager.prototype={
        bindEvent:function(){
            $(this.audio).on('ended',function(){
                $scope.find('.next-btn').trigger(click);
                //检查一曲歌曲完毕后自动下一首
            })
        },
        play : function(){
            this.audio.play();
            this.status = "play";
        },
        pause : function (){
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource : function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay:function(duration){
            this.audio.currentTime=duration;
            this.play();
        }
    }
    root.audioManager = audioManager;
}(window.Zepto,window.player))