function addBuzzle(file,title){
    $("#buzzleTable").append("<tr><td class='buzzle'><a id="+file+" href='buzzles/"+file+".html'>"+title+"</td><td class='solution' id="+file+">??????</td></tr>")
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