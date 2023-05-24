export const paragraphsWithTitle = document.querySelectorAll('p[title]');
export const tabsContainer = document.getElementById('tabsContainer');
export const scrollableTabsContanier = document.getElementById('scrollableTabsContanier');
// doesn't work at supposed to?
export const tabs = document.querySelectorAll('.tab');
export const subjects = [];
export const selectedSubjects = [];



/* 
  Fill up subjects variable with data:
*/

// To remove duplicates (Same subject but different groups)
const uniqueTitles = new Set();

paragraphsWithTitle.forEach((paragraph) => {
  if (!uniqueTitles.has(paragraph.title)) {
    uniqueTitles.add(paragraph.title);
    subjects.push({
      'name': paragraph.title,
      'code': paragraph.textContent.trim(),
      'department': getSubjectDepartment(paragraph.textContent.trim())
    });
  }
});

function getSubjectDepartment(subjectCode) {
  if(subjectCode.includes('ITWT')) {
    return 'قسم الإنترنت'
  } else if(subjectCode.includes('ITSE')) {
    return 'قسم هندسة البرمجيات'
  } else if(subjectCode.includes('ITNT')) {
    return 'قسم الشبكات'
  } else if(subjectCode.includes('ITMC')) {
    return 'قسم الحوسبة'
  } else {
    return 'القسم العام'
  }
}