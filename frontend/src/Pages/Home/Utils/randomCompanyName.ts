export function randomCompanyName(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * (alphabet.length - 1));
    const randomLetter = alphabet[randomIndex];

    return `Company ${randomLetter.toUpperCase()}`
}