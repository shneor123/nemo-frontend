
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'
// const boardChannel = new BroadcastChannel('boardChannel')
// const listeners = []

export const boardService = {
    save,
    query,
    getById,
    remove

}
window.cs = boardService;

const STORAGE_KEY = 'board'
const BOARD_BASE_ENDPOINT = 'board'


async function query() {
    const boardsFromDB = await httpService.get(BOARD_BASE_ENDPOINT)
    return boardsFromDB
}

async function getById(boardId) {
    const boardFromDB = await httpService.get(`${BOARD_BASE_ENDPOINT}/${boardId}`)
    return boardFromDB

}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}
async function save(board) {
    if (board._id) {
        const savedBoard = await httpService.put(BOARD_BASE_ENDPOINT, board)
        socketService.emit('board-change', savedBoard);
        return savedBoard
    } else {
        try {
            const savedBoard = await httpService.post(BOARD_BASE_ENDPOINT, board)
            return savedBoard
        } catch (err) {
            console.log(err)
        }
    }
}



const ourBoard = {
    "_id": utilService.makeId(),//mongoID
    "title": "Nemo Demo",
    "isStar": false,
    "archivedAt": null,
    "createdAt": utilService.makeId(),

    "createdBy": {
        "_id": utilService.makeId(),// mongoID
        "fullname": "Yonatan ben zeev",
        "imgUrl": "http://some-img"
    },
    "style": {
        // if the user chose an image, takes color from the api and sets it as appheader bgc
        // if only bgc picked sets it as the board bgc and darkens it for the appheader
        // will use actual css selectors and will be placed in the css props
        // "backgroundImage": url('https://unsplash.it/800/800'),
        "backgroundColor": "#026aa7",
        "background": 'url(https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)',
    },
    "labels": [
        // first 6 labels will start without title
        {
            "id": utilService.makeId(),// localID
            "color": "#61bd4f"
        },
        {
            "id": utilService.makeId(), // localID
            "color": "#f2d600"
        },
        {
            "id": utilService.makeId(),// localID
            "color": "#ff9f1a",
            "title": 'hello world'
        },
        {
            "id": utilService.makeId(),// localID
            "color": "#eb5a46"
        }, {
            "id": utilService.makeId(),// localID
            "color": "#c377e0"
        }, {
            "id": utilService.makeId(),// localID
            "color": "#0079bf"
        }
    ],
    "members": [
        {
            "_id": utilService.makeId(), // mongoID
            "username": 'omritheking',// username needs to be added 
            "fullname": "omri luz",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": utilService.makeId(), //mongoID
            "username": 'yonatanbz6',
            "fullname": "yonatan ben zeev",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": utilService.makeId(), // mongoDB
            "fullname": "shneor rabinovitz",
            "username": 'shnrab123',
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": utilService.makeId(), // mongoDB
            "fullname": "Daniel Shaked",
            "username": '@danielshaked',
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [
        // Backlog-Server
        {
            "id": utilService.makeId(), // localID
            "title": " Backlog-Server",
            "tasks": [
                // Backlog-Server
                {
                    "id": utilService.makeId(), // localID
                    "title": "Create a server white expres",
                    // "description": 'Add a more...',
                    // "createdAt": Date.now(),????
                    "labelIds": ["l101", "l102", "l103"],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": null,
                            "title": null,
                        }
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "attachments": [
                        {
                            "id": utilService.makeId(),
                            "name": 'fireworks',
                            "url": 'https://i.picsum.photos/id/373/500/500.jpg?hmac=VqMSKR_Y5zUJm4IEBUjpK6NI7ZdiT7ePMwevp_MDgeQ',
                            "createdAt": Date.now(),
                        },
                    ],
                    "checklists": [
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 2",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 1",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "Add labels",
                                    "isDone": true
                                }
                            ]
                        },
                    ],
                    "members": [
                        {
                            "_id": utilService.makeId(), // mongoID
                            "username": 'omritheking',// username needs to be added 
                            "fullname": "omri luz",
                            "imgUrl": "https://www.google.com"
                        },
                        {
                            "_id": utilService.makeId(), //mongoID
                            "username": 'yonatanbz6',
                            "fullname": "yonatan ben zeev",
                            "imgUrl": "https://www.google.com"
                        },
                        {
                            "_id": utilService.makeId(), // mongoDB
                            "fullname": "shneor rabinovitz",
                            "username": 'shnrab123',
                            "imgUrl": "https://www.google.com"
                        },
                        {
                            "_id": utilService.makeId(), // mongoDB
                            "fullname": "Daniel Shaked",
                            "username": '@danielshaked',
                            "imgUrl": "https://www.google.com"
                        }
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
                //Socket implementation..                
                {
                    "id": utilService.makeId(),
                    "title": ' Socket implementation',
                    // "description": 'Socket implementation',
                    // "createdAt": Date.now(),
                    "labelIds": ['l101'],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": 'https://i.picsum.photos/id/715/800/800.jpg?hmac=XeSGp8UxCX2Ykz6XodkW-g14O6uAwx1iy3WfomlypPo',
                            "title": 'sunset',
                        },
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "attachments": [],
                    "checklists": [],
                    "members": [
                        {
                            "_id": 'u104',
                            "imgUrl": null,
                            "fullname": 'Shneor Rabinovitz',
                            "username": 'shneor123',
                        },
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
                // MongoDB

            ],
            "style": {} //could add a feature of group background color styling
        },
        // In Development
        {
            "id": utilService.makeId(), // localID
            "title": "In Development",
            "tasks": [
                {
                    // Conecting to PWA
                    "id": utilService.makeId(), // localID
                    "title": "Conecting to PWA",
                    // "description": 'Samthing...',
                    // "createdAt": Date.now(),?????
                    "labelIds": ['l104'],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": 'https://i.picsum.photos/id/715/800/800.jpg?hmac=XeSGp8UxCX2Ykz6XodkW-g14O6uAwx1iy3WfomlypPo',
                            "title": 'sunset',
                        },
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "attachments": [
                        {
                            "id": utilService.makeId(),
                            "name": 'fireworks',
                            "url": 'https://i.picsum.photos/id/565/500/500.jpg?hmac=1qOIgjuXGDfqpp6xKeP1ssJuRQwU8JcOcULnFGTaePU',
                            "createdAt": Date.now(),
                        },
                    ],
                    "checklists": [
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 2",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 1",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "Add labels",
                                    "isDone": true
                                }
                            ]
                        },
                    ],
                    "members": [
                        {
                            "_id": utilService.makeId(), // mongoID
                            "username": 'omritheking',// username needs to be added 
                            "fullname": "omri luz",
                            "imgUrl": "https://www.google.com",
                        },
                        {
                            "_id": utilService.makeId(), //mongoID
                            "username": 'yonatanbz6',
                            "fullname": "yonatan ben zeev",
                            "imgUrl": "https://www.google.com"
                        },
                        {
                            "_id": utilService.makeId(), // mongoDB
                            "fullname": "shneor rabinovitz",
                            "username": 'shnrab123',
                            "imgUrl": "https://www.google.com"
                        },
                        {
                            "_id": utilService.makeId(), // mongoDB
                            "fullname": "Daniel Shaked",
                            "username": '@danielshaked',
                            "imgUrl": "https://www.google.com"
                        }
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
                // Support DND
                {
                    "id": utilService.makeId(),
                    "title": 'Support Drag and Drop',
                    // "description": 'Support Drag and Drop',
                    // "createdAt": Date.now(),
                    "labelIds": ['l104'],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": null,
                            "title": null,
                        },
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "attachments": [
                        {
                            "id": utilService.makeId(),
                            "name": 'fireworks',
                            "url": 'https://i.picsum.photos/id/175/500/500.jpg?hmac=qefEKo1f_m-Dn5P7Pbj4ZyPVF9qHraqYbESqamlXVKI',
                            "createdAt": Date.now(),
                        },
                    ],
                    "checklists": [],
                    "comments": [
                        {
                            "byMember": {
                                "_id": utilService.makeId(), // mongoID
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },
                            "id": utilService.makeId(), // localID
                            "createdAt": Date.now(),
                            "txt": "also @yaronb please CR this",
                        },
                    ],
                    "members": [
                        {
                            "_id": utilService.makeId(), // mongoID
                            "username": 'omritheking',// username needs to be added 
                            "fullname": "omri luz",
                            "imgUrl": "https://www.google.com",
                        },
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
                {
                    "id": utilService.makeId(), // localID
                    "title": "Help me",
                    "status": "in-progress",// what is this necesarry for
                    "description": "description",
                    "comments": [
                        {
                            "id": utilService.makeId(), // localID
                            "txt": "also @yaronb please CR this",
                            "createdAt": utilService.makeId(),
                            "byMember": {
                                "_id": utilService.makeId(), // mongoID
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 2",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        },
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 4",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "attachments": [],
                    // if member ids are extracted from stateStore
                    "memberIds": ["u101"],
                    "labelIds": ["l101", "l102"],
                    "createdAt": Date.now(),
                    "dueDate": null,
                    "byMember": "u101",
                    "style": {
                        backgroundColor: "#26de81"// change to backgroundColor to apply inline style
                    }
                }
            ],
            "style": {} //could add a feature of group background color styling
        },
        // QA
        {
            "id": utilService.makeId(),
            "title": 'QA',
            "tasks": [
                {
                    "id": utilService.makeId(),
                    "title": 'Functional testing',
                    // "description": 'samthing..',
                    // "createdAt": Date.now(),
                    "labelIds": ['l101', 'l102'],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": null,
                            "title": null,
                        },
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": null
                    },
                    "attachments": [{ "id": utilService.makeId(), "url": 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80' }],
                    "checklists": [
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 2",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 1",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "Add labels",
                                    "isDone": true
                                }
                            ]
                        },
                    ],
                    "members": [
                        {
                            "_id": utilService.makeId(), // mongoID
                            "username": 'omritheking',// username needs to be added 
                            "fullname": "omri luz",
                            "imgUrl": "https://www.google.com"
                        },
                        {
                            "_id": utilService.makeId(), //mongoID
                            "username": 'yonatanbz6',
                            "fullname": "yonatan ben zeev",
                            "imgUrl": "https://www.google.com"
                        },
                        {
                            "_id": utilService.makeId(), // mongoDB
                            "fullname": "shneor rabinovitz",
                            "username": 'shnrab123',
                            "imgUrl": "https://www.google.com"
                        },
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
                // Change background img
                {
                    "id": utilService.makeId(),
                    "title": 'Change background img',
                    // "description": 'Change background image',
                    // "createdAt": Date.now(),
                    "labelIds": ['l101', 'l102'],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": null,
                            "title": null,
                        },
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": null
                    },
                    "attachments": [],
                    "checklists": [
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 2",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 1",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "Add labels",
                                    "isDone": true
                                }
                            ]
                        },
                    ],
                    "members": [
                        {
                            "_id": utilService.makeId(), // mongoID
                            "username": 'omritheking',// username needs to be added 
                            "fullname": "omri luz",
                            "imgUrl": null
                        },
                        {
                            "_id": utilService.makeId(), //mongoID
                            "username": 'yonatanbz6',
                            "fullname": "yonatan ben zeev",
                            "imgUrl": null
                        },
                        {
                            "_id": utilService.makeId(), // mongoDB
                            "fullname": "shneor rabinovitz",
                            "username": 'shnrab123',
                            "imgUrl": null
                        },
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
            ],
        },
        // Done

        //  Backlog-Cliant.
        {
            "id": utilService.makeId(),
            "title": 'Backlog-Cliant',
            "tasks": [
                //Login/Signup dynamic cmp..
                {
                    "id": utilService.makeId(),
                    "title": 'Login/Signup dynamic cmp',
                    // "description": 'Add Login/Signup dynamic cmp..',
                    // "createdAt": Date.now(),
                    "labelIds": ['l101', 'l102'],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": null,
                            "title": null,
                        },
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": null
                    },
                    "attachments": [],
                    "checklists": [
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 2",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "To Do 1",
                                    "isDone": false
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "Add labels",
                                    "isDone": true
                                }
                            ]
                        },
                    ],
                    "members": [
                        {
                            "_id": utilService.makeId(), //mongoID
                            "username": 'yonatanbz6',
                            "fullname": "yonatan ben zeev",
                            "imgUrl": null
                        },
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
                // Pages
                {
                    "id": utilService.makeId(),
                    "title": 'Add Pages',
                    // "description": 'Add Pages...',
                    // "createdAt": Date.now(),
                    "labelIds": ['l101', 'l102'],
                    "style": {
                        "backgroundColor": null,
                        "backgroundImage": {
                            "url": null,
                            "title": null,
                        },
                    },
                    "byMember": {
                        "_id": utilService.makeId(), // mongoID
                        "fullname": "Tal Tarablus",
                        "username": 'zinadin.bold@gmail.com',
                        "imgUrl": null
                    },
                    "attachments": [],
                    "checklists": [
                        {
                            "id": utilService.makeId(), // localID
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "BoardApp",
                                    "isDone": true
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "WorkeSpece",
                                    "isDone": true
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "HomePage",
                                    "isDone": true
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "LoginSignup",
                                    "isDone": true
                                },
                                {
                                    "id": utilService.makeId(), // localID
                                    "title": "taskDetails",
                                    "isDone": true
                                }
                            ]
                        },
                    ],
                    "members": [
                        {
                            "_id": utilService.makeId(), // mongoID
                            "username": 'omritheking',// username needs to be added 
                            "fullname": "omri luz",
                            "imgUrl": null
                        },
                        {
                            "_id": utilService.makeId(), //mongoID
                            "username": 'yonatanbz6',
                            "fullname": "yonatan ben zeev",
                            "imgUrl": null
                        },
                        {
                            "_id": utilService.makeId(), // mongoDB
                            "fullname": "shneor rabinovitz",
                            "username": 'shnrab123',
                            "imgUrl": null
                        },
                    ],
                    "dueDate": null,
                    "isDone": false,
                    "archivedAt": null,
                },
            ],
        },
    ],
    "activities": [
        {
            "id": utilService.makeId(), // localID
            "txt": "Changed Color",
            "createdAt": Date.now(),
            "byMember": {
                "_id": utilService.makeId(), // mongoID
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": utilService.makeId(), // localID
                "title": "Replace Logo"
            }
        }
    ],
}


// storageService.post(STORAGE_KEY, ourBoard).then(x => console.log(x))

