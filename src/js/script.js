const searchInput = document.querySelector('#search')
const btnSearch = document.querySelector('#button-search')
const resultExercise = document.querySelector('#result-exercise')

const getDataExercise = async (exercise) => {
    const getData = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${exercise}`,
        {
            headers: { "X-Api-Key": "JMzIQhek12lW8lKm7mgTHg==EQzSG4btkfjhTpWj" }
        }
    )
    const dataExercises = await getData.json()
    getExercise(dataExercises)
}

const getExercise= async (dataExerciseJson)=> {
    const dataExercise = await dataExerciseJson
    dataExercise.forEach(exercise=> {
        createExerciseElement(exercise.muscle, exercise.name, exercise.instructions )
    });
    
}
const createExerciseElement = (subtitle, title, description)=>{
    const exerciseBox = document.createElement('div')
    exerciseBox.classList.add('exercise-card')
    const subtitleBox = document.createElement('p')
    subtitleBox.classList.add('subtitle')
    subtitleBox.textContent = subtitle
    exerciseBox.appendChild(subtitleBox)

    const titleBox = document.createElement('h3')
    titleBox.textContent = title
    exerciseBox.appendChild(titleBox)

    const descriptionBox = document.createElement('p')
    descriptionBox.classList.add('description')
    descriptionBox.textContent = description
    exerciseBox.appendChild(descriptionBox)
    
    resultExercise.appendChild(exerciseBox)
}
btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    const value = searchInput.value
    getDataExercise(value)

})