export function random(len : number){

    let options = "cuiwiuneincihfioanw98r73rh373h4893ry3988h389f3yd983c";
    let length = options.length;

    let ans = "";

    for(let i = 0;i<len;i++){
        ans += options[Math.floor((Math.random() * length))] //0 => 20
    }
    
    return ans;
}