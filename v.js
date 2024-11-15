(async () => {
    // URL, откуда мы получаем скрипт
    const scriptUrl = 'https://modss.tv/';

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

            // Читаем содержимое скрипта как текст
            const scriptContent = await response.text();

            // Выводим содержимое в консоль
            console.log('Содержимое скрипта:', scriptContent);

            return scriptContent;
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // Загружаем и выводим скрипт
    await loadScript();
})();