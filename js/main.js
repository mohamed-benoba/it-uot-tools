import * as dataModule from './data.js'
import * as tabsModule from './tabs.js'
import * as searchModule from './search.js'
const searchInput = document.getElementById('searchInput');

tabsModule.createTheAllTab();
tabsModule.createTabs();

searchInput.addEventListener('input', searchModule.search);
searchInput.addEventListener('click', searchModule.search);
searchInput.addEventListener('blur', searchModule.focusOutSearch);


