import data from './data/lol/lol.js';
import { filtrotop } from  './data.js';
import {filtrojungla} from  './data.js';


//Primera parte de interaccion
//Mostrar campeones interactua con el DOM
//genera reflow
const contenido = document.getElementById('cartas');
for (var campeones in data.data){
    const campeon = (data.data[campeones])
    var div = document.createElement("div");
    var name = document.createElement("h3");
    var imagenCampeon = document.createElement("img");
    div.className='card';
    imagenCampeon.src = campeon.img;
    name.innerText = campeon.name
    div.appendChild(name)
    div.appendChild(imagenCampeon)
    div.onclick = function () {
        mostrarPopup(campeon);
      };
    contenido.appendChild(div);   
}
//Segunda parte de interaccion
//Primer filtro de busqueda no retorna nada
    document.addEventListener("keyup",(e) =>{
        //target funciona pa saber cuando avtive el evento jiji
        if(e.target.matches(".card-filter")){
            //matches verifica que la clase sea la misma
            //element generalizacion para representar un objeto en html y sacar cositas de ahi jiji xd
            document.querySelectorAll(".card").forEach((element) => 
            //tolower pasa todo a minuscula pa que sea mas sencillo
             element.textContent.toLowerCase().includes(e.target.value)
             //despues del signo de pregunta es como el true :D si la condicion de arriba se cumple
            ?element.classList.remove("filter")
            :element.classList.add("filter")
            );            
        }
    });    


/*for (var campeones in data.data){

    let campeon = (data.data[campeones].stats.attackdamage)
    let defensa=(data.data[campeones].stats.armor)
    let MAGIA=(data.data[campeones].stats.spellblock)
    console.log( " ATAQUE ",campeon, " DEFENSA "+ defensa, " MAGIA " +MAGIA)
    if (data.data[campeones].tags.includes("Fighter")){
 console.log(data.data[campeones].name)
    }
}*/

    

//Tercera parte primer filtro de roles
//Tambien interactua con el dom

var roles=document.getElementsByClassName("roles");
var roleslista=""
for (let i = 0; i < roles.length; i++) {
    roles[i].addEventListener("click", ()=>{
    if (roles[i].textContent=="Apoyo" ){   
     roleslista="Support"
    } else if(roles[i].textContent=="Asesino"){
      roleslista="Assassin"
    } else if(roles[i].textContent=="Luchador"){
        roleslista="Fighter"
    }else if(roles[i].textContent=="Tirador"){
        roleslista="Marksman"
    }else if(roles[i].textContent=="Mago"){
        roleslista="Mage"
    }
    else if(roles[i].textContent=="Tanque"){
        roleslista="Tank"
    }
    var listaderoles=[]
    for (var rep in data.data){
    console.log(data.data[rep].tags);
    //includes verifica si dentro de un array hay un elemento 
    //que tenga la palabra que le meti xd
    if (data.data[rep].tags.includes(roleslista)){
      console.log(data.data[rep].name);
      listaderoles.push(data.data[rep].name);  
    }
 }

    document.querySelectorAll(".card").forEach((element) => 
    listaderoles.includes(element.textContent ) 
     ?element.classList.remove("filter")
     :element.classList.add("filter")
     )
    
}
)}


//Posiciones es el tercer filtro depronto si se testea 
var contenedorgrande=[]

var posicion=document.getElementsByClassName("posiciones");

for (let i = 0; i < posicion.length; i++) {
    posicion[i].addEventListener("click", ()=>{
        
        var listamaxattack=[]
        for (var campeones in data.data){
            listamaxattack.push(data.data[campeones].stats.attackdamage); 
            var maximo=Math.max.apply(null,listamaxattack) 
        }
        console.log(listamaxattack)
        console.log(maximo)
        var valores=[]
        valores=listamaxattack.filter(item=>{
            return item > maximo*0.95 || item==60
            })
        console.log(valores)
        
    if (posicion[i].textContent=="Toplaner" ){   
        
     for (var r in data.data){
        var nombre=data.data[r].name
        var ataque=data.data[r].stats.attackdamage
        var tag=data.data[r].tags
        
        contenedorgrande.push({nombre,ataque,tag})
    }
    console.log(contenedorgrande)
    
    
     let nomyatac=contenedorgrande.filter(item=>{
        return (item.ataque >=0.95*maximo && item.tag.includes("Tank")) || (item.ataque >=0.95*maximo && item.tag.includes("Fighter") ) ;
        })
        console.log(nomyatac)   
     var listatopliner=[]
     for (var k in nomyatac){
         listatopliner.push(nomyatac[k].nombre)
         
     }
     console.log(listatopliner)
     filtrotop(".card",listatopliner);
    }
    

    if (posicion[i].textContent=="Jungla" ){   
        var comparativosvelocidad=[]
        
        var listamaxvel=[]
        for (var campeones in data.data){
            listamaxvel.push(data.data[campeones].stats.movespeed); 
           
        }
        var maximovel=Math.max.apply(null,listamaxvel) 
            console.log(maximovel)
            
        //maximo ataque 355,minimo de los que estan ahi 325
        //spellblock minimo 30
        //maximo 10 mpregen
        for (var r in data.data){
            
            
            var nombre=data.data[r].name
            var speed=data.data[r].stats.movespeed
            var tag=data.data[r].tags
            var spellblock=data.data[r].stats.spellblock
            var gen= data.data[r].stats.mpregen
            
            contenedorgrande.push({nombre,speed,tag,spellblock,gen})
            
        }
        
        console.log(comparativosvelocidad)
        console.log(contenedorgrande)
        
        var jungla=contenedorgrande.filter(item=>{
            return (!item.tag.includes("Mage") && item.speed>=0.85*355 &&item.spellblock>30 && item.gen<10) ;
            })
           console.log(jungla)
           var listajungla=[]
           for (var k in jungla){
            listajungla.push(jungla[k].nombre)
            
        }
        console.log(listajungla)
        filtrojungla (".card",listajungla);
       }
        }
        ) }
    

//ventana emergente al seleccionar campeon para mirar caracteristicas
function mostrarPopup(campeon) {
    const contenido = document.getElementById("popup");
    const name = document.createElement("h1");
    const image = document.createElement("img");
    const div = document.createElement("div");
    div.id = "popupdiv";
    name.innerText = campeon.id;
    image.src = campeon.splash;
    div.appendChild(name);
    div.appendChild(image);
    contenido.appendChild(div);
  }
  
  //function cerrarPopup (){
  //const contenido = document.getElementById("popup");
  //contenido.innerHTML = '';
  
  //}



const botonabrir = document.getElementById('menudesple');
botonabrir.addEventListener('mouseover',abrir);
botonabrir.addEventListener('mouseout',cerrar);

const posiciones2 = document.getElementById('posiciones2');
posiciones2.addEventListener('mouseover',abrir2);
posiciones2.addEventListener('mouseout',cerrar2);

const posiciones1 = document.getElementById('posiciones1');
posiciones1.addEventListener('mouseover',abrir1);
posiciones1.addEventListener('mouseout',cerrar1);

function abrir(){
    var elem=document.getElementById('desplegables');
    elem.style.display = "block";
   }
   
   function cerrar(){
    var elem=document.getElementById('desplegables');
    elem.style.display = "none";
   }
   
   function abrir1(){
    var elem=document.getElementById('subitem1');
    elem.style.display = "block";
   }
   
   function cerrar1(){
    var elem=document.getElementById('subitem1');
    elem.style.display = "none";
   }
   function abrir2(){
    var elem=document.getElementById('subitem2');
    elem.style.display = "block";
   }
   
   function cerrar2(){
    var elem=document.getElementById('subitem2');
    elem.style.display = "none";
   }