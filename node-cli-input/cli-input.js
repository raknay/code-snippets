const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (answer1) => {
    rl.question('', (answer2) => {
        var result = (+answer1) + (+answer2);
        console.log(`The sum of above two numbers is ${result}`);
        rl.close();
    });
});