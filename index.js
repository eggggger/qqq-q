var operator = {
    '<': '$lt',
    '<=': '$lte',
    '>': '$gt',
    '>=': '$gte',
    '!=': '$not',
}

var inverseOperator = {};
Object.keys(operator).forEach(function (key) {
    inverseOperator[operator[key]] = key;
});

exports.parse = function(q) {
    var qObj = {};
    var qArr = q.split(/ (?=[^ ]+?:(?!.*?"))/);

    if (/^".*"$/.test(qArr[0]) || !/.+:/.test(qArr[0])) {
        qObj['_content'] = qArr[0].replace(/^"|"$/g, '');
        qArr.shift();
    }

    for (var i = 0, len = qArr.length; i < len; i++) {
        var fieldStr = qArr[i];
        var matches = fieldStr.match(/([^:]+):(([>=<!]*)(.*))/);
        if (!matches) throw new Error('Bad format');
        var current = qObj;
        var keys = matches[1].split(/\./);
        for (var j = 0, keysLen = keys.length, key; j < keysLen; j++) {
            key = keys[j]
            if (!key) throw new Error('Bad format');
            if (!current[key]) current[key] = {};
            if (j < keysLen - 1) current = current[key];
        }

        if (operator[matches[3]]) {
            current[key][operator[matches[3]]] = matches[4];
        } else {
            current[key] = matches[2];
        }
    }

    return qObj;
}

exports.stringify = function(qObj) {
    var q = '';

    if (qObj['_content']) {
        q += '"' + qObj['_content'] + '"';
    }

    Object.keys(qObj).forEach(function(key) {
        if (key === '_content') return;
        if (typeof qObj[key] === 'string' || typeof qObj[key] === 'number') {
            q += ' ' + key + ':' + qObj[key];
        } else if (qObj[key] && typeof qObj[key] === 'object') {
            q += ' ' + parseObj(key, qObj[key]);
        }
    })

    function parseObj(field, obj) {
        var fields = Object.keys(obj).map(function(key) {
            if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
                if (inverseOperator[key]) {
                    return field + ':' + inverseOperator[key]  +obj[key]
                }
                return field + '.' + key + ':' + obj[key]
            }
            if (typeof obj[key] === 'object' && !obj[key].length) {
                return parseObj(field + '.' + key, obj[key]);
            }
            return false;
        }).filter(function(v) {
            return v;
        });
        return fields.join(' ');
    }

    return q.trim();
}
