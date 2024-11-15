(async () => {
    // URL, откуда мы получаем скрипт
    const scriptUrl = 'https://modss.tv/';

    // Ваш кастомный реферер
    const referer = 'https://lampa.mx';

    // Функция для загрузки и выполнения скрипта
    async function loadAndExecuteScript() {
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

            // Читаем содержимое скрипта
            const scriptContent = await response.text();

            // Создаём новый тег <script> и вставляем код
            const scriptElement = document.createElement('script');
            scriptElement.textContent = scriptContent;

            // Вставляем <script> в документ, чтобы выполнить код
            document.head.appendChild(scriptElement);

            console.log('Скрипт успешно выполнен.');

        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // Загружаем и выполняем скрипт
    await loadAndExecuteScript();
})();