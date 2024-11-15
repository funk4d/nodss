(async () => {
    // URL, откуда мы получаем скрипт
    const scriptUrl = 'https://modss.tv';

    // Ваш кастомный реферер
    const referer = 'https://lampa.mx';

    // Функция для загрузки скрипта
    async function loadScript() {
        try {
            const response = await fetch(scriptUrl, {
                method: 'GET',
                headers: {
                    'Referer': referer
                }
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка загрузки скрипта: ${response.statusText}`);
            }
    
            const scriptContent = await response.text();
    
            // Возвращаем содержимое скрипта
            return scriptContent;
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // Загружаем и выполняем скрипт
    await loadScript();
})();