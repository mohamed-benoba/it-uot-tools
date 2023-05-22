import * as dataModule from './data.js'

// Create tabs
export function createTheAllTab() {

  // Create the HTML
  const tab = document.createElement('div');
  tab.classList.add('tab', 'active', 'theAllTab');
  tab.textContent = 'جميع المواد';
  dataModule.tabsContainer.appendChild(tab);
  
  // allTab click event (it has some diff cases than other tabs)
  tab.addEventListener('click', () => {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add 'active' class to the clicked tab
    tab.classList.add('active');

    // Display all subjects
    document.querySelectorAll(`p[title]`).forEach(paragraph => {{
      paragraph.style.display = 'block';
      paragraph.style.background = 'blanchedalmond';
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


export function createTabs() {
  dataModule.subjects.forEach((subject, index) => {
    const selectedSubjectName = subject.name;
    
    // Create a new tab element
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.textContent = selectedSubjectName;
    tab.setAttribute('name', selectedSubjectName);
  
    tab.addEventListener('click', removeAllSubjectsFromHTML);
    tab.addEventListener('click', () => showSubjectsRelatedToTab(selectedSubjectName));
    tab.addEventListener('click', scrollToTab);
    tab.addEventListener('click', (e) => handleTabsStyleAndRareCases(e, tab));
  
    // Append the tab to the tabs container
    dataModule.tabsContainer.appendChild(tab);
  });
}


function removeAllSubjectsFromHTML() {

  document.querySelectorAll(`p[title]`).forEach(paragraph => {{

    paragraph.style.color = 'black';
    paragraph.style.display = 'none';

    let nextDiv;
    if(paragraph.nextElementSibling != null) nextDiv = paragraph.nextElementSibling;
    else nextDiv = paragraph.parentNode.nextElementSibling;
    nextDiv.style.display = 'none';

  }})

}


function showSubjectsRelatedToTab(selectedSubjectName) {

  let randomColor = makeRandomColor();

  document.querySelectorAll(`p[title="${selectedSubjectName}"]`).forEach(paragraph => {{

    paragraph.style.background =  randomColor;
    paragraph.style.display = 'block';

    let nextDiv;
    if(paragraph.nextElementSibling != null) nextDiv = paragraph.nextElementSibling;
    else nextDiv = paragraph.parentNode.nextElementSibling;
    nextDiv.style.display = 'block';

  }})

}


function handleTabsStyleAndRareCases(e, tab) {
  // Remove 'active' class from all tabs
  dataModule.tabs.forEach(tab => tab.classList.remove('active'));

  // Add 'active' class to the clicked tab
  tab.classList.add('active');

  // Remove search value when press tab, isTrusted means that user didn't click on it but from code
  if(e.isTrusted == true) searchInput.value = '';
}


function scrollToTab(event) {
  let tab = event.target;
  let tabRect = tab.getBoundingClientRect();
  // Calculate the scroll position to center the selected tab
  let scrollLeft;
  if(dataModule.scrollableTabsContanier.offsetWidth > tabRect.width){
    scrollLeft = tabRect.left + dataModule.scrollableTabsContanier.scrollLeft - (dataModule.scrollableTabsContanier.offsetWidth - tabRect.width) / 2;
  } else {
    scrollLeft = tabRect.left + dataModule.scrollableTabsContanier.scrollLeft;
  }
  dataModule.scrollableTabsContanier.scrollLeft = scrollLeft; 
}


function makeRandomColor() {
  // Update the content based on the selected tab
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  randomColor += '2D';
  return randomColor;
}
