// Contenido editable del sitio. Para añadir un producto o una categoría basta con editar este archivo.
// `fotos` (opcional): imágenes de la ventana del producto. `items` indica qué presentaciones salen en cada foto.
window.SITE = {
  contacto: {
    telefono: "3108540149",
    email: "haciendasanmateo@lacteoshaciendasanmateo.com",
    ciudad: "Cajicá, Cundinamarca",
    facebook: "https://www.facebook.com/lacteosportradicion",
    instagram: "https://www.instagram.com/lacteos.haciendasanmateo/",
    youtube: "https://www.youtube.com/@lacteos.haciendasanmateo",
  },

  categorias: [
    {
      id: "leche", nombre: "Leche", grupo: "lacteos", img: "assets/img/leche.jpg",
      desc: "Entera, deslactosada y de larga vida. La base de todos los días.",
      items: ["UHT 400 ml", "UHT 900 ml", "UHT 1100 ml", "Media vida 1000 ml", "Media vida 400 ml", "Deslactosada 1100 ml", "Deslactosada 900 ml"],
      fotos: [
        { img: "assets/img/productos/leche-1.jpg", items: ["Deslactosada 1100 ml"] },
        { img: "assets/img/productos/leche-2.jpg" },
        { img: "assets/img/productos/leche-3.jpg", items: ["Deslactosada 1100 ml"] },
        { img: "assets/img/productos/leche-4.jpg" },
      ],
    },
    {
      id: "yogurt", nombre: "Yogurt en vaso", grupo: "lacteos", img: "assets/img/yogurt.jpg",
      desc: "Cremoso y con fruta de verdad, en vaso de 150 ml.",
      items: ["Mora", "Melocotón", "Fresa", "Guanábana", "Feijoa"],
      fotos: [
        { img: "assets/img/productos/yogurt-1.jpg", items: ["Mora", "Melocotón", "Fresa", "Guanábana", "Feijoa"] },
        { img: "assets/img/productos/yogurt-2.jpg", items: ["Mora", "Melocotón", "Fresa", "Guanábana", "Feijoa"] },
        { img: "assets/img/productos/yogurt-3.jpg", items: ["Feijoa", "Fresa"] },
        { img: "assets/img/productos/yogurt-4.jpg" },
      ],
    },
    {
      id: "light", nombre: "Yogurt Light", grupo: "lacteos", img: "assets/img/yogurt-mano.jpg",
      desc: "Todo el sabor, más ligero. Vaso de 150 ml.",
      items: ["Mora", "Melocotón", "Fresa"],
    },
    {
      id: "familiar", nombre: "Yogurt familiar", grupo: "lacteos", img: "assets/img/kumis-fruta.jpg",
      desc: "Presentaciones de 2000 y 4000 ml para compartir en casa.",
      items: ["Fresa", "Mora", "Melocotón", "Feijoa", "Guanábana"],
      fotos: [
        { img: "assets/img/productos/familiar-1.jpg", items: ["Mora"] },
        { img: "assets/img/productos/familiar-2.jpg", items: ["Fresa"] },
        { img: "assets/img/productos/familiar-3.jpg", items: ["Fresa", "Mora"] },
      ],
    },
    {
      id: "kumis", nombre: "Kumis", grupo: "lacteos", img: "assets/img/kumis.jpg",
      desc: "Receta tradicional, perfecto con fruta o granola.",
      items: ["Vaso 150 ml", "Bolsa 750 ml", "Garrafa 2000 ml", "Garrafa 4000 ml"],
      fotos: [
        { img: "assets/img/productos/kumis-1.jpg", items: ["Vaso 150 ml"] },
        { img: "assets/img/productos/kumis-2.jpg", items: ["Vaso 150 ml"] },
      ],
    },
    {
      id: "quesos", nombre: "Quesos", grupo: "lacteos", img: "assets/img/quesos.jpg",
      desc: "Frescos y de la región, para la arepa, el sándwich o la ensalada.",
      items: ["Doble crema 400 g", "Pera 110 g", "Tajado 400 g", "Campesino 500–5000 g", "Doble crema 5000 g"],
      fotos: [
        { img: "assets/img/productos/quesos-1.jpg", items: ["Doble crema 400 g"] },
        { img: "assets/img/productos/quesos-2.jpg", items: ["Doble crema 400 g"] },
        { img: "assets/img/productos/quesos-3.jpg", items: ["Doble crema 400 g"] },
        { img: "assets/img/productos/quesos-4.jpg", items: ["Doble crema 400 g"] },
      ],
    },
    {
      id: "arequipe", nombre: "Arequipe", grupo: "lacteos", img: "assets/img/arequipe.jpg",
      desc: "Dulce de leche cremoso para untar, rellenar o comer a cucharadas.",
      items: ["Vaso individual", "Presentación familiar"],
      fotos: [
        { img: "assets/img/productos/arequipe-1.jpg", items: ["Presentación familiar"] },
        { img: "assets/img/productos/arequipe-2.jpg", items: ["Vaso individual", "Presentación familiar"] },
        { img: "assets/img/productos/arequipe-3.jpg", items: ["Vaso individual"] },
        { img: "assets/img/productos/arequipe-4.jpg", items: ["Presentación familiar"] },
      ],
    },
    {
      id: "avena", nombre: "Avena", grupo: "bebidas", img: "assets/img/avena.jpg",
      desc: "Bebida de avena lista para tomar.",
      items: ["Bolsa 200 ml", "Bolsa 750 ml", "Sixpack"],
    },
    {
      id: "jugos", nombre: "Jugos", grupo: "bebidas", img: "assets/img/bolsas.jpg",
      desc: "Refrescos de fruta en vaso de 240 ml.",
      items: ["Mora", "Naranja", "Limón", "Mango", "Maracuyá"],
    },
    {
      id: "postry", nombre: "Postry", grupo: "postres", img: "assets/img/postry.jpg",
      desc: "Postre cremosito en vaso individual.",
      items: ["Fresa", "Mora", "Melocotón"],
    },
    {
      id: "gelatina", nombre: "Gelatina", grupo: "postres", img: "assets/img/gelatina.jpg",
      desc: "Gelatina lista en vaso de 120 g.",
      items: ["Fresa", "Mora", "Limón"],
    },
    {
      id: "cereal", nombre: "Cereal", grupo: "despensa", img: "assets/img/cereal.jpg",
      desc: "Para acompañar tu leche o yogurt.",
      items: ["Arroz sabor chocolate", "Hojuelas de maíz", "Granola"],
    },
    {
      id: "panaderia", nombre: "Panadería", grupo: "despensa", img: "assets/img/panaderia.jpg",
      desc: "Siempre fresco, del horno a tu mesa.",
      items: ["Pan tajado", "Pan tajado avena", "Tostadas", "Tortas caramelo y vainilla", "Mantecada", "Mogolla integral", "Brownie"],
    },
  ],

  grupos: [
    { id: "todos", nombre: "Todos" },
    { id: "lacteos", nombre: "Lácteos" },
    { id: "bebidas", nombre: "Bebidas" },
    { id: "postres", nombre: "Postres" },
    { id: "despensa", nombre: "Cereal y panadería" },
  ],

  galeria: [
    { img: "assets/img/galeria/leche-cafe.jpg", alt: "Leche entera y deslactosada San Mateo con café y galletas", ancho: true },
    { img: "assets/img/galeria/arequipe-cuchara.jpg", alt: "Arequipe San Mateo cayendo de una cuchara" },
    { img: "assets/img/galeria/fresa-crema.jpg", alt: "Fresa bañada en crema" },
    { img: "assets/img/galeria/quesos-mesa.jpg", alt: "Quesos San Mateo con ensalada y tomates", ancho: true },
    { img: "assets/img/galeria/queso-ensalada.jpg", alt: "Queso San Mateo en cubos sobre una ensalada" },
    { img: "assets/img/galeria/yogurt-cereal.jpg", alt: "Yogurt con cereal San Mateo en el desayuno" },
    { img: "assets/img/galeria/megalitro-galletas.jpg", alt: "Leche deslactosada Megalitro con galletas y arequipe", ancho: true },
    { img: "assets/img/galeria/linea.jpg", alt: "Línea de productos San Mateo", ancho: true },
  ],

  // Enlaces a la web actual mientras esas secciones se migran.
  legales: [
    { nombre: "Tratamiento de datos personales", url: "https://www.lacteoshaciendasanmateo.com/tratamiento-de-datos-personales/" },
    { nombre: "Código de Ética Empresarial", url: "https://www.lacteoshaciendasanmateo.com/codigo-de-etica-empresarial/" },
    { nombre: "Denuncias ética y transparencia", url: "https://www.lacteoshaciendasanmateo.com/formulario-denuncias-de-etica-y-transparencia/" },
    { nombre: "Políticas de calidad", url: "https://www.lacteoshaciendasanmateo.com/politicas-de-calidad/" },
    { nombre: "Canales de distribución", url: "https://www.lacteoshaciendasanmateo.com/canales-de-distribucion/" },
  ],
};
