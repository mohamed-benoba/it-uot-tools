import * as dataModule from './data.js'

// Search
export function search() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const results = [];
  dataModule.subjects.forEach((title) => {
    const titleText = title.name.toLowerCase();
    if (titleText.includes(searchInput)) {
      results.push(title.name);
    }
  });

  displayResults(results, searchInput);
}

export function focusOutSearch() {
  setTimeout(() => {
    document.getElementById('searchResults').innerHTML = ''
  }, 500)
}

function displayResults(results) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  if (results.length === 0) {
    searchResults.innerHTML = '<ul>لا يوجد أي نتائج، تحقق من عدم وجود خطأ إملائي.</ul>';
    return;
  }
  if (searchInput.value.length === 0) {
    searchResults.innerHTML = '';
    return;
  }

  const resultList = document.createElement('ul');
  results.forEach((result) => {
    const listItem = document.createElement('li');
    listItem.textContent = result;
    resultList.appendChild(listItem);
    listItem.addEventListener('click', filterBasedOnSearchClick)
  });

  searchResults.appendChild(resultList);
  
}

function filterBasedOnSearchClick() {
  const tab = document.querySelector(`.tabs-container .tab[name="${this.textContent}"]`);
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  searchInput.value = tab.textContent;
  searchResults.textContent = '';
  // Programmatically trigger a real click event
  tab.click()
}



