function deepCopy(ele) {
//是数组，生成新的数组，对内部元素深拷贝，返回新的数组
    if( Array.isArray(ele) ) {
        let arr = ele.map((value) => {
            return deepCopy(value)
        })
        return arr
    }
//对象同理
    else if( ele instanceof Object ) {
        let obj = {};
        for (const key in ele) {
            obj[key] = deepCopy(ele[key]);
        }
        return obj
    }
//基本元素直接返回
    else {
        return ele
    }
}

export default deepCopy
