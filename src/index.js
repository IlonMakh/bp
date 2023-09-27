document.addEventListener("DOMContentLoaded", () => {
    const userLanguage = navigator.language.slice(0, 2);
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get("lang") || userLanguage;

    function interpolateVariables(translation, variables) {
        return translation.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
            return variables[variableName] || match;
        });
    }

    function applyTranslations(translations) {
        const elementsWithTranslations = document.querySelectorAll("[data-translate]");
        let isSecondTime = false;
    
        elementsWithTranslations.forEach((element) => {
            const translationKey = element.getAttribute("data-translate");
            let replacedTranslation = translations[translationKey];
    
            if (translationKey === "Just {{price}} per year") {
                const price = "$39.99";
                replacedTranslation = interpolateVariables(replacedTranslation, { price });
            }
    
            if (translationKey === "{{price}} <br>per week" && !isSecondTime) {
                const price = "$0.48";
                replacedTranslation = interpolateVariables(replacedTranslation, { price });
                isSecondTime = true;
            }
    
            if (translationKey === "{{price}} <br>per week" && isSecondTime) {
                const price = "$6.99";
                replacedTranslation = interpolateVariables(replacedTranslation, { price });
            }
    
            element.innerHTML = replacedTranslation || translations[translationKey];
        });
    }

    if (lang) {
        document.documentElement.classList.add(`lang-${lang}`);
        fetch(`data/${lang}.json`)
            .then((response) => {
                if (!response.ok) {
                    document.documentElement.classList.add(`lang-en`);
                    return fetch('data/en.json')
                    .then((response) => response.json());
                }
                return response.json();
            })
            .then((translations) => {
                applyTranslations(translations);
            })
            .catch((error) => {
                console.error(`Error loading translations: ${error}`);
            });
    }
});
