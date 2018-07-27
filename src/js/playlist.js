(function($,root){
    var $scope = $(document.body);
    var controlmanager;
    var $playlist = $("<div class='play-list'>"+"<div class='list-header'>播放列表</div>"+"<ul class='list-wrapper'></ul>"+"<div class='list-close'>关闭</div>"+"</div>");
    function renderList(data){ 
        var html = '';
        for(var i=0;i<data.length;i++){
            html += "<li><h3>"+data[i].song+"-<span>"+data[i].singer+"</span></h3></li>";
        }
        $playlist.find('.list-wrapper').html(html);
        $scope.append($playlist);
        bindEvent()
    }

    function signIndex(index){
        $playlist.find('li').removeClass('playing');
        $playlist.find('li').eq(index).addClass('playing');
    }

    function bindEvent(){
        $playlist.find('.list-close').on('click',function(){
            $playlist.removeClass('show');
        })
        $playlist.find('li').on('click',function(){
            var index= $(this).index();
            controlmanager.index = index;
            signIndex(index);
            $scope.trigger('playchange',[index,true]);
            setTimeout(function(){
                $playlist.removeClass('show');
            },500)
        })
    }

    function show(control){
        $playlist.addClass('show');
        controlmanager = control;
        var index = controlmanager.index;
        signIndex(index);
    }

    root.playlist = {
        renderList:renderList,
        show : show
    }
})(window.Zepto,window.player)