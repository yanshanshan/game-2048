/**
 * Created by db on 16/7/25.
 */


//获取节点值并转整数(右)
function resetRow_2(row){
    var row_list_r = [],node,nodeValue,number
    for(var i = row.length-1;i > -1; i--){
        node = row[i]
        nodeValue = node.innerText
        if(nodeValue === ''){
            continue
        } else {
            number = parseInt(nodeValue)
            row_list_r.push(number)
        }
    }
}
