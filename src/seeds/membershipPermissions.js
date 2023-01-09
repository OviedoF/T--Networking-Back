const basic = [{
    permission: 'Nombre en tarjeta',
    access: true 
}, {
    permission: 'Descripción',
    access: true,
    limit: 50
}, {
    permission: 'Foto de portada',
    access: true
}, {
    permission: 'Foto de empresa',
    access: true
}, {
    permission: 'Cargo',
    access: true
}, {
    permission: 'Empresa',
    access: true
}, {
    permission: 'Correo electrónico',
    access: true
}, {
    permission: 'Guardar contacto',
    access: true
}, {
    permission: 'VCard',
    access: true
}, {
    permission: 'Libre de publicidad',
    access: false
}, {
    permission: 'Cambiar URL',
    access: false
}, {
    permission: 'Tipos de perfil',
    access: ['público']
}, {
    permission: 'Redes favoritas',
    access: true,
    limit: 2
}, {
    permission: 'Redes sociales favoritas obligatorias',
    access: ['website']
}, {
    permission: 'Redes sociales favoritas excluidas',
    access: ['facebook', 'twitter', 'linkedin']
}]