// ===== ОСНОВНОЙ СКРИПТ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Extra Survival - JavaScript загружен');
    
    // Инициализация всех компонентов
    initMobileMenu();
    initActiveLinks();
    initAnimations();
    initCopyButtons();
    initHoverEffects();
});

// ===== МОБИЛЬНОЕ МЕНЮ =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        hamburger.innerHTML = isActive 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-expanded', isActive);
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===== ПОДСВЕТКА АКТИВНЫХ ССЫЛОК =====
function initActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Удаляем активный класс у всех ссылок
        link.classList.remove('active');
        
        // Добавляем активный класс текущей странице
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Если мы на главной (index.html или корень)
        if ((currentPage === 'index.html' || currentPage === '') && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
}

// ===== АНИМАЦИИ =====
function initAnimations() {
    // Анимация карточек при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll('.card, .pricing-card, .step-card, .faq-card, .info-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // CSS класс для анимации
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== КНОПКИ КОПИРОВАНИЯ =====
function initCopyButtons() {
    // Функция копирования IP адреса
    window.copyServerIP = function() {
        const ip = 'Extra_Survival.exaroton.me';
        
        // Проверяем поддержку clipboard API
        if (!navigator.clipboard) {
            fallbackCopy(ip);
            return;
        }
        
        navigator.clipboard.writeText(ip).then(() => {
            showNotification('✅ IP адрес скопирован: ' + ip, 'success');
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            fallbackCopy(ip);
        });
    };
    
    // Fallback для старых браузеров
    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? '✅ Скопировано' : '❌ Ошибка копирования';
            showNotification(msg + ': ' + text, successful ? 'success' : 'error');
        } catch (err) {
            console.error('Fallback ошибка:', err);
            showNotification('❌ Ошибка: ' + err, 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'info') {
    // Удаляем старое уведомление
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) oldNotification.remove();
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Иконка в зависимости от типа
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-triangle';
    if (type === 'warning') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Добавляем стили
    const styleId = 'notification-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 400px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .notification-success {
                background: rgba(46, 204, 113, 0.9);
                color: white;
                border-color: rgba(46, 204, 113, 0.5);
            }
            
            .notification-error {
                background: rgba(231, 76, 60, 0.9);
                color: white;
                border-color: rgba(231, 76, 60, 0.5);
            }
            
            .notification-warning {
                background: rgba(243, 156, 18, 0.9);
                color: white;
                border-color: rgba(243, 156, 18, 0.5);
            }
            
            .notification-info {
                background: rgba(52, 152, 219, 0.9);
                color: white;
                border-color: rgba(52, 152, 219, 0.5);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Автоматическое удаление через 4 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== ЭФФЕКТЫ ПРИ НАВЕДЕНИИ =====
function initHoverEffects() {
    // Эффект для кнопок
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Эффект для карточек
    document.querySelectorAll('.card, .pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Пропускаем якорные ссылки на другие страницы
        if (href.includes('.html')) return;
        
        e.preventDefault();
        
        const targetId = href;
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ОБРАБОТКА ОШИБОК =====
window.addEventListener('error', function(e) {
    console.error('🚨 Ошибка JavaScript:', e.message, e.filename, e.lineno);
});

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function formatDate(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

function isMobile() {
    return window.innerWidth <= 768;
}

// Экспортируем функции для глобального использования
window.ExtraSurvival = {
    copyServerIP: window.copyServerIP,
    showNotification: showNotification,
    isMobile: isMobile
};

console.log('🎮 Extra Survival - Готов к работе!');