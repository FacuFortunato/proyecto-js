class GestionarProductos {

    iniciar(){

        fetch (url)
        .then(respuesta => respuesta.json())
        .then (resultado => {

            productos = resultado.productos;

            let productosDestacados = productos.filter(prod => prod.destacado == 1)

            this.cargarProductos (productosDestacados);
        })



        this.mostrarCarrito();
        this.actualizarContador();
    }


    cargarProductos (productos) {

        const divProductos = document.querySelector("#productos")
        divProductos.innerHTML = "";

        if (productos.length === 0){

            this.mostrarHeader("No se han encontrado Productos")

        } else {


            productos.forEach( (producto) => {

                let prod = document.createElement('div');
                prod.classList.add('col-12','h200','border','bg-white','rounded','mt-3','d-flex','align-items-center','p-3','flex-row', 'producto');
                prod.setAttribute('id','row_'+producto.id);    
            
        
                prod.innerHTML = `      <div class="w-20">
                                            <img src="./assets/img/${producto.img}" alt="" width="150" height="150" >
                                        </div>

                                        <div class="p-3 d-flex flex-column w-60 h-150">
                                            <h3>${producto.nombre}</h3>                                            
                                            <p>${producto.descripcion.substring(0,120)}</p>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center flex-column w-20 h-150">
                                            <p class="precio">$${producto.precio}</p>
                                            <a href="javascript:addCarrito(${producto.id})" class="btn btn-primary">Agregar al carrito</a>
                                        </div>
                                `;

                divProductos.appendChild(prod);

            });   
        }
    }

    mostrarHeader (msj){

        const headerProductos = document.querySelector("#headerProductos")
        headerProductos.innerHTML = msj;
    }


    addCart (infoProducto){

        const existe = carrito.some(producto => producto.id === infoProducto.id)

        if(existe){
            
            const articulos = carrito.map (producto => {

                if (producto.id === infoProducto.id){

                    producto.cantidad++
                    return producto;

                } else{
                    
                    return producto;
                }
            })

            carrito = articulos;
            this.mostrarNotificacion ("Se actualizó la cantidad del producto",1500,"bottom");
        } else{

            carrito.push(infoProducto);
            this.mostrarNotificacion("Se agregó el producto al carrito",1500,"bottom");
        }

        this.actualizarCarrito ();

    }

    eliminarArticulo(id){

        Swal.fire({
            title: '"Esta seguro de eliminar el producto ?"',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo',
            cancelButtonText: `Cancelar`,

        }).then((result)=>{

            if (result.isConfirmed){

                carrito = carrito.filter(articulo => articulo.id != id);
                this.actualizarCarrito();

                this.mostrarNotificacion("El producto se eliminó correctamente",1500,"bottom");
            }
        })
    }

    actualizarCarrito(){

        this.actualizarContador();
        this.mostrarCarrito();
        this.guardarCarrito();
    }

    actualizarContador(){

        let totalProductos = this.contarProductos ();
        let countCarrito = document.querySelector("#badgeCarrito");
        countCarrito.innerHTML = totalProductos;
    }

    contarProductos (){

        let contadorProductos = 0;

        carrito.forEach((producto)=>{

            contadorProductos = contadorProductos + parseInt(producto.cantidad)
        })

        return contadorProductos;
    }

    guardarCarrito (){

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    mostrarCarrito (){

        let detalleCarrito = document.querySelector("#idCarrito");
        detalleCarrito.innerHTML= "";

        let total = 0;

        carrito.forEach((producto)=>{

            const {nombre, precio, cantidad, img, id} = producto

            const row = document.createElement('div');
            row.classList.add("row");

            total += parseInt(producto.precio);

            row.innerHTML = `
                        
                                <div class="col-3 d-flex align-items-center p-2 border-bottom">
                                    <img src="${img}" width="80"/>
                                </div>

                                <div class="col-3 d-flex align-items-center p-2 border-bottom">
                                    ${nombre}
                                </div>

                                <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
                                    $ ${precio}
                                </div>

                                <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                                    ${cantidad}
                                </div>

                                <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                                    <a href="javascript:eliminar(${id})">
                                        <i class="fa-solid fa-square-minus fa-2x"></i>
                                    </a>
                                </div>
                            `;


            detalleCarrito.appendChild(row);

        })


        let row = document.createElement('div');
        row.classList.add('row');
        
        row.innerHTML = `   <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                                Total a pagar:
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                                <b> $ ${total}</b>
                            </div>
                        `;

        // Agrega el HTML del carrito en el tbody
        detalleCarrito.appendChild(row);
    }

    buscar (q){

        let resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(q.toLowerCase()) || producto.descripcion.toLowerCase().includes(q.toLowerCase()));   
        this.cargarProductos(resultado);
    }


    mostrarNotificacion (texto,duracion,posicion){

        Toastify({
            text: texto,
            duration: duracion,
            gravity: posicion,
        }).showToast();
    }

}