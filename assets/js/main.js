// Variables globales
let carrito = [];
let productos = [];

const url = "./assets/js/db.json"

let gestor ;
const clave_carrito = "carrito";

//Bloque que se ejecuta cuando esté todo listo
document.addEventListener('DOMContentLoaded',()=>{

   carrito = JSON.parse(localStorage.getItem(clave_carrito)) || []

   gestor = new GestionarProductos ();
   gestor.iniciar ();
})

//Función para agregar un artículo al carrito
function addCarrito (id){

    let prod = document.querySelector ("#row_"+id)
    let producto = new Producto (   id,
                                    prod.querySelector('h3').textContent,
                                    prod.querySelector('.precio').textContent.substring(1,6),
                                    prod.querySelector('img').src
                                )
    
    gestor.addCart(producto);
}

//Eliminar artículo
function eliminar (id){
    gestor.eliminarArticulo(id);
}

//Eventos de tecla para el buscador
document.querySelector("#buscar").addEventListener("keyup", ()=>{

    let q = document.querySelector("#buscar").value;

    if (q.length >=2){

        gestor.mostrarHeader(`Resultados para: ${q}`);
        gestor.buscar(q);
    }else if(q.length === 0){

        gestor.mostrarHeader ("Todos los productos en stock");
        gestor.cargarProductos (productos);
    }

})