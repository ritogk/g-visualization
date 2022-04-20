// クリック解析
$(function($) {
    // セット
    $('#multiSet').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/set'
        });
    });
    // 再読み込み
    $('#multiReload').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/reload'
        });
    });
    // 読込
    $('#multiRead').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/read'
        });
    });
    // 保存
    $('#multiSave').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/save'
        });
    });
    // 再生
    $('#multiPlay').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/play'
        });
    });
    // 停止
    $('#multiPause').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/stop'
        });
    });
    // 倍速(-)
    $('#multiSlow').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/slow'
        });
    });
    // 倍速(+)
    $('#multiFast').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/fast'
        });
    });
    // ﾐｭｰﾄ解除
    $('#multiMuteRe').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/multiRelease'
        });
    });
    
    // ツイート
    $('#home_tweat').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/tweat'
        });
    });
    // 削除
    $('#home_delete').click(function() {
        $.ajax({
            type: "GET",
            url: '/analysis/delete'
        });
    });
});