function decodeParam(param) {
    return decodeURIComponent(param.replace(/\+/g, ' '));
}

const fields = [{ name: 'creatorName', label: 'Creator Name' },
{ name: 'gameName', label: 'Game Name' },
{ name: 'gameDesc', label: 'Game Description' },
{ name: 'genre', label: 'Genre' },
{ name: 'releaseDate', label: 'Release Date' },
{ name: 'contactEmail', label: 'Contact Email' },
{ name: 'website', label: 'Website or Store Link' },
{ name: 'terms', label: 'Agreed to Terms' }];

export function initSubmitForm() {
    const submittedDataElem = document.getElementById('submittedData');
    const params = new URLSearchParams(window.location.search);

    fields.forEach(field => {
        let value = params.get(field.name);
        if (value === null || value.trim() === '') {
            value = '(Not provided)';
        } else {
            if (field.name === 'terms') {
                value = (value === 'on' || value === 'true') ? 'Yes' : 'No';
            } else if (field.name === 'releaseDate') {
                try {
                    const dateObj = new Date(value);
                    if (!isNaN(dateObj)) {
                        value = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                    }
                } catch { /* ignore error */ }
            }
            value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        const dt = document.createElement('dt');
        dt.textContent = field.label;
        const dd = document.createElement('dd');
        dd.innerHTML = value;
        submittedDataElem.appendChild(dt);
        submittedDataElem.appendChild(dd);
    });

    const yearElem = document.getElementById('currentyear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
}