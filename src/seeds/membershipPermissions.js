const basic = [{
    permission: 'Nombre en tarjeta',
    access: true 
}, {
    permission: 'Descripción',
    access: true,
    limit: 50
}, {
    permission: 'Foto de portada',
    access: false
}, {
    permission: 'Foto de empresa',
    access: false
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
}, {
    permission: "Redes sociales adicionales",
    access: true,
    limit: 4
}, {
    permission: 'Redes sociales adicionales obligatorias',
    access: []
}, {
    permission: 'Diseño',
    access: false
}, {
    permission: 'Tarjetas',
    access: true,
    limit: 1
}]

const pro = [{
    permission: 'Nombre en tarjeta',
    access: true 
}, {
    permission: 'Descripción',
    access: true,
    limit: 140
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
    access: true
}, {
    permission: 'Cambiar URL',
    access: true
}, {
    permission: 'Tipos de perfil',
    access: ['público', 'privado']
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
}, {
    permission: "Redes sociales adicionales",
    access: true,
    limit: 4
}, {
    permission: 'Redes sociales adicionales obligatorias',
    access: []
}, {
    permission: 'Diseño',
    access: true
}, {
    permission: 'Tarjetas',
    access: true,
    limit: 3
}]

const vip = [{
    permission: 'Nombre en tarjeta',
    access: true 
}, {
    permission: 'Descripción',
    access: true,
    limit: 150
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
    access: true
}, {
    permission: 'Cambiar URL',
    access: true
}, {
    permission: 'Tipos de perfil',
    access: ['público', 'privado', 'vip']
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
}, {
    permission: "Redes sociales adicionales",
    access: true,
    limit: 4
}, {
    permission: 'Redes sociales adicionales obligatorias',
    access: []
}, {
    permission: 'Diseño',
    access: true
}, {
    permission: 'Tarjetas',
    access: true,
    limit: 5
}]