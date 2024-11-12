let tasks = [
    {
        "title": "قراءة كتاب",
        "date": "11/11/2024",
        "isDone": false,
    },
    {
        "title": "دراسة رياكت",
        "date": "12/11/2024",
        "isDone": true,
    },
    {
        "title": "تعلم جافا سكربت",
        "date": "13/11/2024",
        "isDone": false,
    },
    {
        "title": "حل التحدي",
        "date": "12/11/2024",
        "isDone": false,
    },
]


tasks = JSON.parse(localStorage.getItem("tasks"))
if (!tasks) {
    tasks = []
}

const fillTasksOnThePage = () => {
    document.getElementById("tasks").innerHTML = "";

    let i = 0;
    for (task of tasks){
        let content = `
        <div class="task ${task.isDone ? 'done': ''}">
            <div class="info">
                <h2>${task.title}</h2>

                <div>
                    <span class="material-symbols-outlined">
                        event
                    </span>
                    <span>${task.date}</span>
                </div>
            </div>
            <div class="actions">
                <button onClick="deleteTask(${i})" class="circular" style="background-color: rgb(205, 10, 42); color: white;">
                    <span class="material-symbols-outlined">
                        delete
                    </span>

                ${task.isDone ? 
                    `
                    <button onClick="undoCheck(${i})" class="circular" style="background-color: rgb(0, 101, 50); color: white;">
                        <span class="material-symbols-outlined">
                            undo
                        </span>
                    </button>
                    `
                    : 
                    `
                    <button onClick="checkTask(${i})" class="circular" style="background-color: rgb(101, 206, 9); color: white;">
                        <span class="material-symbols-outlined">
                            check
                        </span>
                    </button>
                    `
                }
                <button onClick="editTask(${i})" class="circular" style="background-color: rgb(10, 104, 205); color: white;">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </div>
        </div>
            `
        document.getElementById("tasks").innerHTML += content 
        i ++;
    }
}

fillTasksOnThePage()

document.getElementById("add").addEventListener("click", ()=>{
    let now = new Date()
    let taskName = prompt("أدخل المهمة التالية: ")
    let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() 
    if (taskName){
        tasks.push ({
            "title": taskName,
            "date": date,
            "isDone": false,
        })
    }
    storeTasks()
    fillTasksOnThePage()
})

const deleteTask = (i) => {
    let task = tasks[i]
    if (confirm('هل أنت متأكد من حذف' + " " + task.title + "؟")) {
        tasks.splice(i, 1)
        storeTasks()
        fillTasksOnThePage()
    }
}

const editTask = (i) => {
    let task = tasks[i]
    let newTaskName = prompt("عدل المهمة: ", task.title)
    if(newTaskName) {
        let now = new Date()
        let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear()
        task.title = newTaskName
        task.date = date
        storeTasks()
        fillTasksOnThePage()
    }
}

const checkTask = (i) => {
    tasks[i].isDone = true
    storeTasks()
    fillTasksOnThePage()
}

const undoCheck = (i) => {
    tasks[i].isDone = false
    storeTasks()
    fillTasksOnThePage()
}


const storeTasks = () => {
    let stringTasks = JSON.stringify(tasks)
    localStorage.setItem("tasks", stringTasks)
}