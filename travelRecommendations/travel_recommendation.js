async function showRelated() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();

    const keywords = {
        beach: ['beach', 'beaches'],
        temple: ['temple', 'temples'],
        country: ['country', 'countries']
    };

    const results = data.recommendations.filter(item => {
        return Object.values(keywords).flat().some(keyword => item.title.toLowerCase().includes(searchInput));
    });

    displayResults(results);
}

function displayResults(results) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';

    if (results.length > 0) {
        results.forEach(item => {
            const div = document.createElement('div');
            div.className = 'recommendation';
            div.innerHTML = `
                <h3>${item.title}</h3>
                <img src="${item.imageUrl}" alt="${item.title}">
                <p>${item.description}</p>
            `;
            recommendations.appendChild(div);
        });
    } else {
        recommendations.innerHTML = '<p>No results found</p>';
    }
}

function clearResults() {
    document.getElementById('search-input').value = '';
    document.getElementById('recommendations').innerHTML = '';
}
