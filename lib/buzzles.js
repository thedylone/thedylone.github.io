function addBuzzle(file,title){
    $("#buzzleTable").append("<div><a id="+file+" href='buzzles/"+file+".html'>"+title+"</a><p class='solution' id="+file+">??????</p></div>")
}

function checkSolved(arr){
    for(i=0;i<arr.length;i++){
        var file = arr[i].file;
        if(getCookie(file)==arr[i].solution){
            if($(".solution#"+file).length == 0){
                addBuzzle(file,arr[i].title);
            }
            $(".solution#"+file).html("solved!");
            $(".solution#"+file).css("color","green");
            if(i<arr.length-1){
                addBuzzle(arr[i+1].file,arr[i+1].title);
            }
        }
    }
}