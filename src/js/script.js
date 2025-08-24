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

const translateExercise = async (instructions, name, subtitle) => {
    try {
        const dataTranslate = await fetch('http://localhost:5000/translate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: instructions,
                source: 'en',
                target: "pt-BR",
                format: "text",
            }),

        })
        const exerciseTranslate = await dataTranslate.json();
        getTranslateData(exerciseTranslate, name, subtitle)

    }
    catch (error) {
        console.error('Erro na tradução')
    }
}
const getExercise = async (dataExerciseJson) => {
    const dataExercise = await dataExerciseJson
    dataExercise.forEach(exercise => {
        translateExercise(exercise.instructions, exercise.name, exercise.muscle)
        // createExerciseElement(exercise.muscle, exercise.name, exercise.instructions )
    });

}
const getTranslateData = async (instructionsTranslate, name, subtitle)=> {
    const translateInstruction = await instructionsTranslate
     createExerciseElement(subtitle, name, translateInstruction.translatedText)
    
}
const createExerciseElement = (subtitle, title, instruction) => {
    const exerciseBox = document.createElement('div')
    exerciseBox.classList.add('exercise-card')
    const subtitleBox = document.createElement('p')
    subtitleBox.classList.add('subtitle')
    subtitleBox.textContent = subtitle
    exerciseBox.appendChild(subtitleBox)

    const titleBox = document.createElement('h3')
    titleBox.textContent = title
    exerciseBox.appendChild(titleBox)

    const instructionBox = document.createElement('p')
    instructionBox.classList.add('instruction')
    instructionBox.textContent = instruction
    exerciseBox.appendChild(instructionBox)

    resultExercise.appendChild(exerciseBox)
}
btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    const value = searchInput.value
    getDataExercise(value)

})