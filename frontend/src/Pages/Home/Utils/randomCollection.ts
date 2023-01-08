export function randomCollection(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = () => Math.floor(Math.random() * (alphabet.length - 1));

    // generate 4 random letters
    const res = alphabet[randomIndex()] + alphabet[randomIndex()] + alphabet[randomIndex()] + alphabet[randomIndex()];

    return `${res.toUpperCase()} Collection`;
}