export function randomJobType(): string {
    const jobTypes = [
        "Full-Time",
        "Part-Time",
        "Contract",
        "Internship",
        "Temporary",
    ];

    const randomIndex = Math.floor(Math.random() * (jobTypes.length - 1));

    return jobTypes[randomIndex];
}