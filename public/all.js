getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);
    for (item of data) {
        console.log(item);
        const root = document.createElement("div");
        const div1 = document.createElement("div");
        div1.textContent = `lat: ${item.lat} long: ${item.lon}`;
        const div2 = document.createElement("div");
        div2.textContent = `mood: ${item.mood}`;
        const div3 = document.createElement("div");
        const dateString = new Date(item.timestamp).toLocaleString();
        div3.textContent = dateString;
        const image = document.createElement("img");
        image.src = item.image64;
        const p = document.createElement("p");
        root.append(div1,div2,div3,image,p);
        document.body.append(root);
    }
}