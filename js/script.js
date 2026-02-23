document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Run animation ONLY if it's a fresh visit or a reload
        // Check performance for reload type
        const perfData = window.performance && window.performance.getEntriesByType ? window.performance.getEntriesByType("navigation")[0] : null;
        const isReload = perfData ? perfData.type === 'reload' : (window.performance && window.performance.navigation && window.performance.navigation.type === 1);

        if (isReload || !sessionStorage.getItem('visited')) {
            // It's a Reload or First Time Visit -> SHOW Animation
            sessionStorage.setItem('visited', 'true');
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 2000); // 2.5s display time
        } else {
            // It's an internal navigation (e.g. clicking Home) -> HIDE Immediately
            preloader.style.transition = 'none'; // Disable transition for instant hide
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            preloader.classList.add('hide');

            // Restore transition after a small delay if needed for future fade-outs, though not strictly necessary here
            setTimeout(() => {
                preloader.style.transition = '';
            }, 100);
        }
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);


    // Stats Counter Animation
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + (counter.getAttribute('data-target') === '100' ? '%' : '+');
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle (Simple version)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Portfolio modal (only on portfolio page)
    const projectModal = document.getElementById('project-modal');
    const projectImage = document.getElementById('project-image');
    const projectTitle = document.getElementById('project-title');
    const projectDesc = document.getElementById('project-desc');
    const projectClient = document.getElementById('project-client');
    const projectType = document.getElementById('project-type');
    const projectLocation = document.getElementById('project-location');
    const projectYear = document.getElementById('project-year');
    const projectTimeline = document.getElementById('project-timeline');
    const projectScope = document.getElementById('project-scope');
    const projectDeliverables = document.getElementById('project-deliverables');
    const projectHighlights = document.getElementById('project-highlights');
    const projectCounter = document.getElementById('project-counter');

    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (projectModal && portfolioItems.length > 0) {
        const projectData = {
            'modern-living-room': {
                title: 'Baghe Farid Laxuria',
                desc: 'Warm neutrals, layered textures, and soft lighting crafted for a calm, luxurious family space.',
                client: 'Shreemdesign',
                type: 'Exterior',
                location: 'Ahmedabad',
                year: '2025',
                timeline: '5 Weeks',
                scope: 'Living, Dining, Entry',
                deliverables: ['3 Hero Stills', '2 Detail Shots', 'Material Board'],
                highlights: ['Warm Daylight Studies', 'Custom Furniture'],
                images: ['assets/images/i (1).webp', 'assets/images/i (2).webp','assets/images/i (3).webp', 'assets/images/i (4).webp','assets/images/i (5).webp', 'assets/images/i (6).webp',]
            },
            'sunset-villa': {
                title: 'Sunset Villa',
                desc: 'A resort-style exterior designed around golden-hour lighting and bold stone textures.',
                client: 'Al Noor',
                type: 'Exterior',
                location: 'Dubai',
                year: '2025',
                timeline: '6 Weeks',
                scope: 'Facade, Landscape, Entry',
                deliverables: ['4 Hero Stills', '2 Detail Shots'],
                highlights: ['Cinematic Lighting', 'Landscape Integration'],
                images: ['assets/images/exterior_villa.png', 'assets/images/i 3.webp', 'assets/images/i 4.webp']
            },
            'minimalist-kitchen': {
                title: 'Minimalist Kitchen',
                desc: 'Refined material palette and clean geometry for a modern culinary space.',
                client: 'Studio North',
                type: 'Interior Detail',
                location: 'London',
                year: '2024',
                timeline: '3 Weeks',
                scope: 'Kitchen, Pantry',
                deliverables: ['2 Hero Stills', '3 Detail Shots'],
                highlights: ['Matte Finish Study', 'Soft Shadow Control'],
                images: ['assets/images/kitchen_detail.png', 'assets/images/i 2.webp', 'assets/images/i 1.webp']
            },
            'master-bedroom': {
                title: 'Master Bedroom',
                desc: 'A serene suite with layered fabrics, warm lighting, and a tailored color story.',
                client: 'Lumen Homes',
                type: 'Interior',
                location: 'New York',
                year: '2025',
                timeline: '4 Weeks',
                scope: 'Bedroom, Lounge',
                deliverables: ['3 Hero Stills', '2 Detail Shots'],
                highlights: ['Soft Fabric Study', 'Ambient Lighting'],
                images: ['assets/images/interior_living.png', 'assets/images/i 3.webp', 'assets/images/i 1.webp']
            },
            'skyline-tower': {
                title: 'Skyline Tower',
                desc: 'High-rise visualization focused on scale, urban context, and evening glow.',
                client: 'Northfield',
                type: 'Commercial',
                location: 'Toronto',
                year: '2025',
                timeline: '7 Weeks',
                scope: 'Tower, Plaza, Streetscape',
                deliverables: ['4 Hero Stills', '2 Detail Shots'],
                highlights: ['Night Render Study', 'City Context'],
                images: ['assets/images/exterior_villa.png', 'assets/images/i 4.webp', 'assets/images/i 2.webp']
            },
            'spa-bathroom': {
                title: 'Spa Bathroom',
                desc: 'Spa-like detailing with stone textures, soft light, and tranquil reflections.',
                client: 'Maison Atelier',
                type: 'Interior Detail',
                location: 'Paris',
                year: '2024',
                timeline: '3 Weeks',
                scope: 'Bath, Vanity',
                deliverables: ['2 Hero Stills', '2 Detail Shots'],
                highlights: ['Stone Study', 'Reflective Lighting'],
                images: ['assets/images/kitchen_detail.png', 'assets/images/i 1.webp', 'assets/images/i 3.webp']
            }
        };

        let currentProject = null;
        let currentIndex = 0;

        const updateModal = () => {
            if (!currentProject) return;
            const images = currentProject.images || [];
            const safeIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
            currentIndex = safeIndex;
            projectImage.src = images[currentIndex] || '';
            projectCounter.textContent = `${currentIndex + 1} / ${images.length || 1}`;
        };

        const openModal = (projectId) => {
            currentProject = projectData[projectId];
            if (!currentProject) return;

            projectTitle.textContent = currentProject.title;
            projectDesc.textContent = currentProject.desc;
            projectClient.textContent = currentProject.client;
            projectType.textContent = currentProject.type;
            projectLocation.textContent = currentProject.location;
            projectYear.textContent = currentProject.year;
            projectTimeline.textContent = currentProject.timeline;
            projectScope.textContent = currentProject.scope;

            projectDeliverables.innerHTML = '';
            currentProject.deliverables.forEach(item => {
                const chip = document.createElement('span');
                chip.textContent = item;
                projectDeliverables.appendChild(chip);
            });

            projectHighlights.innerHTML = '';
            currentProject.highlights.forEach(item => {
                const chip = document.createElement('span');
                chip.textContent = item;
                projectHighlights.appendChild(chip);
            });

            currentIndex = 0;
            updateModal();
            projectModal.classList.add('open');
            projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            projectModal.classList.remove('open');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const projectId = item.getAttribute('data-project');
                openModal(projectId);
            });
        });

        projectModal.querySelectorAll('[data-close]').forEach(el => {
            el.addEventListener('click', closeModal);
        });

        projectModal.querySelector('[data-prev]').addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentProject) return;
            currentIndex = (currentIndex - 1 + currentProject.images.length) % currentProject.images.length;
            updateModal();
        });

        projectModal.querySelector('[data-next]').addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentProject) return;
            currentIndex = (currentIndex + 1) % currentProject.images.length;
            updateModal();
        });

        document.addEventListener('keydown', (e) => {
            if (!projectModal.classList.contains('open')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentProject.images.length) % currentProject.images.length;
                updateModal();
            }
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentProject.images.length;
                updateModal();
            }
        });
    }
});
