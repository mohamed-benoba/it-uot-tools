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

    // Empty selected subjects
    emptyTable();
    dataModule.selectedSubjects.length = 0;

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
    
    // Create a new tab element
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.textContent = subject.name;
    tab.setAttribute('name', subject.name);

    tab.addEventListener('click', (e) => {
      // get outside if selected
      if(isSubjectPreSelected(subject)) return;

      // Fill selected subject array
      dataModule.selectedSubjects.push(subject);

      // Related to table
      updateTable();

      // Related to tabs
      scrollToTab(e);
      handleTabsStyleAndRareCases(e, tab);

      // Related to selected tabs
      addSelectedTab(subject)
    });
  
    // Append the tab to the tabs container
    dataModule.tabsContainer.appendChild(tab);
  });
}

function isSubjectPreSelected(subject) {
  let isPreSelected = false;
  dataModule.selectedSubjects.forEach(selectedSubject => {
    if(selectedSubject.name == subject.name) isPreSelected = true;
  })
  return isPreSelected;
}


// Table related

function updateTable() {
  emptyTable();

  dataModule.selectedSubjects.forEach(selectedSubject => {
  let randomColor = getRandomColor();

    document.querySelectorAll(`p[title="${selectedSubject.name}"]`).forEach(paragraph => {{

      paragraph.style.background =  randomColor;
      // paragraph.style.color =  'white';
      paragraph.style.display = 'block';
  
      let nextDiv;
      if(paragraph.nextElementSibling != null) nextDiv = paragraph.nextElementSibling;
      else nextDiv = paragraph.parentNode.nextElementSibling;
      nextDiv.style.display = 'block';
  
    }})
  })

}

function emptyTable() {

  document.querySelectorAll(`p[title]`).forEach(paragraph => {{

    paragraph.style.color = 'black';
    paragraph.style.display = 'none';

    let nextDiv;
    if(paragraph.nextElementSibling != null) nextDiv = paragraph.nextElementSibling;
    else nextDiv = paragraph.parentNode.nextElementSibling;
    nextDiv.style.display = 'none';

  }})

}

// Tabs related


function handleTabsStyleAndRareCases(e, tab) {
  // Remove 'active' class from all tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Add 'active' class to the clicked tab
  tab.classList.add('active');

  // Remove search value when press tab, isTrusted means that user didn't click on it but from code
  if(e.isTrusted == true) searchInput.value = '';
}


function scrollToTab(e) {
  let tab = e.target;
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


function getRandomColor() {
  // Update the content based on the selected tab
  // let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  // randomColor += '2D';

  var r = Math.floor(Math.random() * 256); // Random value between 0 and 255
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var a = .3;

  // Create the color string in RGB format
  var color = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";

  return color;
  // return randomColor;
}


// Selected tabs related
function addSelectedTab(subject) {
  // Make tab
  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.textContent = subject.name;
  tab.setAttribute('name', subject.name);

  // Make x icon
  const img = document.createElement('img');
  img.src = 'assets/x-white.svg';
  img.addEventListener('click', () => {
    if(dataModule.selectedSubjects.length == 1) {
      document.querySelector('.theAllTab').click();
      updateSelectedTabs();
      return;
    }
    dataModule.selectedSubjects.forEach((selectedSubject, index) => {
      if(selectedSubject.name == subject.name) {
        dataModule.selectedSubjects.splice(index, 1);
        updateTable();
        updateSelectedTabs();
      }
    })  
  })

  document.querySelector('.selected-tabs-container').appendChild(tab);
  tab.appendChild(img);
}

function updateSelectedTabs() {
  document.querySelector('.selected-tabs-container').innerHTML = '';
  dataModule.selectedSubjects.forEach((selectedSubject) => {
    addSelectedTab(selectedSubject);
  })
}