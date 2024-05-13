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
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  });