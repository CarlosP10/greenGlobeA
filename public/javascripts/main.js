window.onload = () => {

    //Listener del formulario
    let form = document.claseForm;

    form.addEventListener('submit', ()=>{
        event.preventDefault();

        let clase = {
            name: form.name.value,
            uvs: form.uvs.value,
            descripcion: form.descripcion.value
        }

        fetch('/clase', {
            method:'POST',
            body: JSON.stringify(clase),
            headers:{
                'Content-Type': 'application/json'
            }   
        })
        .then(res => {return res.json()})
        .then(data => {
            if(data.ok)
                addrow(data.clase);
        });

    });

    //llenar tabla cada vez que cargue la pagina
    fetch('/clase', {
        method:'GET'
    })
    .then(res => {return res.json()})
    .then(data => {
        if(data.ok){
            let clases = data.clases;
            clases.forEach(element => {
                addrow(element);
            });
        }
    })

}

function addrow(clase){
    let tbody = document.getElementById("claseTablaBody");

    let tr = document.createElement('tr');

    let td_name = document.createElement('td');
    let td_uvs = document.createElement('td');
    let td_descripcion = document.createElement('td');
    let td_edit = document.createElement('td');
    let td_delete = document.createElement('td');

    td_name.innerText = clase.name;
    tr.appendChild(td_name);

    td_uvs.innerText= clase.uvs;
    tr.appendChild(td_uvs);

    td_descripcion.innerText = clase.descripcion;
    tr.appendChild(td_descripcion);

    td_edit.innerHTML = '<a href="#" class="btn btn-warning">EDIT</a>';
    tr.appendChild(td_edit);

    td_delete.innerHTML = '<a href="#" class="btn btn-danger">DELETE</a>';
    tr.appendChild(td_delete);

    tr.setAttribute("data-claseId", clase._id);

    tbody.appendChild(tr);

    td_edit.childNodes[0].addEventListener('click', function(){
        edit(clase._id);
    });

    td_delete.childNodes[0].addEventListener('click', function(){
        del(clase._id);
    });

}

function del(claseId){
    
    fetch('/clase/'+claseId, {
        method: 'DELETE'
    })
    .then(res => {return res.json()})
    .then(deleted => {
        if(deleted.ok){
            var to_remove = document.querySelector('[data-claseId="'+claseId+'"]');
            to_remove.parentNode.removeChild(to_remove);
        }
    });
}

function edit(claseId){
    let form = document.claseForm;
    let claseUpdated = {
        name: form.name.value,
        uvs: form.uvs.value,
        descripcion: form.descripcion.value
    };

    fetch('/clase/'+claseId, {
        method: 'PUT',
        body: JSON.stringify(claseUpdated),
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(res => {return res.json()})
    .then(data => {
        if(data.ok){
            var to_update = document.querySelector('[data-claseId="'+claseId+'"]');
            var children = to_update.childNodes;
            children[0].innerText = claseUpdated.name;
            children[1].innerText = claseUpdated.uvs;
            children[2].innerText = claseUpdated.descripcion;

        
        }
    })
}
