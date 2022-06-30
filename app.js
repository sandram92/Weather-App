const button=document.querySelector('button');
const input=document.querySelector('.searchBar');
const city=document.querySelector('.city');
const weather=document.querySelector('.weather');

button.addEventListener('click', function(){
    weatherCheck()
    randomBg()
})
input.addEventListener('keyup',function(e){
    if(e.key=='Enter'){
        weatherCheck()
        randomBg()
    }
});
async function weatherCheck(){
    const cityName=input.value
    const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ac10e226566d5977cf0e46f515400473`);
    const tempData=Math.floor(res.data.main.temp) ;
    const descri=res.data.weather[0].description;
    const humi=res.data.main.humidity;
    const iconPicture= res.data.weather[0].icon
    const windSpeed=res.data.wind.speed;

    weather.innerHTML=`    
    <div class="weather">
    <h1 class="city">Weather in: ${cityName}</h1>
    <div class="temp">${tempData}°C</div>
    <img src="http://openweathermap.org/img/wn/${iconPicture}@2x.png" alt="" class="icon">
    <div class="description">${descri}</div>
    <div class="humidity">Humidity: ${humi}%</div>
    <div class="wind">Wind-speed:${windSpeed}km/h</div>
    </div> `
 };
    const randomBg=function(){
    const bgImages= [ "url('0.jpg')", "url('1.jpg')", "url('2.jpg')", "url('3.jpg')" ]
    const randomBg=Math.floor(Math.random()*bgImages.length)
    const selectedBg= bgImages[randomBg]
    document.body.style.backgroundImage= selectedBg
    }
    
// const successCallBack=function(position){
//     console.log(position)
// }

// const errorCallBack=function(error){
//     console.log(error)
// }
// navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
// if( successCallBack){

// }

