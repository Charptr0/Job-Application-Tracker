export function randomLocation(): string {
    const locations = [
        { city: 'New York City', state: 'New York' },
        { city: 'Los Angeles', state: 'California' },
        { city: 'Chicago', state: 'Illinois' },
        { city: 'Houston', state: 'Texas' },
        { city: 'Phoenix', state: 'Arizona' },
        { city: 'Philadelphia', state: 'Pennsylvania' },
        { city: 'San Antonio', state: 'Texas' },
        { city: 'San Diego', state: 'California' },
        { city: 'Dallas', state: 'Texas' },
        { city: 'San Jose', state: 'California' }
    ];

    const randomIndex = Math.floor(Math.random() * (locations.length - 1));
    const randomLocation = locations[randomIndex];

    return `${randomLocation.city}, ${randomLocation.state}`
}