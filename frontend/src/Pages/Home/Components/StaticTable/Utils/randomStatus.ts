export function randomStatus(): string {
    const status = [
        'Application Sent',
        "Phone Interview",
        "Technical Interview",
        "Interview",
        "Final Interview",
        "Rejected",
        "Offer",
        "Declined",
    ]

    const randomIndex = Math.floor(Math.random() * (status.length - 1));

    return status[randomIndex];
}