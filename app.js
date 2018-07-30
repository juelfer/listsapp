$( document ).ready( function () {
    let addListInput = $( '.addListWrapper input' );
    let addListButton = $( '.addListWrapper button');
    
    const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`
    const createListString = name =>
        `<div class="list" id="${generateId('list')}">
            <div class="listHeader">
                <h4>${name}</h4>
                <button class="deleteList">X</button>
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
    };

    // Listeners

    addListInput.on( 'keyup', function ( event ) {
        if ( event.keyCode === 13 ) {
           appendNewList(event);
        }
    } );

    addListButton.on( 'click', function ( event ) {
        appendNewList(event);
    } );

     $( '.lists' ).on( 'click', '.listHeader button', function(event) {
        let listNode = $(event.target.parentNode.parentNode);
        listNode.detach();
     });

    // Construir tareas

    const createTaskString = name =>
        `<div class="task">
            <button class= "delete Task">X</button>
            <div class="text">${name}</div>
        </div>`

    const appendNewTask = (event) => {
        let taskName = $(event.target.parentNode.querySelector('input')).val().trim();
        if ( taskName === '' ) {
            return;
        };
        let task = $( createTaskString( taskName ));
        $(event.target.parentNode.parentNode.querySelector('.tasks')).append( task );
        $(event.target.parentNode.querySelector('input')).val( '' );
    };
    
    //Funciones delegadas en tareas
    
    $( document ).on( 'keyup', '.lists .list .addTask input', function (event) {
        if ( event.keyCode === 13 ) {
            appendNewTask(event);
        }
     });
    
    $( document ).on('click', '.lists .list .addTask button', function (event) {
        appendNewTask(event);
     })

    $( document ).on('click', '.task button', function(event) {
        let taskNode = $(event.target.parentNode);
        taskNode.detach();
     });
    
} );



