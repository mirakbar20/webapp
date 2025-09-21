"use strict";

// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Инициализация темы при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('themeToggle');
    if (!btn) {
        console.error('Theme toggle button not found');
        return;
    }

    let theme = localStorage.getItem('theme') || 'dark';
    let isAnimating = false;

    function setTheme(newTheme) {
        if (isAnimating) return;
        isAnimating = true;

        // Применяем тему
        theme = newTheme;
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);

        // Обновляем кнопку
        const icon = btn.querySelector('.theme-icon');
        const text = btn.querySelector('.theme-text');

        // Добавляем анимацию
        document.body.classList.add('theme-transition');
        btn.style.transform = 'scale(0.95)';

        // Обновляем UI
        if (theme === 'dark') {
            icon.textContent = '🌙';
            text.textContent = 'Темная тема';
            tg.setHeaderColor('#1a1a2e');
            tg.setBackgroundColor('#0c0c0c');
        } else {
            icon.textContent = '☀️';
            text.textContent = 'Светлая тема';
            tg.setHeaderColor('#667eea');
            tg.setBackgroundColor('#f8fafc');
        }

        // Завершаем анимацию
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
            btn.style.transform = 'scale(1)';
            isAnimating = false;
        }, 600);
    }

    // Применяем начальную тему
    setTheme(theme);

    // Обработчик клика
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
    });

    // Эффекты при наведении
    btn.addEventListener('mouseenter', () => {
        if (!isAnimating) btn.style.transform = 'scale(1.05)';
    });

    btn.addEventListener('mouseleave', () => {
        if (!isAnimating) btn.style.transform = 'scale(1)';
    });
});