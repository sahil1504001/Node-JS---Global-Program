# Node-JS---Global-Program

HOME TASK 5 - Logging and error handling
To load postman API calls please use one of below
1) https://www.getpostman.com/collections/db2a8bc74dc5b1eaa53e
2) Use this file 'src/HT-3/GMP - Task 4.postman_collection.json' and do import in postman
3) do: npm run hometask5

HOME TASK 4

To load postman API calls please use one of below
1) https://www.getpostman.com/collections/db2a8bc74dc5b1eaa53e
2) Use this file 'src/HT-3/GMP - Task 4.postman_collection.json' and do import in postman
3) do: npm run hometask4

Following are the exposed API's : -

```
1) CREATE USER
method: POST
url: http://localhost:3000/users
body: 
{
    "login": "SahilShikalgarGroupTest1",
    "password": "01x0qqzsp6rz",
    "age": 22
}

2) GET USERS ALL
method: GET
url: http://localhost:3000/users/

3) GET USER BY ID
method: GET
url: http://localhost:3000/users/<id>

4) GET USERS - getAutoSuggestUsers
method: GET
url: http://localhost:3000/users/suggest?search=<query>&limit=<number>
example: http://localhost:3000/users/suggest?search=Alexandre&limit=2

5) UPDATE USER
method: PUT
url: http://localhost:3000/users/<id>
example: http://localhost:3000/users/c1e598fa-0767-4fc4-bd02-120b6c336792
body:
{
    "login": "AlexDoe",
    "password": "123555678",
    "age": 22
}

6) DELETE USER
method: DELETE
url: http://localhost:3000/users/delete/<id>
example: http://localhost:3000/users/delete/52956faa-81bc-4cd9-b2ae-7dc97b6dbff1

7) SOFT DELETE USER
method: DELETE
url: http://localhost:3000/users/<id>
example: http://localhost:3000/users/e02b4177-98a3-4fe7-878a-71077d7462fb

8) CREATE GROUP
method: POST
url: http://localhost:3000/groups/
body:
{
    "name": "GroupTesting",
    "permissions": ["READ"]
}

9) GET GROUP BY ID
method: GET
url: http://localhost:3000/groups/<id>
example: http://localhost:3000/groups/8b07da0c-de2d-4cdb-bab8-95075a784a55

10) GET GROUPS ALL
method: GGET
url: http://localhost:3000/groups/

11) UPDATE GROUP
method: PUT
url: http://localhost:3000/groups/<id>
example: http://localhost:3000/groups/923caa45-87e4-4573-833b-d06e04f9cdab
body:
{
    "name": "DummyNameUpdated",
    "permissions": ["READ", "WRITE", "SHARE"]
}

12) DELETE GROUP
method: DELETE
url: http://localhost:3000/groups/<id>
example: http://localhost:3000/groups/255ae725-eda7-4f9c-a59c-d8ef5b319948

13) ADD USERS TO GROUP
method: POST
url: http://localhost:3000/userGroup/addUsersToGroup
body:
{
    "groupId": "64ccc77e-4176-4acc-b338-c0805e079d4b",
    "userIds": ["52956faa-81bc-4cd9-b2ae-7dc97b6dbff1", "ff6ca395-271d-4ba8-ba11-958492a8a181"]
}

14) User Group Mappings - DEV PURPOSE ONLY
method: GET
url: http://localhost:3000/userGroup/
```


HOME TASK 3

To load postman API calls please use one of below
1) https://www.getpostman.com/collections/c391a7ce5f8cf58e5928
2) Use this file src/HT-3/GMP - Task 3.postman_collection.json and do import in postman

HOMEWORK 1
BASICS. NODEJS FUNDAMENTAL THEORY
PREREQUISITES:
1. Install the latest LTS (Long Term Support) version of Node.js (https://nodejs.org/en/), by any 
available means (.exe, nvm, brew, etc.).
2. Check in the console (terminal) that the Node.js installation was done properly by running the 
following commands node -v or node -version.
3. Create a repo for your homework tasks on Github (https://github.com/) or git.epam.com.
4. Provide your mentor with the link to the repo and add read access permissions.
5. Create package.json by running the following commands npm init or npm init -y.
6. Install globally or locally npm package nodemon (https://github.com/remy/nodemon) to dev 
dependency.
7. Get ready to watch the lectures and do the homework tasks to study the basic principles and 
approaches of development server-side applications with Node.js.
TASK 1.1
Write a program which reads a string from the standard input stdin, reverses it and then writes it to 
the standard output stdout.
• The program should be started from npm script via nodemon (i.e. npm run task1).
• The program should be running in a stand-by mode and should not be terminated after the 
first-string processing.
• For example:
TASK 1.2
Write a program which should do the following:
• Read the content of csv file from ./csv directory. Example: https://epa.ms/nodejs19-hw1-ex1
• Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to convert csv file to 
json object.• Write the csv file content to a new txt file.
Use the following format: https://epa.ms/nodejs19-hw1-ex2.
• Do not load all the content of the csv file into RAM via stream (read/write file content line by 
line).
• In case of read/write errors, log them in the console.
• The program should be started via npm script using nodemon (i.e. npm run task2).
TASK 1.3
Rewrite the above-mentioned programs to use babel (https://babeljs.io/) and ES6 modules.
EVALUATION CRITERIA
2. Task 1.1 is fulfilled to the full extent.
3. Task 1.2 is fulfilled to the full extent; the file is loaded fully into the RAM.
4. Task 1.2 is fulfilled to the full extent; the file is not loaded fully in the RAM (pipeline method 
https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback).
5. All the tasks are fulfilled to the full extent (Task 1.1, Task 1.2, Task 1.3)