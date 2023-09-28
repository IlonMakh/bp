document.addEventListener("DOMContentLoaded", () => {
    const yearPrice = "$39.99";
    const yearlyAccessPrice = "$0.48";
    const weeklyAccessPrice = "$6.99";
    const userLanguage = navigator.language.slice(0, 2);
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get("lang") || userLanguage;
    let vh = window.innerHeight * 0.01;
    
    document.documentElement.style.setProperty('--vh', `${vh}px`);

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
                replacedTranslation = interpolateVariables(replacedTranslation, { price: yearPrice });
            }
    
            if (translationKey === "{{price}} <br>per week" && !isSecondTime) {
                replacedTranslation = interpolateVariables(replacedTranslation, { price: yearlyAccessPrice });
                isSecondTime = true;
            }
    
            if (translationKey === "{{price}} <br>per week" && isSecondTime) {
                replacedTranslation = interpolateVariables(replacedTranslation, { price: weeklyAccessPrice });
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
