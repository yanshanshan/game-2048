/**
 * Created by db on 16/7/23.
 */

/***
 * 返回随机整数，该随机整数
 * @param min  整数min
 * @param max  整数max
 * @returns {*}   >=min <= max
 */
function getRandomInt(min, max){
    return min + Math.floor(Math.random() * (max - min + 1))
}

/****
 * 返回整数2或者4，因为我们对程序只需要随机生成2或者4
 * @returns {number} 整数2或者4
 */
function getRandomNum(){
    var arr = [2, 4]
    var index = getRandomInt(0, 1)

    return arr[index]
}


/***
 * 返回页面内节点的innerText值为空的所有节点
 * @returns {Array} 节点数组
 */
function getAllEmptyNodes(){
    var emptyNodes = []
    var nodes = document.getElementsByTagName('td')
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].innerText == ''){
            emptyNodes.push(nodes[i])
        }
    }
    return emptyNodes
}

/****
 * 返回一个随机的内容为空的节点
 * @returns {*}
 */
function getRandomEmptyNode(){
    var emptyNodes = getAllEmptyNodes()
    if(emptyNodes.length == 0){
        return null
    }
    var randomIndex = getRandomInt(0, emptyNodes.length - 1)
    return emptyNodes[randomIndex]
}

function getAllNodes(){
    return Array.prototype.slice.call(document.getElementsByTagName('td'))
}

//2048程序初始化
function init(){
    var num1 = getRandomNum()
    var num2 = getRandomNum()

    var node1 = getRandomEmptyNode()
    node1.innerText = num1

    var node2 = getRandomEmptyNode()
    node2.innerText = num2
}

function moveLeft(){
    console.log('moveLeft')
    var nodes = getAllNodes()
    var row1 = nodes.slice(0, 4)
    var row2 = nodes.slice(4, 8)
    var row3 = nodes.slice(8, 12)
    var row4 = nodes.slice(12, 16)

    console.log(row1)

    //var nodeArr = [];
    //for(var i = 0; i < row1; i++){
    //    if(row1[i] === row1[i + 1]) {
    //        row1[i] = row1[1] + row1[i + 1];
    //    } else if(row1[i] === row1[i + 2] && row1[i + 1] === '') {
    //        row1[i] =row1[i] + row1[i + 2];
    //    }
    //
    //}
}

function moveUp(){
    console.log('moveUp')
}

function moveRight(){
    console.log('moveRight')
}

function moveDown(){
    console.log('moveDown')
}

//程序的入口函数
function main(){
    init()


    document.addEventListener('keyup', function(event){
        var keyCode = event.keyCode

        if(keyCode == 37){
            moveLeft()
        }else if(keyCode == 38){
            moveUp()
        }else if(keyCode == 39){
            moveRight()
        }else if(keyCode == 40){
            moveDown()
        }else{

        }

    }, false)
}

main()