export function randomJobTitle(): string {
    const jobTitles = [
        'Software Engineer',
        'Product Manager',
        'Data Scientist',
        'Designer',
        'DevOps Engineer',
        'Quality Assurance Tester',
        'Customer Support Representative',
        'Technical Writer',
        'Project Manager',
        'Security Engineer'
    ];

    const randomIndex = Math.floor(Math.random() * (jobTitles.length - 1));
    return jobTitles[randomIndex];
}