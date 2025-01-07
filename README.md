# TO-DO LIST
## Description
This is a backend project for managing a to-do list. Built with **Node.js**, **Express**, and **MongoDB** to provide a RESTful API for creating, updating, deleting, and retrieving tasks.

## Table of contents:
- [Technologies](#technologies)
- [Project installation](#project-installation)
- [Setup](#setup)
- [Features](#features)

## Technologies
- node.js v21.6.2
- Docker 21.1.1

## Project installation
The installation takes place within the system console.
1. Create a new project folder.
2. Clone repository: ```git clone https://github.com/wl-lew/to-do.git```
3. Install dependencies: ```npm install```

## Setup
- Before you begin, download Docker from www.docker.com.
### Environment variables
- To add environment variables create a ```.env``` file.
- Examples of the environment variables used can be found in the ```.env.example``` file.
- Correctly setting these variables is necessary for the app and database to function properly.
### Docker
- To start server and database, type the command ```docker-compose up``` in the terminal.

## Features
- To use the backend feature, you need to have Postman installed from www.postman.com.
### Create task
1. In Postman, find the box with the phrase: ***Enter URL or paste text***.
2. Paste the link: ```http://localhost:<your_server_port_number>/task/create```.
3. Select **POST** method.
4. Under the box select ***Body*** and check the ***raw*** option. From the dropdown list select ***JSON***.
5. Below in the window you can paste this sample data:
```json
{
    "title": "Example task",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "status": "pending"
}
```
After pressing the **Send** button you should see:
```json
{
"title": "Example task",
"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
"status": "pending",
"_id": "number_of_task_id",
"createdAt": "date_and_time_of_creation",
"__v": 0
}
```

### Show all tasks
1. Find the box with phrase: ***Enter URL or paste text*** and paste: ```http://localhost:<your_server_port_number>/task/show-all```.
2. Select **GET** method.
3. After pressing the **Send** button you should see:
```json
{
    "totalTasks": 1,
    "currentPage": 1,
    "totalPages": 1,
    "tasks": [
        {
            "_id": "number_of_task_id",
            "title": "Example task",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "status": "pending",
            "createdAt": "date_and_time_of_creation",
            "__v": 0
        }
    ]
}
```

### Show tasks with a given status
- Tasks have two statuses: **pending** and **completed**.
1. Find the box with phrase: ***Enter URL or paste text*** and paste: ```http://localhost:<your_server_port_number>/task/show-all?status=pending```.
2. Select **GET** method.
3. After pressing the **Send** button you should see tasks only with a pending status.
4. You can do the same for **completed** status.

### Tasks pagination
- The API supports pagination, allowing you to control the results with two parameters: ```page``` specifies the page number, and ```limit``` defines the number of tasks returned per page — making it easy to manage large data sets.
1. Find the box with phrase: ***Enter URL or paste text*** and paste: ```http://localhost:<your_server_port_number>/task/show-all?page=<page_number>&limit=<tasks_limit>```.
2. Select **GET** method.
3. After pressing the **Send** button you should see the tasks from a given page.

### Show task with a given ID
1. Find the box with phrase: ***Enter URL or paste text*** and paste: ```http://localhost:<your_server_port_number>/task/show/<number_of_task_id>```.
2. Select **GET** method.
3. After pressing the **Send** button you should see the tasks with a given ID.

### Task update
1. Find the box with phrase: ***Enter URL or paste text*** and paste: ```http://localhost:<your_server_port_number>/task/update/<number_of_task_id>```.
2. Select **PUT** method.
3. Under the box select ***Body*** and check the ***raw*** option. From the dropdown list select ***JSON***.
4. Below in the window you can paste this sample data:
```json
{
  "title": "Update Task",
  "description": "New description",
  "status": "completed"
}
```
After pressing the **Send** button you should see:
```json
{
  "_id": "number_of_task_id",
  "title": "Update Task",
  "description": "New description",
  "status": "completed",
  "createdAt": "date_and_time_of_creation",
  "__v": 0
}
```

### Task delete
1. Find the box with phrase: ***Enter URL or paste text*** and paste: ```http://localhost:<your_server_port_number>/task/delete/<number_of_task_id>```.
2. Select **DELETE** method.
3. After pressing the **Send** button you should see:
```json
{
    "message": "Task deleted successfully!",
    "task": {
        "_id": "number_of_task_id",
        "title": "Deleted Task",
        "description": "New description",
        "status": "completed",
        "createdAt": "date_and_time_of_creation",
        "__v": 0
    }
}
```

### All tasks delete
1. Find the box with phrase: ***Enter URL or paste text*** and paste: ```http://localhost:<your_server_port_number>/task/delete-all```.
2. Select **DELETE** method.
3. After pressing the **Send** button you should see:
```json
{
  "message": "All tasks have been deleted!",
  "deletedCount": "<number_of_deleted_tasks>"
}
```