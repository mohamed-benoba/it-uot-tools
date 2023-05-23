export function addSubject(subject) {

}

export function removeSubject(subject) {
  removeAllSubjectsFromHTML();
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