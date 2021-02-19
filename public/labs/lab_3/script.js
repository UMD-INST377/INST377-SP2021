let Sushi = ['onigiri', 'roll']
console.log(Sushi.length)

let first = Sushi[0]
// onigiri

let last = Sushi[Sushi.length - 1]
// roll

    Sushi.forEach(function (item, index) {
        console.log(item, index)
    })