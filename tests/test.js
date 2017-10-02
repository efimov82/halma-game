var a1 = [];
var a2 = [];
var a3 = [];
var a4 = [];
a1.push(2);
a1.push(4);
a1.push(5);
a1.push(6);
a2.push(1);
a2.push(2);
a2.push(3);
a2.push(4);
a3.push(1);
a3.push(5);
a3.push(6);
var all = a1.concat(a2);
var unique = uniqueArray(all); // Array.from(new Set(all));
//let expect = a1.filter(item => a3.every(item2 => item2 != item));
//let expect2 = a1.filter(item => a4.every(item2 => item2 != item));
var unic_jumps = a1.filter(function (item) { return a2.indexOf(item) === -1; });
console.log(a1);
console.log(a2);
console.log(all);
console.log(unique);
//console.log(expect);
//console.log(expect2);
console.log(unic_jumps);
function uniqueArray(a) {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    return a.filter(onlyUnique);
    ;
}
