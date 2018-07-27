$( document ).ready( function () {
    let addListInput = $( '.addListWrapper input' );
    let addListButton = $( '.addListWrapper button');
    
    const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`
    const createListString = name =>
        `<div class="list" id="${generateId('list')}">
            <div class="listHeader">
                <h4>${name}</h4>
                <button>Delete list</button>
            </div>
            <div class="tasks">
                
            </div>
            <div class="addTask">
                <input type="text">
                <button>Add task</button>
            </div>
        </div>`

    const createTaskString = name =>
        `<div class="task">
            <p>${name}</p>
                <button>Delete Task</button>
        </div>`
               
    const appendNewList = () => {
         //  cogemos el text del input
         let listName = addListInput.val().trim();
         if (listName === '') {
             return;
            };

         // creamos el nodo .list
         let list = $( createListString( listName ) );
        // console.log(list.attr("id"));

         // añadimos el node al DOM
         $( '.lists' ).append( list )

         // Limpiamos el texto del input
         addListInput.val( '' );
    };

    const appendNewTask = (event) => {
        let addTaskInput = $(event.target.parentNode.querySelector('input'));
        //let addTaskButton = $(event.target.parentNode.querySelector('button'));
        let taskName = addTaskInput.val().trim();
        if ( taskName === '' ) {
            return;
        };
        let task = $( createTaskString( taskName ));
        let taskNode = $(event.target.parentNode.parentNode.querySelector('.tasks'));
        $(taskNode).append( task );
        addTaskInput.val( '' );
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

     $('.lists').on('click', '.listHeader button', function(event) {
        let listNode = $(event.target.parentNode.parentNode);
        listNode.detach();
     });

    let addFromTaskInput = $( '.addTask input' );
    let addFromTaskButton = $( '.addTask button' );

    addFromTaskButton.on('click', function (event) {
   // $('.addTask button').on('click', function (event) {
        //let taskNode = $(event.target.parentNode.prev);
        appendNewTask(event);
        //console.log($taskNode);
     })

    addFromTaskInput.on( 'keyup', function (event) {
    //$('.addTask input').on('keyup', function (event){
        if ( event.keyCode === 13 ) {
           // let taskNode = $(event.target.parentNode.prev);
            appendNewTask(event);
           // console.log(taskName);
        }
     });
} )