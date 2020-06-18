var listToDo = [];
var listComplete = [];
document.querySelector("#addItem").onclick = function() {
    var toDo = new ToDo;
    toDo.job = document.querySelector('#newTask').value.trim();
    //check du lieu dau vao
    var validate = new Validation();
    var valid = true;
    valid = validate.emptyCheck(toDo.job);
    if (!valid) {
        return;
    }
    listToDo.push(toDo);
    taoBangTask();
    luuLocalStorage();
    location.reload();
}

function taoBangTask() {
    var contentTable = '';
    for (var index = 0; index < listToDo.length; index++) {
        var obToDo = listToDo[index];
        obToDo.index = index;
        contentTable += `
        <li>
            <span>${obToDo.job}</span>
            <div><i onclick="xoaTask('${obToDo.index}')" id="btnDelete" class="fa fa-trash-alt btn"></i>
            <i onclick="completeTask('${obToDo.index}')" id="btnComplete" class="fa fa-check-circle btn"></i></div>
        </li>
        `
    }
    document.querySelector("#todo").innerHTML = contentTable;
}

var taoBangComplete = function() {
    var contentTable = '';
    for (var index = 0; index < listComplete.length; index++) {
        var obComplete = listComplete[index];
        obComplete.index = index;
        contentTable += `
        <li>
            <span style="color: green;">${obComplete.job}</span>
            <div>
                <i onclick="xoaComplete('${obComplete.index}')" class="fa fa-trash-alt btn"></i>
                <i style="color: green;" onclick="unCompleteTask('${obComplete.index}')" class="fa fa-check-circle btn"></i>
            </div>
        </li>
        `
    }
    document.querySelector('#completed').innerHTML = contentTable;
}

var luuLocalStorage = function() {
    var sListToDo = JSON.stringify(listToDo);
    localStorage.setItem('To Do List: ', sListToDo)
}

var layLocalStorage = function() {
    if (localStorage.getItem("To Do List: ")) {
        var sListToDo = localStorage.getItem("To Do List: ");
        listToDo = JSON.parse(sListToDo);
        taoBangTask();
    }
};

layLocalStorage();

var xoaTask = function(INDEX) {
    for (var index = listToDo.length - 1; index >= 0; index--) {
        var toDo = listToDo[index];
        toDo.index = index;
        if (INDEX == toDo.index) {
            listToDo.splice(index, 1);
        }
    }
    taoBangTask();
}

var completeTask = function(INDEX) {
    for (var index = listToDo.length - 1; index >= 0; index--) {
        var complete = listToDo[index];
        complete.index = index;
        if (INDEX == complete.index) {
            listComplete.push(complete);
            listToDo.splice(index, 1);
        }
    }
    taoBangTask();
    taoBangComplete();
}

var xoaComplete = function(INDEX) {
    for (var index = listComplete.length - 1; index >= 0; index--) {
        var complete = listComplete[index];
        complete.index = index;
        if (INDEX == complete.index) {
            listComplete.splice(index, 1);
        }
    }
    taoBangComplete();

}

var unCompleteTask = function(INDEX) {
    for (var index = listComplete.length - 1; index >= 0; index--) {
        var complete = listComplete[index];
        complete.index = index;
        if (INDEX == complete.index) {
            listComplete.splice(index, 1);
            listToDo.push(complete);
        }
    }
    taoBangTask();
    taoBangComplete();
}


//sort completed task
document.querySelector('#one').onclick = function() {
    var contentTable = '';
    for (var index = 0; index < listComplete.length; index++) {
        var obComplete = listComplete[index];
        obComplete.index = index;
        contentTable += `
        <li>
            <span style="color: green;">${obComplete.job}</span>
            <div>
                <i onclick="xoaComplete('${obComplete.index}')" class="fa fa-trash-alt btn"></i>
                <i style="color: green;" onclick="unCompleteTask('${obComplete.index}')" class="fa fa-check-circle btn"></i>
            </div>
        </li>
        `
    }
    document.querySelector('#todo').innerHTML = contentTable;
    document.querySelector('#completed').style.visibility = "hidden";
}

//sort unComplete task
document.querySelector('#all').onclick = function() {
    document.querySelector('#completed').style.visibility = "visible";
    taoBangComplete();
    taoBangTask();
}

//sort A->Z
document.querySelector('#two').onclick = function() {
    listToDo.sort(compareASC);
    listComplete.sort(compareASC);
    taoBangTask();
    taoBangComplete();
}

//sort Z->A
document.querySelector('#three').onclick = function() {
    listToDo.sort(compareDESC);
    listComplete.sort(compareDESC);
    taoBangTask();
    taoBangComplete();
}

//tao ham so sanh tang dan va giam dan  
var compareASC = function(a, b) {
    if (a.job > b.job) {
        return 1;
    } else if (a.job < b.job) {
        return -1;
    } else {
        return 0;
    }
}
var compareDESC = function(a, b) {
    if (a.job > b.job) {
        return -1;
    } else if (a.job < b.job) {
        return 1;
    } else {
        return 0;
    }
}