 // Функция для получения имени гостя: приоритет: URL параметр ?guest=Имя, потом localStorage, потом "Дорогой гость"
    function getGuestName() {
        const urlParams = new URLSearchParams(window.location.search);
        let guestParam = urlParams.get('guest');
        if (guestParam) {
            guestParam = decodeURIComponent(guestParam.trim());
            if (guestParam.length > 0) {
                localStorage.setItem('guestName', guestParam);
                return guestParam;
            }
        }
        if (localStorage.getItem('guestName')) {
            return localStorage.getItem('guestName');
        }
        return "Дорогой гость";
    }

    // Вставляем имя гостя в соответствующий элемент
    const guestSpan = document.getElementById('guest');
    if (guestSpan) {
        const userName = getGuestName();
        guestSpan.textContent = userName;
        // легкая анимация появления
        guestSpan.style.opacity = '0';
        guestSpan.style.transform = 'translateY(6px)';
        setTimeout(() => {
            guestSpan.style.transition = 'all 0.45s ease-out';
            guestSpan.style.opacity = '1';
            guestSpan.style.transform = 'translateY(0)';
        }, 80);
    }

    // анимация появления секций при скролле
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -20px 0px" });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // если секции уже видны при загрузке
    window.addEventListener('load', () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add('visible');
                observer.unobserve(section);
            }
        });
        // плавное появление hero-text
        const heroBlock = document.querySelector('.hero-text');
        if(heroBlock && !heroBlock.style.opacity) {
            heroBlock.style.opacity = '0';
            heroBlock.style.transform = 'translateX(10px)';
            setTimeout(() => {
                heroBlock.style.transition = 'all 0.6s ease';
                heroBlock.style.opacity = '1';
                heroBlock.style.transform = 'translateX(0)';
            }, 150);
        }
    });
    
    // календарь - напоминание
    const calendarBtn = document.getElementById('addToCalendarBtn');
    if(calendarBtn) {
        calendarBtn.addEventListener('click', () => {
            alert('📅 Сохраните важные даты:\n\n31 июля 2026, 12:00 — Регистрация (г. Ухта, Ленина 37/1)\n1 августа 2026 — База отдыха "Крохаль" (транспорт с 11:20)\n\nЖдём вас с нетерпением!');
        });
    }