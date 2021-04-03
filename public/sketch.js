
function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);
    if ('geolocation' in navigator) {
        let lat;
        let lon;
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lat = position.coords.latitude;
            document.getElementById("latitude").textContent = lat;
            lon = position.coords.longitude;
            document.getElementById("longitude").textContent = lon;

            // ATENCIÓN: AQUÍ MANDO EL CÓDIGO AL SERVIDOR CON UN POST
            const button = document.getElementById('submit');
            button.addEventListener('click', async event => {
                const mood = document.getElementById('mood').value;
                video.loadPixels();
                const image64 = video.canvas.toDataURL();
                const data = { lat, lon, mood, image64 };
                const options = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                // Aquí esta la ruta que he definido en el servidor. 
                const response = await fetch('/api', options);   // para poner aquí await y coger la promise he puesto arriba async
                const json = await response.json();
                console.log(json);
            });

        });

    } else {
        console.log('geolocation not available');
    }

}
