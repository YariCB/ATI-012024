// INDEX.HTML

document.addEventListener('DOMContentLoaded', function() {
    fetch('reto5/datos/index.json')
      .then(response => response.json())
      .then(data => {

        const list = document.querySelector('.listStudents');
        
        data.forEach(student => {
          const listItem = document.createElement('li');
          listItem.classList.add('listItem');
          
          const picture = document.createElement('picture');
          
          const source480 = document.createElement('source');
          source480.setAttribute('media', '(max-width:480px)');
          source480.setAttribute('srcset', `reto5/${student.imagen}`);
          
          const sourceMin = document.createElement('source');
          sourceMin.setAttribute('media', '(min-width:481px)');
          sourceMin.setAttribute('srcset', `reto5/${student.imagen}`);
          
          const img = document.createElement('img');
          img.classList.add('pfpList');
          img.setAttribute('src', `reto5/${student.imagen}`);
          img.setAttribute('alt', 'Foto de ' + student.nombre);
          
          const link = document.createElement('a');
          link.setAttribute('href', 'perfil.html?ci=' + student.ci);
          link.textContent = student.nombre;
          
          picture.appendChild(source480); 
          picture.appendChild(sourceMin);
          picture.appendChild(img);
          
          listItem.appendChild(picture);
          listItem.appendChild(document.createElement('br'));
          listItem.appendChild(link);
          
          list.appendChild(listItem);
        });


        // Buscador
        
        const form = document.querySelector('.menuForm');
        form.addEventListener('submit', function(e){
          e.preventDefault();

          const query = document.getElementById('nombre').value;
          searchStudents(query);
        });

        function searchStudents(query){
          const filterestStudents = data.filter(student =>
            student.nombre.toLowerCase().includes(query.toLowerCase())
          );
          list.innerHTML = '';

          if(filterestStudents.length > 0){
            filterestStudents.forEach(student =>{
              const listItem = document.createElement('li');
              listItem.textContent = student.nombre;
              list.appendChild(listItem);
            });
          } else {
            const message = document.createElement('li');
            message.classList.add('noResults');
            message.textContent = `No hay alumnos que tengan en su nombre: ${query}`;
            list.appendChild(message);
          }
        }


      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  });


// PERFIL.HTML

let urlParams = new URLSearchParams(window.location.search);
const perfilCI = urlParams.get('ci');
const rutaPerfil = `reto5/${perfilCI}/perfil.json`;

let tdColorTitulo, tdLibroTitulo, tdMusicaTitulo, tdVideojuegosTitulo, bLenguajesTitulo;

fetch(rutaPerfil)
  .then(response => response.json())
  .then(perfil => {

    document.title = perfil.nombre;

    const img = document.querySelector('.pfp');
    img.src = `reto5/${perfilCI}/${perfil.imagen}`;
    img.alt = 'Foto de ' + perfil.nombre;

    document.getElementById('perfilNombre').textContent = perfil.nombre;
    document.getElementById('perfilDescripcion').textContent = perfil.descripcion;

    const tabla = document.createElement('table');
    tabla.classList.add('text');
    tabla.appendChild(document.createElement('br'));

    // Color favorito
    const filaColor = document.createElement('tr');
    tdColorTitulo = document.createElement('td');
    const tdColorContenido = document.createElement('td');
    tdColorTitulo.textContent = 'Mi color favorito es: ';
    tdColorContenido.textContent = perfil.color;
    filaColor.appendChild(tdColorTitulo);
    filaColor.appendChild(tdColorContenido);
    tabla.appendChild(filaColor);

    // Libro favorito
    const filaLibro = document.createElement('tr');
    tdLibroTitulo = document.createElement('td');
    const tdLibroContenido = document.createElement('td');
    tdLibroTitulo.textContent = 'Mi libro favorito es: ';
    tdLibroContenido.textContent = perfil.libro.join(', ');
    filaLibro.appendChild(tdLibroTitulo);
    filaLibro.appendChild(tdLibroContenido);
    tabla.appendChild(filaLibro);

    // Estilo de música preferida
    const filaMusica = document.createElement('tr');
    tdMusicaTitulo = document.createElement('td');
    const tdMusicaContenido = document.createElement('td');
    tdMusicaTitulo.textContent = 'Mi estilo de música preferida es:';
    tdMusicaContenido.textContent = perfil.musica.join(', ');
    filaMusica.appendChild(tdMusicaTitulo);
    filaMusica.appendChild(tdMusicaContenido);
    tabla.appendChild(filaMusica);

    // Videojuegos favoritos
    const filaVideojuegos = document.createElement('tr');
    tdVideojuegosTitulo = document.createElement('td');
    const tdVideojuegosContenido = document.createElement('td');
    tdVideojuegosTitulo.textContent = 'Mis videojuegos favoritos son:';
    tdVideojuegosContenido.textContent = perfil.video_juego.join(', ');
    filaVideojuegos.appendChild(tdVideojuegosTitulo);
    filaVideojuegos.appendChild(tdVideojuegosContenido);
    tabla.appendChild(filaVideojuegos);
    
    // Lenguajes de programación aprendidos
    const filaLenguajes = document.createElement('tr');
    const tdLenguajesTitulo = document.createElement('td');
    const tdLenguajesContenido = document.createElement('td');
    bLenguajesTitulo = document.createElement('b');
    const bLenguajesContenido = document.createElement('b');
    bLenguajesTitulo.textContent = 'Lenguajes de programación aprendidos:';
    bLenguajesContenido.textContent = perfil.lenguajes.join(', ');
    tdLenguajesTitulo.appendChild(bLenguajesTitulo);
    tdLenguajesContenido.appendChild(bLenguajesContenido);
    filaLenguajes.appendChild(tdLenguajesTitulo);
    filaLenguajes.appendChild(tdLenguajesContenido);
    tabla.appendChild(filaLenguajes);

    // Insertar la tabla en el documento
    const contenedorTabla = document.querySelector('.text');
    contenedorTabla.appendChild(tabla);

    document.getElementById('perfilEmail').href = `mailto:${perfil.email}`;
    document.getElementById('perfilEmail').textContent = perfil.email;
  })
  .catch(error => {
    console.error('Error al obtener los datos del perfil: ', error);
  });


// IDIOMA

urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang')

fetch(`reto5/conf/config${lang}.json`)
  .then(response => response.json())
  .then(data => {
    
    document.getElementById('sitio').textContent = data.sitio.join(' ');
    document.getElementById('saludo').textContent = data.saludo;
    document.getElementById('nombre').placeholder = data.nombre;
    document.getElementById('buscar').value = data.buscar;
    document.getElementById('copyRight').textContent = data.copyRight;

    tdColorTitulo.textContent = data.color;
    tdLibroTitulo.textContent = data.libro;
    tdMusicaTitulo.textContent = data.musica;
    tdVideojuegosTitulo.textContent = data.video_juego;
    bLenguajesTitulo.textContent = data.lenguages;
    document.getElementById('email').textContent = data.email;

  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON: ', error);
  });