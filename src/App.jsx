import { useState } from 'react';
import ProjectSidebar from './components/ProjectSidebar.jsx';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
    const [projectSelected, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    // Handle Init Project
    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    }

    // Handle Add New Project
    function handleAddProject(projectData) {
        setProjectsState((prevState) => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId,
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            };
        });
    }

    // Handle user click cancel
    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
    }

    // Handle user selected project
    function handleSelectedProject(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
    }

    // Handle user delete
    function handleDeletedProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                projects: prevState.projects.filter(
                    (project) =>
                        project.id !== projectSelected.selectedProjectId
                ),
                selectedProjectId: undefined,
            };
        });
    }

    // Handle add task in project
    function handleAddTask(dataTask) {
        setProjectsState((prevState) => {
            const taskId = Math.random();
            const newTask = {
                text: dataTask,
                id: taskId,
                projectId: prevState.selectedProjectId,
            };
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks],
            };
        });
    }

    function handleClearTask(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id),
            };
        });
    }

    const selectedProject = projectSelected.projects.find(
        (project) => project.id === projectSelected.selectedProjectId
    );
    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeletedProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleClearTask}
            tasks={projectSelected.tasks}
        />
    );

    console.log(projectSelected);
    if (projectSelected.selectedProjectId === null) {
        content = (
            <NewProject
                onAdd={handleAddProject}
                onCancel={handleCancelAddProject}
            />
        );
    } else if (projectSelected.selectedProjectId === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }

    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectSelected.projects}
                onSelectedProject={handleSelectedProject}
            />
            {content}
        </main>
    );
}

export default App;
