function deepCopy(ele) {
    if( Array.isArray(ele) ) {
        let arr = ele.map((value) => {
            return deepCopy(value)
        })
        return arr
    }
    else if( ele instanceof Object ) {
        let obj = {};
        for (const key in ele) {
            obj[key] = deepCopy(ele[key]);
        }
        return obj
    }
    else {
        return ele
    }
}

export default deepCopy