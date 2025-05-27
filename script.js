document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Projects data
    const projects = [
        {
            id: 1,
            title: "E-commerce Platform",
            description: "A full-featured online store with inventory management, payment processing, and customer accounts.",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            tags: ["web", "software"],
            category: "web"
        },
        {
            id: 2,
            title: "Fitness Mobile App",
            description: "iOS and Android app for tracking workouts, nutrition, and progress with social features.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            tags: ["mobile", "health"],
            category: "mobile"
        },
        {
            id: 3,
            title: "Hospital Management System",
            description: "Comprehensive software for patient records, appointments, billing, and inventory management.",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            tags: ["software", "health"],
            category: "software"
        },
        {
            id: 4,
            title: "Real Estate Website",
            description: "Modern website with property listings, virtual tours, and agent management system.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
            tags: ["web", "design"],
            category: "web"
        },
        {
            id: 5,
            title: "Food Delivery App",
            description: "Mobile application for ordering food from local restaurants with real-time tracking.",
            image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            tags: ["mobile", "food"],
            category: "mobile"
        },
        {
            id: 6,
            title: "CRM Software",
            description: "Customer relationship management tool with sales tracking, analytics, and team collaboration.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            tags: ["software", "business"],
            category: "software"
        }
    ];
    
    // Display projects
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let visibleProjects = 3;
    
    function displayProjects(filter = 'all', limit = projects.length) {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        const projectsToShow = filteredProjects.slice(0, limit);
        
        if (projectsToShow.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">No projects found in this category.</p>';
            return;
        }
        
        projectsToShow.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="#" class="btn secondary">View Details</a>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            displayProjects(filter, visibleProjects);
            
            // Hide load more button if all projects are shown
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (filter !== 'all' || visibleProjects >= projects.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        });
    });
    
    // Load more projects
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        visibleProjects += 3;
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        displayProjects(activeFilter, visibleProjects);
        
        if (visibleProjects >= projects.length) {
            this.style.display = 'none';
        }
    });
    
    // Initialize projects
    displayProjects('all', visibleProjects);
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
    // Cookies Consent
    const cookiesConsent = document.querySelector('.cookies-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    // Check if cookies consent was already given
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiesConsent.classList.add('active');
        }, 2000);
    }
    
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiesConsent.classList.remove('active');
    });
    
    // Add CEO section to navigation
    const navLinks = document.querySelector('.nav-links');
    const ceoNavItem = document.createElement('li');
    ceoNavItem.innerHTML = '<a href="#ceo">CEO</a>';
    navLinks.insertBefore(ceoNavItem, navLinks.children[3]); // Insert before About link