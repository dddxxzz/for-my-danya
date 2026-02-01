// ========== ОСНОВНЫЕ ПЕРЕМЕННЫЕ ==========

// Таймер отношений - 12 сентября 2024 года
const loveStartDate = new Date(2024, 8, 12, 0, 0, 0); // 12 сентября 2024, 00:00

// Элементы
const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
const volumeSlider = document.getElementById('volume-slider');
const volumeControl = document.getElementById('volume-control');

const nightModeBtn = document.getElementById('night-mode-btn');
const nightIcon = document.getElementById('night-icon');
const nightText = document.getElementById('night-text');

const secretContainer = document.querySelector('.secret-text-container');
const secretBlurred = document.getElementById('secret-blurred');
const secretClear = document.getElementById('secret-clear');

const complimentWindow = document.getElementById('compliment-window');
const openComplimentBtn = document.getElementById('open-compliment');
const closeComplimentBtn = document.getElementById('close-compliment');
const complimentText = document.getElementById('compliment-text');
const newComplimentBtn = document.getElementById('new-compliment');

// ========== ТАЙМЕР ОТНОШЕНИЙ (С 12.09.2024) ==========

function updateLoveTimer() {
    try {
        const now = new Date();
        const diff = now - loveStartDate;
        
        // Рассчитываем время
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        // Обновляем отображение
        const timerDays = document.getElementById('timer-days');
        const timerDetails = document.getElementById('timer-details');
        
        if (timerDays) {
            if (days === 0) {
                timerDays.textContent = `Первый день! 💖`;
            } else if (days === 1) {
                timerDays.textContent = `1 день вместе`;
            } else if (days < 30) {
                timerDays.textContent = `${days} дней вместе`;
            } else {
                const months = Math.floor(days / 30);
                const remainingDays = days % 30;
                const weeks = Math.floor(days / 7);
                
                if (months === 1) {
                    timerDays.textContent = `${months} месяц`;
                } else if (months < 12) {
                    timerDays.textContent = `${months} месяцев`;
                } else {
                    const years = Math.floor(months / 12);
                    timerDays.textContent = `${years} год${years > 1 ? 'а' : ''}!`;
                }
                
                if (timerDetails) {
                    timerDetails.textContent = `${days} дней • ${weeks} недель • ${months} месяцев`;
                }
            }
        }
        
        // Добавляем детали для первых дней
        if (timerDetails && days < 7) {
            timerDetails.textContent = `${hours} часов • ${minutes} минут счастливых мгновений`;
        }
    } catch (error) {
        console.log("Ошибка в таймере:", error);
    }
}

// ========== МУЗЫКА ==========

// Настройка громкости
if (music) {
    try {
        music.volume = 0.3;
        if (volumeSlider) volumeSlider.value = 0.3;
    } catch (error) {
        console.log("Ошибка настройки музыки:", error);
    }
}

// Включение музыки
function playMusic() {
    if (!music) return;
    
    try {
        music.play().then(() => {
            if (musicBtn) {
                musicBtn.style.background = 'linear-gradient(45deg, #ff66b2, #ff99cc)';
            }
            if (musicIcon) {
                musicIcon.className = 'fas fa-pause';
            }
            if (volumeControl) {
                volumeControl.style.display = 'block';
            }
            localStorage.setItem('music-playing', 'true');
        }).catch(error => {
            console.log("Ошибка воспроизведения:", error);
        });
    } catch (error) {
        console.log("Ошибка в playMusic:", error);
    }
}

// Предложение включить музыку
setTimeout(() => {
    if (music && music.paused) {
        const playMusicNow = localStorage.getItem('music-playing') === 'true';
        if (playMusicNow) {
            playMusic();
        } else if (window.innerWidth > 768) { // Только на десктопе спрашиваем
            setTimeout(() => {
                if (confirm('Включить фоновую музыку? 🎵')) {
                    playMusic();
                }
            }, 1000);
        }
    }
}, 1500);

// Кнопка play/pause
if (musicBtn) {
    musicBtn.addEventListener('click', function() {
        if (!music) return;
        
        if (music.paused) {
            playMusic();
        } else {
            music.pause();
            if (musicBtn) {
                musicBtn.style.background = 'linear-gradient(45deg, #ff99cc, #ff66b2)';
            }
            if (musicIcon) {
                musicIcon.className = 'fas fa-play';
            }
            if (volumeControl) {
                volumeControl.style.display = 'none';
            }
            localStorage.setItem('music-playing', 'false');
        }
    });
    
    // Для мобильных: скрываем громкость при паузе
    music.addEventListener('pause', function() {
        if (volumeControl && window.innerWidth <= 768) {
            volumeControl.style.display = 'none';
        }
    });
}

// Громкость
if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
        if (music) {
            music.volume = parseFloat(this.value);
            localStorage.setItem('music-volume', this.value);
        }
    });
    
    // Восстанавливаем громкость
    const savedVolume = localStorage.getItem('music-volume');
    if (savedVolume && music) {
        music.volume = parseFloat(savedVolume);
        volumeSlider.value = savedVolume;
    }
}

// ========== НОЧНОЙ РЕЖИМ ==========

if (nightModeBtn) {
    let isNightMode = localStorage.getItem('night-mode') === 'true';
    
    // Применяем сохраненный режим
    if (isNightMode) {
        document.body.classList.add('night-mode');
        if (nightIcon) nightIcon.className = 'fas fa-sun';
        if (nightText) nightText.textContent = 'День';
    }
    
    nightModeBtn.addEventListener('click', function() {
        isNightMode = !isNightMode;
        document.body.classList.toggle('night-mode');
        
        if (isNightMode) {
            if (nightIcon) nightIcon.className = 'fas fa-sun';
            if (nightText) nightText.textContent = 'День';
        } else {
            if (nightIcon) nightIcon.className = 'fas fa-moon';
            if (nightText) nightText.textContent = 'Ночь';
        }
        
        localStorage.setItem('night-mode', isNightMode);
    });
}

// ========== СЕКРЕТНОЕ ПОСЛАНИЕ ==========

if (secretContainer && secretBlurred && secretClear) {
    let isSecretRevealed = false;
    
    secretContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!isSecretRevealed) {
            // Показываем чистое послание
            secretBlurred.style.display = 'none';
            secretClear.style.display = 'block';
            isSecretRevealed = true;
        } else {
            // Возвращаем размазанное
            secretClear.style.display = 'none';
            secretBlurred.style.display = 'block';
            isSecretRevealed = false;
        }
    });
    
    // Для сенсорных устройств добавляем вибрацию
    secretContainer.addEventListener('touchstart', function() {
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
}

// ========== КОМПЛИМЕНТЫ ==========

const compliments = [
    "Ты самый добрый и заботливый человек на свете! 💖",
    "Твоя улыбка делает мой день лучше! 😊",
    "С тобой я чувствую себя самой счастливой! ✨",
    "Ты умеешь слушать и понимать как никто другой! 👂",
    "Твои объятия — самое безопасное место в мире! 🤗",
    "Ты вдохновляешь меня становиться лучше каждый день! 🌟",
    "С тобой даже обычный день становится праздником! 🎉",
    "Ты мой самый лучший друг и любовь одновременно! 💕",
    "Твоё чувство юмора — лучшее лекарство от грусти! 😄",
    "Я так счастлива, что встретила именно тебя! 🥰",
    "Ты делаешь этот мир ярче своим присутствием! 🌈",
    "Твоя поддержка значит для меня всё! 💪",
    "С тобой я могу быть собой и это бесценно! 💝",
    "Ты самый надёжный человек, которого я знаю! ⭐",
    "Моё сердце бьётся быстрее, когда я думаю о тебе! 💓",
    "Ты мой самый красивый закат и самая тёплая ночь! 🌅",
    "Спасибо, что ты есть в моей жизни! 🙏",
    "Ты мой островок спокойствия в бушующем море! 🏝️",
    "Твои глаза — мои любимые звёзды! ✨",
    "Я верю в нас, в нашу любовь! 💞"
];

// Показать случайный комплимент
function showRandomCompliment() {
    if (!complimentText) return;
    
    const randomIndex = Math.floor(Math.random() * compliments.length);
    complimentText.textContent = compliments[randomIndex];
    complimentText.style.animation = 'none';
    setTimeout(() => {
        complimentText.style.animation = 'fadeIn 0.3s ease';
    }, 10);
}

// Открыть окно комплиментов
if (openComplimentBtn) {
    openComplimentBtn.addEventListener('click', function() {
        if (complimentWindow) {
            complimentWindow.classList.add('active');
            showRandomCompliment();
            
            // Вибрация на мобильных
            if (navigator.vibrate) {
                navigator.vibrate([50, 30, 50]);
            }
        }
    });
}

// Закрыть окно комплиментов
if (closeComplimentBtn) {
    closeComplimentBtn.addEventListener('click', function() {
        if (complimentWindow) {
            complimentWindow.classList.remove('active');
        }
    });
}

// Закрыть по клику на фон
if (complimentWindow) {
    complimentWindow.addEventListener('click', function(e) {
        if (e.target === complimentWindow) {
            complimentWindow.classList.remove('active');
        }
    });
}

// Новый комплимент
if (newComplimentBtn) {
    newComplimentBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showRandomCompliment();
        
        // Вибрация
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });
}

// ========== ЭФФЕКТЫ ДЛЯ ТЕЛЕФОНОВ ==========

// Клик по сердечкам
document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('click', function() {
        this.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
        
        // Создаем мини-сердечко
        createMiniHeart(this.getBoundingClientRect());
    });
});

// Создаем мини-сердечки при клике
function createMiniHeart(rect) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = '20px';
    heart.style.left = rect.left + rect.width/2 + 'px';
    heart.style.top = rect.top + 'px';
    heart.style.zIndex = '10000';
    heart.style.pointerEvents = 'none';
    heart.style.opacity = '0.9';
    
    document.body.appendChild(heart);
    
    // Анимация
    const animation = heart.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-50px) scale(0.5)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    
    animation.onfinish = () => {
        heart.remove();
    };
}

// Плавающие сердечки (оптимизировано для телефонов)
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floating-hearts');
    if (!heartsContainer) return;
    
    // Ограничиваем количество сердец на телефонах
    const heartCount = window.innerWidth <= 768 ? 5 : 10;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * 15 + 12 + 'px';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.opacity = '0';
            heart.style.zIndex = '1';
            heart.style.pointerEvents = 'none';
            heart.style.willChange = 'transform, opacity';
            
            heartsContainer.appendChild(heart);
            
            // Анимация
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            heart.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                { transform: `translateY(-${Math.random() * 50 + 30}vh) rotate(${Math.random() * 360}deg)`, opacity: 0.6 },
                { transform: `translateY(-100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity
            });
        }, i * 500);
    }
}

// ========== ЗАГРУЗКА ==========

document.addEventListener('DOMContentLoaded', function() {
    // Добавляем текущую дату
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                   'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const today = new Date();
    const dateString = today.getDate() + ' ' + months[today.getMonth()] + ' ' + today.getFullYear();
    
    const datePlaceholder = document.getElementById('date-placeholder');
    if (datePlaceholder) {
        datePlaceholder.textContent = dateString;
    }
    
    // Запускаем таймер сразу и каждую минуту
    updateLoveTimer();
    setInterval(updateLoveTimer, 60000);
    
    // Плавающие сердечки с задержкой
    setTimeout(createFloatingHearts, 800);
    
    // Предотвращаем стандартное поведение касания
    document.addEventListener('touchmove', function(e) {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Оптимизация для iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.cursor = 'pointer';
    }
    
    // Запускаем музыку если была включена
    const shouldPlayMusic = localStorage.getItem('music-playing') === 'true';
    if (shouldPlayMusic && music) {
        setTimeout(() => {
            playMusic();
        }, 1000);
    }
});

// Обновляем таймер при возвращении на вкладку
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateLoveTimer();
    }
});

// Для свайпов (дополнительная оптимизация)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    // Можно добавить функционал свайпов если нужно
}