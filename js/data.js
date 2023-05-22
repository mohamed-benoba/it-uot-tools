export const paragraphsWithTitle = document.querySelectorAll('p[title]');
export const tabsContainer = document.getElementById('tabsContainer');
export const scrollableTabsContanier = document.getElementById('scrollableTabsContanier');
export const tabs = document.querySelectorAll('.tab');
export const subjects = [];



/* 
  Fill up subjects variable with data:
*/

// To remove duplicates (Same subject but different groups)
const uniqueTitles = new Set();

paragraphsWithTitle.forEach((paragraph) => {
  console.log(paragraph)
  const title = paragraph.title;
  if (!uniqueTitles.has(title)) {
    uniqueTitles.add(title);
    subjects.push({
      'name': paragraph.title,
      'code': paragraph.textContent,
      // 'department': (sub) => {
      //   console.log(sub)
      //   // if(sub.code.has('ITWT')) {
      //   //   return 'قسم الإنترنت'
      //   // } else if(sub.code.has('ITSE')) {
      //   //   return 'قسم هندسة البرمجيات'
      //   // } else if(sub.code.has('ITNT')) {
      //   //   return 'قسم الشبكات'
      //   // } else if(sub.code.has('ITMC')) {
      //   //   return 'قسم الحوسبة'
      //   // } else {
      //   //   return 'القسم العام'
      //   // }
        
      // },
    });
  }
});

subjects.forEach(sub => {
  console.log(sub.name)
})

// function getSubjectDepartment