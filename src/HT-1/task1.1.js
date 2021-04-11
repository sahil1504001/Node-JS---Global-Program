const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const reverseString = () => {
    readline.question('', (input) => {
        readline.write([...input].reverse().join(''));
        readline.write('\n\n\n');
        reverseString();
    });
};

reverseString();
