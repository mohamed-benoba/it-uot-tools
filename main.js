/* 
  By: Ben Nouba, 11/5/2023
  Note (20/5/2023): This code is a legacy a code and needs to be refactored 
*/

const paragraphsWithTitle = document.querySelectorAll('p[title]');
const tabsContainer = document.getElementById('tabs');
const tabContent = document.querySelector('.tab-content');

// Create all first tab
allTab();

const uniqueTitles = new Set();
const uniqueParagraphs = [];

// uniqueParagraphs: remove duplicates (same subject, different groups)
paragraphsWithTitle.forEach((paragraph) => {
  const title = paragraph.title;
  if (!uniqueTitles.has(title)) {
    uniqueTitles.add(title);
    uniqueParagraphs.push(paragraph);
  }
});

// this is now used in search but should be used in all the program
let titlesArr = [];
uniqueParagraphs.forEach((paragraph, index) => {
  titlesArr.push(paragraph.title);
})

console.log(paragraphsWithTitle)
console.log(uniqueParagraphs)
uniqueParagraphs.forEach((paragraph, index) => {
  const title = paragraph.title;
  
  // Create a new tab element
  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.textContent = title;
  tab.setAttribute('name', title);

  // Add click event listener to the tab
  tab.addEventListener('click', () => {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add 'active' class to the clicked tab
    tab.classList.add('active');
    
    // Scroll the tab container to bring the clicked tab into view
    tabsContainer.scrollLeft = tab.offsetLeft;

    // Update the content based on the selected tab
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    randomColor += '2D';


    document.querySelectorAll(`p[title]`).forEach(paragraph => {{
      paragraph.style.color = 'black';
      paragraph.style.display = 'none';
      let nextDiv;
      if(paragraph.nextElementSibling != null) {
        nextDiv = paragraph.nextElementSibling;
      } else {
        nextDiv = paragraph.parentNode.nextElementSibling;
      }
      nextDiv.style.display = 'none';
        
    }})

    
    document.querySelectorAll(`p[title="${paragraph.title}"]`).forEach(paragraph => {{
      paragraph.style.background =  randomColor;
      paragraph.style.display = 'block';
      let nextDiv;
      if(paragraph.nextElementSibling != null) {
        nextDiv = paragraph.nextElementSibling;
      } else {
        nextDiv = paragraph.parentNode.nextElementSibling;
      }
      nextDiv.style.display = 'block';
    }})
    
  });

  // Append the tab to the tabs container
  tabsContainer.appendChild(tab);
});

// Set the initial active tab
const initialTab = document.querySelector('.tab');
initialTab.classList.add('active');


// All tab 
function allTab() {
  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.textContent = 'الكل';
  tabsContainer.appendChild(tab);

  tab.addEventListener('click', () => {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add 'active' class to the clicked tab
    tab.classList.add('active');
    
    // Scroll the tab container to bring the clicked tab into view
    tabsContainer.scrollLeft = tab.offsetLeft;

    
    document.querySelectorAll(`p[title]`).forEach(paragraph => {{
      paragraph.style.background = 'blanchedalmond';
      paragraph.style.display = 'block';
      let nextDiv;
      if(paragraph.nextElementSibling != null) {
        nextDiv = paragraph.nextElementSibling;
      } else {
        nextDiv = paragraph.parentNode.nextElementSibling;
      }
      nextDiv.style.display = 'block';
    }})
    
  });
}


// Search
function search() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const results = [];
  titlesArr.forEach((title) => {
    const titleText = title.toLowerCase();
    if (titleText.includes(searchInput)) {
      results.push(title);
    }
  });

  displayResults(results, searchInput);
}

function displayResults(results) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  if (results.length === 0) {
    searchResults.innerHTML = '<p>No results found.</p>';
    return;
  }
  console.log('h')
  console.log()
  console.log()
  if (searchInput.value.length === 0) {
    searchResults.innerHTML = '<p></p>';
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

const tabs = document.querySelector('.tabs');
function filterBasedOnSearchClick() {

  const tab = document.querySelector(`.tabs .tab[name="${this.textContent}"]`);
  console.log(tab)
  // Programmatically trigger a real click event
tab.click()
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', search);
