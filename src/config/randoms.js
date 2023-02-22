const logger = require('./logger');
process.on("message", ({ msg, cant }) => {
    if (msg == "start") {
        const randoms = []
        for (let i = 0; i < cant; i++) {
            randoms.push(Math.floor(Math.random() * (1000 - 1) + 1))
        }
        function count_duplicate(a) {
            let counts = {}
            const numList = []
            for (let i = 0; i < a.length; i++) {
                if (counts[a[i]]) {
                    counts[a[i]] += 1
                } else {
                    counts[a[i]] = 1
                }
            }
            for (let prop in counts) {
                if (counts[prop]) {
                    numList.push(prop + " se contó: " + counts[prop] + " veces.")
                }
            }
            return numList;
        }
        const randomNums = count_duplicate(randoms)
        process.send({ type: "sum", data: randomNums });
    }
});