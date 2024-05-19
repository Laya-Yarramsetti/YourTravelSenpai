
function clearResults() {
    document.getElementById('search-input').value = '';
    document.getElementById('recommendations').innerHTML = '';
}


// Fetch data from JSON file
async function fetchRecommendations() {
    try {
        const response = await fetch('./travel_recommendation_api.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Search recommendations based on keyword
async function showRelated() {

    const keywords = {
                beach: ['beach', 'beaches'],
                temple: ['temple', 'temples'],
                country: ['country', 'countries']
            };
    console.log("inside");
    const keyword = document.getElementById('search-input').value.toLowerCase();
    const recommendations = await fetchRecommendations();
    const allRecommendations = Object.values(recommendations).flat();

    let filteredRecommendations =[];
    for (const key in allRecommendations) {
        if (allRecommendations.hasOwnProperty(key) && key.toLowerCase().includes(keyword)) {
            // Filter the array based on the search input
            filteredRecommendations = recommendations[key].filter(item => 
                Object.values(item).some(value => 
                    typeof value === 'string' && value.toLowerCase().includes(keyword)
                )
            );
            break; // Stop after finding the first matching key and its filtered items
        }
    }


    displayResults(filteredRecommendations);
}

// Display results
function displayResults(results) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';

        const image = document.createElement('img');
        image.src = result.imageUrl;
        image.alt = result.name;

        const name = document.createElement('h2');
        name.textContent = result.name;

        const description = document.createElement('p');
        description.textContent = result.description;

        resultDiv.appendChild(image);
        resultDiv.appendChild(name);
        resultDiv.appendChild(description);

        content.appendChild(resultDiv);
    });
}
