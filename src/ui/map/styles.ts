interface Style {
  title: string;
  style:
    | string
    | {
        name: string;
        version: number;
        glyphs: string;
        sources: {
          [key: string]: {
            type: string;
            tiles: string[];
            tileSize: number;
            attribution: string;
          };
        };
        layers: Array<{
          id: string;
          type: string;
          source: string;
          minzoom: number;
          maxzoom: number;
        }>;
      };
}

const styles: Style[] = [
  {
    title: 'Standard',
    style: 'mapbox://styles/mapbox/standard'
  },
  {
    title: 'Satellite Streets',
    style: 'mapbox://styles/mapbox/satellite-streets-v12'
  },
  {
    title: 'Outdoors',
    style: 'mapbox://styles/mapbox/outdoors-v12'
  },
  {
    title: 'Light',
    style: 'mapbox://styles/mapbox/light-v11'
  },
  {
    title: 'Dark',
    style: 'mapbox://styles/mapbox/dark-v11'
  },
  {
    title: 'OSM',
    style: {
      name: 'osm',
      version: 8,
      glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
      sources: {
        'osm-raster-tiles': {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      },
      layers: [
        {
          id: 'osm-raster-layer',
          type: 'raster',
          source: 'osm-raster-tiles',
          minzoom: 0,
          maxzoom: 22
        }
      ]
    }
  }
];
export default styles;
