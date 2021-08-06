import { useState, useEffect } from "react";
import ListItem from "./todoListItem";

let taskData = JSON.parse(localStorage.getItem("taskData")) || [];
const App = (props) => {
    const [tasks, setTasks] = useState(taskData);
    const makeId = () => {
        let abc = "abcdefghijklmnopqrstuvwxyz";
        let id = "";
        while (tasks.map((e) => e.id).includes(id) || id === "") {
            for (let i = 0; i < 5; i++) {
                id += abc[Math.floor(Math.random() * 26)];
            }
        }

        return id;
    };
    const toggleTheme = () => {
        let currentTheme = document.body.classList[0];
        if (currentTheme === "darkTheme")
            document.body.classList.replace("darkTheme", "lightTheme");
        if (currentTheme === "lightTheme")
            document.body.classList.replace("lightTheme", "darkTheme");
    };
    const dltTask = (id) => {
        let parent = document.querySelector("#" + id + "").parentElement
            .parentElement;
        if (parent.nodeName === "LI") {
            setTasks(tasks.filter((e) => e.id !== id));
        }
    };
    const handleNewData = (e, id) => {
        if ((e?.type === "keyup" && e?.key === "Enter") || e?.type === "blur") {
            e.preventDefault();
            if (e.target.value === "") return;
            setTasks([
                ...tasks,
                { id: makeId(), content: e.target.value, state: false },
            ]);
            e.target.value = "";
        }
    };
    const changeTaskType = (e) => {
        let id = e.target.id;
        let state = e.target.checked;
        tasks.find((e) => e.id === id).state = state;
        setTasks([...tasks]);
    };
    useEffect(() => {
        localStorage.setItem("taskData", JSON.stringify(tasks));
    });
    const clearCompleted = () => {
        setTasks([...tasks.filter((e) => !e.state)]);
    };
    const showBy = (type) => {
        switch (type) {
            case "active":
                document
                    .querySelectorAll(
                        "#root > div > div.TODOList > div > div > button"
                    )
                    .forEach((e) => {
                        if (e.classList.contains("activeBtn"))
                            e.classList.remove("activeBtn");
                    });
                document
                    .querySelector(
                        "#root > div > div.TODOList > div > div > button:nth-child(2)"
                    )
                    .classList.add("activeBtn");
                document
                    .querySelectorAll(
                        "#root > div > div.TODOList > ul li >div> input"
                    )
                    .forEach((i) => {
                        i.parentElement.parentElement.style.display = "block";

                        if (i.checked) {
                            i.parentElement.parentElement.style.display =
                                "none";
                        }
                    });
                break;
            case "completed":
                document
                    .querySelectorAll(
                        "#root > div > div.TODOList > div > div > button"
                    )
                    .forEach((e) => {
                        if (e.classList.contains("activeBtn"))
                            e.classList.remove("activeBtn");
                    });
                document
                    .querySelector(
                        "#root > div > div.TODOList > div > div > button:nth-child(3)"
                    )
                    .classList.add("activeBtn");
                document
                    .querySelectorAll(
                        "#root > div > div.TODOList > ul li >div> input"
                    )
                    .forEach((i) => {
                        i.parentElement.parentElement.style.display = "block";

                        if (!i.checked) {
                            i.parentElement.parentElement.style.display =
                                "none";
                        }
                    });
                break;

            case "all":
                document
                    .querySelectorAll(
                        "#root > div > div.TODOList > div > div > button"
                    )
                    .forEach((e) => {
                        if (e.classList.contains("activeBtn"))
                            e.classList.remove("activeBtn");
                    });
                document
                    .querySelector(
                        "#root > div > div.TODOList > div > div > button:nth-child(1)"
                    )
                    .classList.add("activeBtn");
                document
                    .querySelectorAll(
                        "#root > div > div.TODOList > ul li >div> input"
                    )
                    .forEach((i) => {
                        i.parentElement.parentElement.style.display = "block";
                    });
                break;

            default:
                document.querySelectorAll(
                    "#root > div > div.TODOList > ul li"
                ).style.display = "block";
                break;
        }
    };
    return (
        <div className="app">
            <div className="topBar">
                <h1 className="appName">TODO</h1>
                <button className="themeBtn" onClick={toggleTheme}></button>
            </div>
            <div className="newTODO">
                {(() => {
                    let id = makeId();
                    return (
                        <ListItem
                            handleNewData={handleNewData}
                            checkBoxId={id}
                            isChecked={false}
                            listItemText="Type new task"
                            type={"input"}
                        />
                    );
                })()}
            </div>
            <div className="TODOList">
                <ul>
                    {tasks.map((data) => {
                        return (
                            <li key={data.id}>
                                <ListItem
                                    key={data.id}
                                    dltTask={dltTask}
                                    changeTaskType={changeTaskType}
                                    checkBoxId={data.id}
                                    isChecked={data.state}
                                    listItemText={data.content}
                                    type={"display"}
                                />
                            </li>
                        );
                    })}
                </ul>
                <div className="listInfo">
                    <span className="itemLength">
                        {tasks.length} items left
                    </span>
                    <div className="filterItems">
                        <button
                            className="activeBtn"
                            onClick={() => showBy("all")}
                        >
                            All
                        </button>
                        <button onClick={() => showBy("active")}>Active</button>
                        <button onClick={() => showBy("completed")}>
                            Completed
                        </button>
                    </div>
                    <button className="clearComplete" onClick={clearCompleted}>
                        Clear Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
