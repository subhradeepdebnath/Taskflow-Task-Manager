function addTask(){
            //take input
            let taskInput = document.getElementById("taskInput");
            let taskValue = taskInput.value.trim();
            //it prevents the empty text
            if (taskValue == ""){
                alert("Please enter a text");
                return;
            }
            //create new li element
            let li = document.createElement("li");
            //delete button
            let deleteBtn = document.createElement("button");
              //edit button
            let editBtn = document.createElement("button");
            deleteBtn.className = "deleteBtn";
            editBtn.className = "editBtn";
            //add the text to li  
            let now = new Date();
            let dateTime = now.toLocaleString();
            //add text to delete button
            deleteBtn.innerText="Delete";
            //edit button text
            editBtn.innerText = "Edit";
            //complete btn checkbox
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            //complete function
            checkbox.onclick = function(){
                if(checkbox.checked){
                    li.style.textDecoration="line-through";
                    li.style.color="gray";
                    li.setAttribute("data-completed","true");
                }
                else{
                    li.style.textDecoration="none";
                    li.style.color="black";
                    li.setAttribute("data-completed","false");
                }
                saveData();
                updateCompletedCount();
                updatePendingCount();
            }
            //delete function
            deleteBtn.onclick = function(){
                li.remove();
                saveData();
                updateTaskCount();
                updateCompletedCount();
                updatePendingCount();
            }
            //edit function
            editBtn.onclick = function(){
            let span = li.querySelector("span");
            let oldText = span.innerText;
            let oldTimestamp = oldText.substring(oldText.indexOf("("));
            let currentTask = oldText.replace(oldTimestamp, "").trim();
            let newTask = prompt("Edit your task:", currentTask);
            if(newTask !== null && newTask.trim() !== ""){
                span.innerText = newTask + " " + oldTimestamp;
                saveData();
            }
        }
            //add delete button to li
            let span= document.createElement("span");
            span.innerText = taskValue + "(" + dateTime + ")" ;
            li.appendChild(span);
            li.appendChild(checkbox);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            //add li to ul
            document.getElementById("taskList").appendChild(li);
            //clear input box
            taskInput.value = "";
            //save data after refreshing the page
            saveData();
            updateTaskCount();
            updateCompletedCount();
            updatePendingCount();
        }
        function saveData(){
            localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
        }
        function showData(){
            document.getElementById("taskList").innerHTML = localStorage.getItem("tasks")
            let listItems = document.querySelectorAll("#taskList li");

            listItems.forEach(function(li){
                let span = li.querySelector("span");
                let checkbox = li.querySelector("input[type='checkbox']");
                let editBtn = li.querySelector(".editBtn");
                let deleteBtn = li.querySelector(".deleteBtn");
                if(deleteBtn){
                    deleteBtn.onclick = function(){
                        li.remove();
                        saveData();
                        updateTaskCount();
                        updateCompletedCount();
                        updatePendingCount();
                    }
                }
                if(checkbox){
                    if(li.getAttribute("data-completed")==="true"){
                        checkbox.checked = true;
                        li.style.textDecoration="line-through";
                        li.style.color="gray";
                    }
                    checkbox.onclick = function(){
                if(checkbox.checked){
                    li.style.textDecoration="line-through";
                    li.style.color="gray";
                    li.setAttribute("data-completed","true");
                }
                else{
                    li.style.textDecoration="none";
                    li.style.color="black";
                    li.setAttribute("data-completed","false");
                }
                saveData();
                updateCompletedCount();
                updatePendingCount();
            }
                }
            if(editBtn){
                editBtn.onclick = function(){
                let oldText = li.firstChild.textContent;
                let oldTimestamp = oldText.substring(oldText.indexOf("("));
                let currentTask = oldText.replace(oldTimestamp, "").trim();
                let newTask = prompt("Edit your task:", currentTask);
                if(newTask && newTask.trim() !== ""){
                    span.innerText = newTask + " " + oldTimestamp;
                    saveData();
                }
            }
        }
            });
            updateTaskCount();
            updateCompletedCount();
            updatePendingCount();
        }
        showData();
        updateTaskCount();
        document.getElementById("taskInput").addEventListener("keypress", function(event){
            if(event.key === "Enter"){
                addTask();
            }
        });
        function updateTaskCount(){
            let totalTasks = document.querySelectorAll("#taskList li").length;
            document.getElementById("taskCount").innerText = "Total Tasks: "+ totalTasks;
        }
        function clearAllTasks(){
            document.getElementById("taskList").innerHTML = "";
            localStorage.removeItem("tasks");
            updateTaskCount();
            updateCompletedCount();
            updatePendingCount();
        }
        function updateCompletedCount(){
            let completed = 0;
            let listItems= document.querySelectorAll("#taskList li");
            listItems.forEach(function(li){
                if(li.style.textDecoration=== "line-through"){
                    completed++;
                }
            });
            document.getElementById("completedCount").innerText = "completed Tasks: " + completed;
            
        }
        function updatePendingCount(){
    let total = document.querySelectorAll("#taskList li").length;
    let completed = 0;
    document.querySelectorAll("#taskList li").forEach(function(li){
        if(li.style.textDecoration=== "line-through"){
            completed++;
        }
    });
    let pending = total - completed;
    document.getElementById("pendingCount").innerText="Pending Tasks: "+ pending;
}