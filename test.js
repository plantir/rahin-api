let arr = [{ item: ['armin', 'arash'] }];
let me = arr[0].item;

me.splice(0, 1, 'hosein');
console.log(arr);
