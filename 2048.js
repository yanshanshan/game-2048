/**
 * Created by db on 16/7/23.
 */

/***
 * 返回随机整数，该随机整数
 * @param min  整数min
 * @param max  整数max
 * @returns {*}   >=min <= max
 */
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
}

/****
 * 返回整数2或者4，因为我们对程序只需要随机生成2或者4
 * @returns {number} 整数2或者4
 */
function getRandomNum() {
    var arr = [2, 4]
    var index = getRandomInt(0, 1)

    return arr[index]
}


/***
 * 返回页面内节点的innerText值为空的所有节点
 * @returns {Array} 节点数组
 */
function getAllEmptyNodes() {
    var emptyNodes = []
    var nodes = document.getElementsByTagName('td')
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText == '') {
            emptyNodes.push(nodes[i])
        }
    }
    return emptyNodes
}

/****
 * 返回一个随机的内容为空的节点
 * @returns {*}
 */
function getRandomEmptyNode() {
    var emptyNodes = getAllEmptyNodes()
    if (emptyNodes.length == 0) {
        return null
    }
    var randomIndex = getRandomInt(0, emptyNodes.length - 1)
    return emptyNodes[randomIndex]
}

function getAllNodes() {
    return Array.prototype.slice.call(document.getElementsByTagName('td'))
}

//2048程序初始化
function init() {
    var num, node
    for (var i = 0; i < 12; i++) {
        num = getRandomNum()
        node = getRandomEmptyNode()
        node.innerText = num
    }
}

function moveLeft() {
    console.log('moveLeft')
    var nodes = getAllNodes()
    var row1 = nodes.slice(0, 4)
    var row2 = nodes.slice(4, 8)
    var row3 = nodes.slice(8, 12)
    var row4 = nodes.slice(12, 16)

    resetRow(row1)
    resetRow(row2)
    resetRow(row3)
    resetRow(row4)

    var randomEmptyNode = getRandomEmptyNode()
    var randomNum =  getRandomNum()
    randomEmptyNode.innerText = randomNum

}


function moveUp() {
    console.log('moveUp')
}

function moveRight() {
    console.log('moveRight')
}

function moveDown() {
    console.log('moveDown')
}

function resetRow(row){
    //获取节点值并转整数
    var row_list = [], node, nodoValue, number
    for (var i = 0; i < row.length; i++) {
        node = row[i]
        nodoValue = node.innerText
        if (nodoValue === '') {
            continue
        } else {
            number = parseInt(nodoValue)
            row_list.push(number)
        }


    }

    //执行加法操作
    var row_list2 = [], curr, next, sum
    for (var j = 0; j < row_list.length; j++) {
        curr = row_list[j]
        next = row_list[j + 1]
        if (curr === next) {
            sum = (curr + next)
            row_list2.push(sum)
            j++
        } else {
            row_list2.push(row_list[j])
        }
    }

    //把结果设置回节点上

    for (var k = 0; k < row.length; k++) {
        row[k].innerText = row_list2[k] ||  ''
    }
}

//程序的入口函数
function main() {
    init()


    document.addEventListener('keyup', function (event) {
        var keyCode = event.keyCode

        if (keyCode == 37) {
            moveLeft()
        } else if (keyCode == 38) {
            moveUp()
        } else if (keyCode == 39) {
            moveRight()
        } else if (keyCode == 40) {
            moveDown()
        } else {

        }

    }, false)
}

main()