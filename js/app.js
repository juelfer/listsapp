$( document ).ready( function () {
    let addListInput = $( '.addListWrapper input' );
    let addListButton = $( '#addList' );
    
    if ('data' in localStorage ) {
        $('.lists').html((JSON.parse(localStorage.getItem('data'))));
    }
      
    const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`
    const createListString = name =>
        `<div class="list" id="${generateId('list')}">
            <div class="listHeader">
                <img class="deleteList" src="img/icon-delete.png">   
                <h4>${name}</h4>
                <img src="img/icon-clean.png" class="clearTasks">
            </div>
            <div class="addTask">
                <input type="text">
                <button>Add task</button>
            </div>
            <div class="tasks">
                
            </div>
        </div>`;

    const appendNewList = () => {
         let listName = addListInput.val().trim();
         if (listName === '') {
             return;
            };
         let list = $( createListString( listName ) );
         $( '.lists' ).append( list )
         addListInput.val( '' );
         saveLists();
    };

    const saveLists = () => {
        if (typeof(Storage) !== "undefined" ) {
            localStorage.setItem('data', JSON.stringify($('.lists').html()));
        }
        else{
            alert("Aw, geez. This is embarrasing, but your browser does not seem to support localStorage.");
        }
    }

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
        if (confirm("W-Wait! The entire list will be removed if you press 'Accept'! Won't someone think of the children?!")) {
            let listNode = $(event.target.parentNode.parentNode);
            listNode.detach();
            saveLists();
        }
    });

    const createTaskString = (name) =>
        `<div class="task">
            <div class="deleteTask">&#128473;</div>
            <div class="taskCheck">&#10004;</div>
            <div class="taskText" contenteditable="true" spellcheck="false">${name}</div>
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
            $(event.target.parentNode.querySelector('.taskText')).css('color',"darkslategrey");
            $(event.target).css('background-color',"green");
            $(event.target).css('color',"white");
        }
        else {
            $(event.target.parentNode.querySelector('.taskText')).css('text-decoration',"line-through"); 
            $(event.target.parentNode.querySelector('.taskText')).css('color',"green");
            $(event.target).css('background-color',"white");
            $(event.target).css('color',"green");
        }
        saveLists();
    } );

    $( document ).on( 'click', '.clearTasks', function(event) {
            if (confirm("Are you sure? Your cute little pretty tasks will be mercilessly obliterated and never to be seen again! Is it ok?")) {
                $(event.target.parentNode.parentNode.querySelector('.tasks')).empty();
                saveLists();
        };
    });
} );



