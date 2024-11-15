(async () => {
    const scriptUrl = 'https://modss.tv/';
    const referer = 'https://lampa.mx/';

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

            const scriptContent = await response.text();

            // Выводим полученный скрипт в консоль для проверки
            console.log('Полученный скрипт:', scriptContent);

            // Выполняем полученный скрипт в глобальном контексте
            const scriptElement = document.createElement('script');
            scriptElement.textContent = scriptContent;
            document.head.appendChild(scriptElement);

            console.log('Скрипт успешно выполнен.');
        } catch (error) {
            console.error('Ошибка загрузки или выполнения скрипта:', error);
        }
    }

    // Загружаем и выполняем скрипт
    await loadAndExecuteScript();
})();