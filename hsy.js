function tags() {
    var ret = "";
    $.ajax({
        method: "GET",
        url: "tags.html",
        async: false,
        success: function(data){ 
            ret = data;
        } 
    });
    return ret;
}

function categories() {
    var ret = "";
    $.ajax({
        method: "GET",
        url: "categories.html",
        async: false,
        success: function(data){ 
            ret = data;
        } 
    });
    return ret;
}

var whoami = function() {
    var ret = "";
    $.ajax({
        method: "GET",
        url: "whoami.html",
        async: false,
        success: function(data){ 
            ret = data;
        } 
    });
    return ret;
}

var posts = function() {
    var ret = "";
    $.ajax({
        method: "GET",
        url: "posts.html",
        async: false,
        success: function(data){ 
            ret = data;
        } 
    });
    return ret;
}

var help = function() {
    var ret = "";
    $.ajax({
        method: "GET",
        url: "help.html",
        async: false,
        success: function(data){ 
            ret = data;
        } 
    });
    return ret;
}

function combine_cmd_exec(cmd) {
    var cmd_arr = cmd.split(" ");
    var ret = false;
    switch (cmd_arr[0]) {
        case "post":
            
            break;
        default:
            return ret;
    }
}

function exec_cmd(cmd) {
    switch (cmd) {
        case "clear":
            location.reload();
            break;
        case "tags":
            $("#output").html(tags());
            break;
        case "categories":
            $("#output").html(categories());
            break;
        case "posts":
            $("#output").html(posts());
            break;
        case "whoami":
            $("#output").html(whoami());
            break;
        case "help":
            $("#output").html(help());
            break;
        case "date":
            $("#output").html("It's simple to print current date here, but I don't think you're here to look up for time. Try something meaningful. <br>");
            break;
        case "ls":
            $("#output").html("It's usefull in linux, but means nothing here. <br>");
            break;
        case "pwd":
            $("#output").html("Already told ↑ you. <br>");
            break;
        case "cd":
            $("#output").html("Permission Denied. <br>");
            break;
        case "kill":
            $("#output").html("Oh god, can't belive you do that to me. <br>");
            break;
        case "":
            break;
        default:
            var ret = combine_cmd_exec(cmd);
            if (ret == false) {
                $("#output").html("hsysh: command not found: " + cmd + "<br>");
            }
    }
}

document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e){
                var cmd = $("#input").text();
                if ((e.keyCode >= 65 && e.keyCode <= 90) ||
                    e.keyCode == 32 ||
                    (e.keyCode >= 48 && e.keyCode <= 57)) {
                    // a-z直接打印
                    $("#input").text(cmd + e.key);
                }
                if (e.keyCode == 13) {
                    // 回车运行命令
                    // 去掉input id
                    $("#input").removeAttr("id");
                    $("#blink").remove();
                    $("#current").removeAttr("id");
                    var lines = $("#console");
                    // 运行输出命令结果
                    exec_cmd(cmd);
                    //lines.append('<br>');
                    $("#output").removeAttr("id");
                    // 打印新行
                    lines.append('<line id="current"><font>[{{site.username}}@{{site.machinename}}: ~]$ </font><font id="input"></font><font id="blink">_</font><br><font id="output"></font></line>');
                    $("body").scrollTop($("#current").offset().top);
                }
                if (e.keyCode == 8 && cmd.length != 0) {
                    // 退格
                    $("#input").text(cmd.substr(
                        0, cmd.length - 1));
                }
            }
        }; 

document.ready=function() {
    $('#content').scrollTop( $('#content')[0].scrollHeight );
};