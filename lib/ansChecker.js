async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}


async function checkAnswer(input,ans){
    const digestHex = await digestMessage(input);
    if(digestHex == ans){
        return true;
    }
    return false;
}

async function checkBuzzle(file,input){
    input = input.replace(/[^0-9a-z]/gi, '').toUpperCase();
    if (input == ""){
        return
    }
    var buzzle = ansArr.find(buzzle => buzzle.file == file);
    if(typeof buzzle=="undefined"){
        alert("error: please contact me! error code: ansChecker");
        return;
    }
    var solution = buzzle.solution;
    var saltedInput = buzzle.salt+input;
    if(await checkAnswer(saltedInput,solution)){
        $("#incorrect").html("");
        $("#solved").html("solved!");
        setCookie(file,solution,1);
        $("#ansCheckerBox").val(input);
        $("#ansCheckerBox").attr("disabled",true);
    } else {
        $("#incorrect").html("incorrect!");
    }
}

$("#ansCheckerBox").keyup(function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        $("#checking").click();
    }
});