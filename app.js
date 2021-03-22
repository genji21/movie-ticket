var courseAPI = "http://localhost:3000/course";
function start(){
// fetch(courseAPI)
getCoures();
}
start();


// functions
function getCoures(){
    fetch(courseAPI)
    .then(function(respon) {
        return respon.json();
    })
    .then(function(data) {
        renderCourse(data)
        console.log(data)
    }) 
}
// renderCourse
function renderCourse(course){
    var listCourseBlock = document.querySelector("#list-courses");
    var div = document.getElementsByTagName('div')[0];
    var htmls =course.map(function(course){
        return `<li>
                    <h4>${course.name}</h4>
                    <p>${course.descriotion}</p>
                </li>
        `
        
    })

    // console.log(htmls.concat(''))
    // div.innerHTML = htmls
    // console.log(htmls)
    listCourseBlock.innerHTML = htmls.join('');
   
}