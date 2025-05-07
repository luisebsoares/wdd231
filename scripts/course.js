const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to write and call functions and handle errors within them.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the notion of classes and objects, encapsulation, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn to create dynamic websites using JavaScript to respond to events and update content.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will focus on UX, accessibility, performance optimization, and API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

function renderCourses(courseArray) {
    const courseList = document.getElementById('course-list');
    const creditTotal = document.getElementById('credit-total');

    // Clear previous content
    courseList.innerHTML = '';

    // Update credit total
    const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = `Total Credits: ${totalCredits}`;

    // Optional: Add total number of courses (like the image)
    let countDisplay = document.getElementById('course-count');
    if (!countDisplay) {
        countDisplay = document.createElement('p');
        countDisplay.id = 'course-count';
        creditTotal.before(countDisplay);
    }
    countDisplay.textContent = `The total number of courses listed above is ${courseArray.length}`;

    // Render simplified cards
    courseArray.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');

        // Apply styles
        card.style.padding = '1rem';
        card.style.textAlign = 'center';
        card.style.borderRadius = '8px';
        card.style.marginBottom = '1rem';
        card.style.fontWeight = 'bold';
        card.style.fontSize = '1.1rem';
        card.style.border = '2px solid var(--color-primary)';

        if (course.completed) {
            card.style.backgroundColor = 'var(--color-accent)';
            card.textContent = `✓ ${course.subject} ${course.number}`;
        } else {
            card.style.backgroundColor = 'var(--color-accent2)';
            card.style.color = 'white';
            card.textContent = `${course.subject} ${course.number}`;
        }

        courseList.appendChild(card);
    });
}


// Filter logic
function filterCourses(type) {
    let filtered = courses;
    if (type !== 'all') {
        filtered = courses.filter(course => course.subject === type);
    }
    renderCourses(filtered);
}

// Add button event listeners after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('allBtn').addEventListener('click', () => filterCourses('all'));
    document.getElementById('cseBtn').addEventListener('click', () => filterCourses('CSE'));
    document.getElementById('wddBtn').addEventListener('click', () => filterCourses('WDD'));

    renderCourses(courses); // Initial load
});
