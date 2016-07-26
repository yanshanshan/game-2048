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
    for (var i = 0; i < 2; i++) {
        num = getRandomNum()
        node = getRandomEmptyNode()
        node.innerText = num
    }
}
//获取所有节点（有数字内容的与空的）空的置为0，都放到一个arr的数组内
function getNumbersFromNodes(nodes) {
    var arr = [], node
    for (var i = 0; i < nodes.length; i++) {
        node = nodes[i]

        arr.push(node.innerText == '' ? 0 : parseInt(node.innerText))
    }
     return arr
}
//数值改变背景色改变操作
function backgroundStyle(){
    var nodesValue = getNumbersFromNodes()
    for (var i = 0; i < nodesValue.length; i++){
        if(nodesValue[i] === 2 || 4){

        }

    }
}



//获取所有节点的值并将其分为4个数组放进一个大数组，组成一个多维数组
//—————————————适应左右移的数组——————————————
function getGroup(numbers) {
    var group = []
    for (var i = 4; i <= numbers.length; i += 4) {
        var single = []
        for (var k = i - 4; k < i; k++) {
            single.push(numbers[k])
        }
        group.push(single)
    }
      return group
}

//—————————————适应上下移的数组——————————————
function getGroup_ud(numbers) {
    var group = []
    for (i = 0; i < 4; i++) {
        var single = []
        for (k = i; k < 16; k += 4) {
            single.push(numbers[k])
        }
        group.push(single)
    }
     return group
}

//获取结点值转整数 且 执行相加操作  并把相加后的值设回节点
//———————————————适应上移和左移操作————————————————

function resetRow(row) {
    //获取节点值并转整数
    var row_list = [], node, nodeValue, number
    for (var i = 0; i < row.length; i++) {
        node = row[i]
        nodeValue = node.innerText
        if (nodeValue === '') {
            continue
        } else {
            number = parseInt(nodeValue)
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
        row[k].innerText = row_list2[k] || ''
    }
}
//———————————————适应下移和右移操作————————————————
function resetRow_2(row) {
     var row_list_r = [], node, nodeValue, number
    for (var i = row.length - 1; i > -1; i--) {
        node = row[i]
        nodeValue = node.innerText
        if (nodeValue === '') {
            continue
        } else {
            number = parseInt(nodeValue)
            row_list_r.push(number)
        }
    }
    console.log('row_list_r:' + row_list_r)
    var row_list_r2 = [], curr_r, next_r
    for (var k = 0; k < row_list_r.length; k++) {

        curr_r = row_list_r[k]
        next_r = row_list_r[k + 1]
        if (curr_r === next_r) {
            row_list_r2.push(curr_r + next_r)
            k++
        } else {
            row_list_r2.push(curr_r)
        }
    }
    console.log('row_list_r2:' + row_list_r2)

    for (var j = 0; j < 4; j++) {
        row[3 - j].innerText = row_list_r2[j] || ''
    }
}

//对第一组数据进行是否还可以移动判断
//——————————————适应上下移判断——————————————
function getTotalMoveFlag_u(numbers) {
    var flag = false
    var group = getGroup_ud(numbers)
    console.log('group2' + group)
    //对每一组数据，进行判断：是否具备上移条件，如果任意一组数具备上移动条件，则代表整体具有上移条件
    for (var i = 0; i < group.length; i++) {
        var singleFlag = getSingleMoveFlag(group[i])
        if (singleFlag == true) {
            flag = true
            break
        }
    }
    return flag
}
//——————————————适应下移判断——————————————
function getTotalMoveFlag_d(numbers) {
    var flag = false
    //根据numbers，对16个数字分成4组
    var group = getGroup_ud(numbers)
    //对每一组数据，进行判断：是否具备右移条件，如果任意一组数具备右移动条件，则代表整体具有右移条件
    for (var i = 0; i < group.length; i++) {
        var singleFlag = getSingleMoveFlag_r(group[i])
        if (singleFlag == true) {
            flag = true
            break
        }
    }

    return flag
}
//——————————————适应左移判断——————————————
function getTotalMoveFlag(numbers) {
    var flag = false
    //根据numbers，对16个数字分成4组
    var group = getGroup(numbers)
    //对每一组数据，进行判断：是否具备左移条件，如果任意一组数具备左移动条件，则代表整体具有左移条件
    for (var i = 0; i < group.length; i++) {
        var singleFlag = getSingleMoveFlag(group[i])
        if (singleFlag == true) {
            flag = true
            break
        }
    }
    return flag
}
//——————————————适应右移判断——————————————
function getTotalMoveFlag_r(numbers) {
    var flag = false
    //根据numbers，对16个数字分成4组
    var group = getGroup(numbers)
    //对每一组数据，进行判断：是否具备右移条件，如果任意一组数具备右移动条件，则代表整体具有右移条件
    for (var i = 0; i < group.length; i++) {
        var singleFlag = getSingleMoveFlag_r(group[i])
        if (singleFlag == true) {
            flag = true
            break
        }
    }

    return flag
}

//对每一行进行移动判断
//————————————适应上左移判断———————————————
function getSingleMoveFlag(numbers) {
    var flag = false
    var isEmpty = false
    for (var k = 0; k < numbers.length; k++) {
        //如果有相邻的2个数相等，则说明具备左移动条件
        if ((k + 1) < numbers.length && numbers[k] == numbers[k + 1] && numbers[k] !== 0) {
            flag = true
            break
        }
        //如果前面有一个空位，并且空位后面任意位置上有一个非空数字，则具备左移动条件
        if (isEmpty && numbers[k] !== 0) {
            flag = true
            break
        }
        //记录是否找到空位
        if (numbers[k] == 0) {
            isEmpty = true
        }
    }
    return flag
}
//————————————适应下右移判断———————————————
function getSingleMoveFlag_r(numbers) {
    var flag = false
    var isEmpty = false
    for (var k = numbers.length - 1; k > -1; k--) {
        if (numbers[k] == numbers[k - 1] && numbers[k] != 0) {
            flag = true
            break
        }

        if (isEmpty && numbers[k] !== 0) {
            flag = true
            break
        }
        if (numbers[k] == 0) {
            isEmpty = true
        }

    }
    return flag
}

//移动功能入口
//—————————左————————————
function moveLeft() {
    console.log('moveLeft')
    //获取所有节点
    var nodes = getAllNodes()
    //获取所有节点对应的数字，空字符串用0代替
    var numbers = getNumbersFromNodes(nodes)
    //根据数字，判断是否符合左移条件
    var flag = getTotalMoveFlag(numbers)
    //如果不符合移动条件，就直接返回，不做任何合并和生成新数字的操作
    if (flag == false) {
        return
    }
    //执行合并操作
    var row1 = nodes.slice(0, 4)
    var row2 = nodes.slice(4, 8)
    var row3 = nodes.slice(8, 12)
    var row4 = nodes.slice(12, 16)
    resetRow(row1)
    resetRow(row2)
    resetRow(row3)
    resetRow(row4)
    //执行生成新数字操作
    var randomEmptyNode = getRandomEmptyNode()
    var randomNum = getRandomNum()
    randomEmptyNode.innerText = randomNum
}
//————————————上—————————————
function moveUp() {
    console.log('moveUp')
    //获取所有节点
    var nodes = getAllNodes()
    //获取所有节点对应的数字，空字符串用0代替
    var numbers = getNumbersFromNodes(nodes)
    //根据数字，判断是否符合上移条件
    var flag = getTotalMoveFlag_u(numbers)
    //如果不符合移动条件，就直接返回，不做任何合并和生成新数字的操作
    if (flag == false) {
        return
    }
    //执行合并操作
    var row1 = document.getElementsByClassName('t1')
    var row2 = document.getElementsByClassName('t2')
    var row3 = document.getElementsByClassName('t3')
    var row4 = document.getElementsByClassName('t4')
    resetRow(row1)
    resetRow(row2)
    resetRow(row3)
    resetRow(row4)
    //执行生成新数字操作
    var randomEmptyNode = getRandomEmptyNode()
    var randomNum = getRandomNum()
    randomEmptyNode.innerText = randomNum

}

//————————————右———————————————————
function moveRight() {
    console.log('moveRight')
    //获取所有节点
    var nodes = getAllNodes()
    //获取所有节点对应的数字，空字符串用0代替
    var numbers = getNumbersFromNodes(nodes)
    //根据数字，判断是否符合右移条件
    var flag = getTotalMoveFlag_r(numbers)
    //如果不符合移动条件，就直接返回，不做任何合并和生成新数字的操作
    if (flag == false) {
        return
    }
    //执行合并操作
    var row1r = nodes.slice(0, 4)
    var row2r = nodes.slice(4, 8)
    var row3r = nodes.slice(8, 12)
    var row4r = nodes.slice(12, 16)
    resetRow_2(row1r)
    resetRow_2(row2r)
    resetRow_2(row3r)
    resetRow_2(row4r)
    //执行生成新数字操作
    var randomEmptyNode = getRandomEmptyNode()
    var randomNum = getRandomNum()
    randomEmptyNode.innerText = randomNum
}

//————————————————下———————————————————
function moveDown() {
    console.log('moveDown')
    //获取所有节点
    var nodes = getAllNodes()
    //获取所有节点对应的数字，空字符串用0代替
    var numbers = getNumbersFromNodes(nodes)
    //根据数字，判断是否符合下移条件
    var flag = getTotalMoveFlag_d(numbers)
    //如果不符合移动条件，就直接返回，不做任何合并和生成新数字的操作
    if (flag == false) {
        return
    }
    //执行合并操作
    var row1 = document.getElementsByClassName('t1')
    var row2 = document.getElementsByClassName('t2')
    var row3 = document.getElementsByClassName('t3')
    var row4 = document.getElementsByClassName('t4')
    resetRow_2(row1)
    resetRow_2(row2)
    resetRow_2(row3)
    resetRow_2(row4)
    //执行生成新数字操作
    var randomEmptyNode = getRandomEmptyNode()
    var randomNum = getRandomNum()
    randomEmptyNode.innerText = randomNum

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

