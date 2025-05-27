let tasks=[];
const addTask=()=>{
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim()

    if(text){
        tasks.push({text:text,completed: false});
        taskInput.value="";
        updateTaskList();
    }
    const updateTaskList=()=>{
        const taskList=document.getElementById('task-list')
        taskList.innerHTML=``

        tasks.forEach(task=>{
            const listItem=document.createElement('li')
            listItem.innerHTML=`
            <div class="taskItem">
                <div class="task">
                    <input type="checkbox" class="checkbox"></input>
                    <p>Finish this project</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png"></img>
                    <img src="./img/bin.png"></img>
                </div>
            </div>
            `;
        });
    };

    console.log(tasks);
};
document.getElementById('NewTask').addEventListener('click', function(e){
    e.preventDefault();
    addTask();
});