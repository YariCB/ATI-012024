// INDEX.HTML

// Función para la creación del ítem
function createListItem(student) {
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
  
  return listItem;
}


document.addEventListener('DOMContentLoaded', function() {
    fetch('reto5/datos/index.json')
      .then(response => response.json())
      .then(data => {

        fetch(`reto5/conf/config${lang}.json`)
          .then(response => response.json())
          .then(language => {
            
            data.forEach(student => {
              const listItem = createListItem(student);
              list.appendChild(listItem);
            });
    
    
            // BUSCADOR
            
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
                  const listItem = createListItem(student);
                  list.appendChild(listItem);
                });
              } else {
                let message = document.createElement('li');
                message.classList.add('noResults');
                message.textContent = language.sinResultados.replace('[query]', query);
                list.appendChild(message);
              }
            }


          })
          .catch(error => {
            console.error('Error al cargar el archivo JSON: ', error);
          });

        const list = document.querySelector('.listStudents');
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON: ', error);
      });
  });


// PERFIL.HTML

let urlParams = new URLSearchParams(window.location.search);
const perfilCI = urlParams.get('ci');
const rutaPerfil = `reto5/${perfilCI}/perfil.json`;

fetch(rutaPerfil)
  .then(response => response.json())
  .then(perfil => {

    fetch(`reto5/conf/config${lang}.json`)
      .then(response => response.json())
      .then(dataLang => {
     
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
        const tdColorTitulo = document.createElement('td');
        const tdColorContenido = document.createElement('td');
        tdColorTitulo.textContent = dataLang.color;
        tdColorContenido.textContent = perfil.color;
        filaColor.appendChild(tdColorTitulo);
        filaColor.appendChild(tdColorContenido);
        tabla.appendChild(filaColor);

        // Libro favorito
        const filaLibro = document.createElement('tr');
        const tdLibroTitulo = document.createElement('td');
        const tdLibroContenido = document.createElement('td');
        tdLibroTitulo.textContent = dataLang.libro;
        tdLibroContenido.textContent = perfil.libro.join(', ');
        filaLibro.appendChild(tdLibroTitulo);
        filaLibro.appendChild(tdLibroContenido);
        tabla.appendChild(filaLibro);

        // Estilo de música preferida
        const filaMusica = document.createElement('tr');
        const tdMusicaTitulo = document.createElement('td');
        const tdMusicaContenido = document.createElement('td');
        tdMusicaTitulo.textContent = dataLang.musica;
        tdMusicaContenido.textContent = perfil.musica.join(', ');
        filaMusica.appendChild(tdMusicaTitulo);
        filaMusica.appendChild(tdMusicaContenido);
        tabla.appendChild(filaMusica);

        // Videojuegos favoritos
        const filaVideojuegos = document.createElement('tr');
        const tdVideojuegosTitulo = document.createElement('td');
        const tdVideojuegosContenido = document.createElement('td');
        tdVideojuegosTitulo.textContent = dataLang.video_juego
        tdVideojuegosContenido.textContent = perfil.video_juego.join(', ');
        filaVideojuegos.appendChild(tdVideojuegosTitulo);
        filaVideojuegos.appendChild(tdVideojuegosContenido);
        tabla.appendChild(filaVideojuegos);
        
        // Lenguajes de programación aprendidos
        const filaLenguajes = document.createElement('tr');
        const tdLenguajesTitulo = document.createElement('td');
        const tdLenguajesContenido = document.createElement('td');
        const bLenguajesTitulo = document.createElement('b');
        const bLenguajesContenido = document.createElement('b');
        bLenguajesTitulo.textContent = dataLang.lenguages;
        bLenguajesContenido.textContent = perfil.lenguajes.join(', ');
        tdLenguajesTitulo.appendChild(bLenguajesTitulo);
        tdLenguajesContenido.appendChild(bLenguajesContenido);
        filaLenguajes.appendChild(tdLenguajesTitulo);
        filaLenguajes.appendChild(tdLenguajesContenido);
        tabla.appendChild(filaLenguajes);

        // Insertar la tabla en el documento
        const contenedorTabla = document.querySelector('.text');
        contenedorTabla.appendChild(tabla);

        console.log(perfil.email);
        document.getElementById('email').textContent = `${dataLang.email.replace('[email]', perfil.email)}`;
        document.getElementById('perfilEmail').href = `mailto:${perfil.email}`;
        document.getElementById('perfilEmail').textContent = perfil.email;

      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON: ', error);
      });

  })
  .catch(error => {
    console.error('Error al obtener los datos del perfil: ', error);
  });


// IDIOMA INDEX

urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || 'ES';

fetch(`reto5/conf/config${lang}.json`)
  .then(response => response.json())
  .then(data => {
    
    document.getElementById('sitio').textContent = data.sitio.join(' ');
    document.getElementById('saludo').innerHTML = `${data.saludo}, <a href="./perfil.html?ci=29706291"> Yarima </a>`;
    document.getElementById('nombre').placeholder = data.nombre;
    document.getElementById('buscar').value = data.buscar;
    document.getElementById('copyRight').textContent = data.copyRight;

  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON: ', error);
  });