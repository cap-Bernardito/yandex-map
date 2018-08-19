class Entry {
    constructor() {
        this.entries = this.entries = [
            {
                latitude: 59.97,
                longitude: 30.31,
                hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
                balloonContent: [
                    '<div class="map__balloon">',
                    '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
                    'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
                    '</div>'
                ],
                key: 'house'
            },
            {
                latitude: 59.94,
                longitude: 30.25,
                hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
                balloonContent: [
                    '<div class="map__balloon">',
                    '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
                    'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
                    '</div>'
                ],
                key: 'house'
            },
            {
                latitude: 55.94,
                longitude: 30.25,
                hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
                balloonContent: [
                    '<div class="map__balloon">',
                    '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
                    'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
                    '</div>'
                ],
                key: 'house'
            },
            {
                latitude: 55.99,
                longitude: 30.29,
                hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
                balloonContent: [
                    '<div class="map__balloon">',
                    '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
                    'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
                    '</div>'
                ],
                key: 'house'
            },
            {
                latitude: 55.96,
                longitude: 30.21,
                hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
                balloonContent: [
                    '<div class="map__balloon">',
                    '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
                    'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
                    '</div>'
                ],
                key: 'house'
            },
            {
                latitude: 59.93,
                longitude: 30.34,
                hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
                balloonContent: [
                    '<div class="map__balloon">',
                    '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
                    'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
                    '</div>'
                ],
                key: 'all'
            }
        ]
    }

    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 1000);
        });
      }

    getEntries(key){
        if (!key) {
            return this.resolveAfter2Seconds(this.entries);
        }
        return this.resolveAfter2Seconds(this.entries.filter(el => el.key === key));
    }
}


class Application {
    constructor() {
        this.map = null;
        this.geoObjects = [];
        this.entriList = new Entry();
        this.entriesKey = null;
        this.init();
    }
    
    init() {
        ymaps.ready(this.render.bind(this));
        document.getElementById('act').addEventListener('click', this.choose.bind(this));
    }

    render() {
        const entries = async () => {
            try {
                const result = await this.entriList.getEntries(this.entriesKey);
                return this.createMap(this.getPlacemark(result));
            } catch(err) {
                console.error(`Error: ${err}`);
            }
        }
        entries();
    }

    getPlacemark(entries) {
        const geoObjects = [];
    
        for (let i = 0; i < entries.length; i++) {
            geoObjects[i] = new ymaps.Placemark([entries[i].latitude, entries[i].longitude],
            {
                hintContent: entries[i].hintContent,
                balloonContent: entries[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                // iconImageHref: 'img/sprite.png',
                // iconImageSize: [46, 57],
                // iconImageOffset: [-23, -57],
                // iconImageClipRect: [[415, 0], [461, 57]]
            });
        }

        return geoObjects;
    }

    createMap(geoObjects) {
        if(this.map) {
            this.map.destroy();
        }
 
        this.map = new ymaps.Map('map', {
            center: [59.94, 30.32],
            zoom: 12,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });
    
        const clusterer = new ymaps.Clusterer({
            // clusterIcons: [
                // {
                    // href: 'img/burger.png',
                    // size: [100, 100],
                    // offset: [-50, -50]
                // }
            // ],
            // clusterIconContentLayout: null
        });
    
        this.map.geoObjects.add(clusterer);
        clusterer.add(geoObjects);
    }

    choose() {
        this.entriesKey = 'house';
        this.render();
    }
}

const app = new Application();