$( document ).ready( function () {
    let addListInput = $( '.addListWrapper input' );
    let addListButton = $( '#addList' );
    
    $( window ).on( "load", function () {
        if ('data' in localStorage ) {
            $('.lists').html((JSON.parse(localStorage.getItem('data'))));
         }
    });
    
    const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`
    const createListString = name =>
        `<div class="list" id="${generateId('list')}">
            <div class="listHeader">
                <img class="deleteList" src="img/icon-delete.png">   
                <h4>${name}</h4>
                <img src="img/icon-warning.png" class="clearTasks">
            </div>
            <div class="addTask">
                <input type="text">
                <button>Add task</button>
            </div>
            <div class="tasks">
                
            </div>
        </div>`

    const appendNewList = () => {
         //  cogemos el text del input
         let listName = addListInput.val().trim();
         if (listName === '') {
             return;
            };
        // creamos el nodo .list
         let list = $( createListString( listName ) );
        // añadimos el node al DOM
         $( '.lists' ).append( list )
        // Limpiamos el texto del input
         addListInput.val( '' );
         saveLists();
    };

    const saveLists = () => {
        if (typeof(Storage) !== "undefined" ) {
            localStorage.setItem('data', JSON.stringify($('.lists').html()));
        }
        else{
            alert("Sorry, your browser does not suppor localStorage");
        }
    }

    // Listeners

    addListInput.on( 'keyup', function ( event ) {
        if ( event.keyCode === 13 ) {
           appendNewList();
           saveLists();
        }
    } );

    addListButton.on( 'click', function ( event ) {
        appendNewList(event);
        saveLists();
    } );

    $( '.lists' ).on( 'click', '.deleteList', function(event) {
        let listNode = $(event.target.parentNode.parentNode);
        listNode.detach();
        saveLists();
    });

    // Construir tareas

    const createTaskString = (name) =>
        `<div class="task">
            <div class="deleteTask">&#128473;</div>
            <div class="taskCheck">&#10004;</div>
            <div class="taskText" contenteditable="true">${name}</div>
        </div>`

    const appendNewTask = (event) => {
        let taskName = $(event.target.parentNode.querySelector('input')).val().trim();
        if ( taskName === '' ) {
            return;
        };
        let task = $( createTaskString( taskName ));
        $(event.target.parentNode.parentNode.querySelector('.tasks')).append( task );
        $(event.target.parentNode.querySelector('input')).val( '' );
        saveLists();
    };
    
    //Funciones delegadas en tareas
    
    $( document ).on( 'keyup', '.addTask input', function (event) {
        if ( event.keyCode === 13 ) {
            appendNewTask(event);
            saveLists();
        }
     } );
    
    $( document ).on( 'click', '.addTask button', function (event) {
        appendNewTask(event);
        saveLists();
     });

    $( document ).on( 'click', '.deleteTask', function(event) {
        let taskNode = $(event.target.parentNode);
        taskNode.detach();
        saveLists();
     } );
    
    $( document ).on( 'keydown', '.taskText', function (event) {
        if ( event.keyCode === 13 ) {
           ( event.target.blur() );
           saveLists();
        }
    } );

    $( document ).on( 'click', '.taskCheck', function (event) {
       if ($(event.target.parentNode.querySelector('.taskText')).css('text-decoration')[0]!=="n") {
            $(event.target.parentNode.querySelector('.taskText')).css('text-decoration',"none");     
        }
        else {
            $(event.target.parentNode.querySelector('.taskText')).css('text-decoration',"line-through"); 
        }
        saveLists();
    } );

    $( document ).on( 'click', '.clearTasks', function(event) {
        $(event.target.parentNode.parentNode.querySelector('.tasks')).empty();
        saveLists();
    });
} );



