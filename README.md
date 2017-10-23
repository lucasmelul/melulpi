![Logo of the project](https://github.com/lucasmelul/melulpi/blob/master/UP.png?raw=true)
# melulpi

Proyecto desarrollado para la materia "Arquitectura Web" de la Universidad de Palermo a cargo del profesor Diego Marafetti.

Nombre del equipo: "Melulpi"
Integrantes del equipo: 
                      - Lucas Melul
                      - Juan Pi

Descripcion del Proyecto:

El proyecto contempla la utilización de las herramientas, tecnologías y buenas prácticas desarrolladas durante la cursada.
El mismo ha de incluír la utilización de Angular.js + Node.js + MongoDB como stack para el desarrollo de una RESTfull web app con un 'CRUD' y una API para el acceso a los correspondientes recursos del sistema.

La temática elegida es un software de gestión de cupones y descuentos (con recursos básicos) para la implementación en distintas empresas, comercios, negocios y servicios pudiendo ser integrada con APIs de geolocalización.

### Installation & Build

TBD

### USAGE

TBD

### FEATURES

Los features contemplados para la herramienta son:
  * Rol Admin:
    * Destacar descuentos
    * Consultar Empresas
    * Consultar Usuarios
  * Rol Cliente:
    * Consultar de Descuentos (por geolocalización o por categoria)
    * Consultar Mis Descuentos
    * Comprar Descuentos
  * Rol Empresa:
    * Publicar Descuento
    * Consultar Descuentos (por geolocalización o por categoria)

### Resources

Algunos de los resources pensados:

  * URL/descuentos 
    * GET (Rol Cliente/Empresa)
      * ?categ='gastronomia'&lat=2363576434&long=252352462
    * POST (Rol Empresa)
  * URL/descuentos/{id} (Rol Empresa/Admin)
    * PUT 
    * DELETE  
    
  * URL/usuarios
    * GET (Rol Admin)
    * POST (Rol Cliente)
  * URL/usuarios/{id}
    * GET (Rol Empresa)
  * URL/usuarios/me
    * GET (Rol CLiente)
    * PUT (Rol Cliente)
  * URL/usuarios/me/descuentos
    * GET (Rol CLiente)
    * POST (Rol Cliente)
    
  * URL/empresas/
    * GET (Rol Cliente/Empresa/Admin)
    * POST (Rol Empresa)
  * URL/empresas/{id}
    * GET (Rol Cliente/Empresa/Admin)
    * PUT (Rol Empresa)
 
### Licensing

TBD
