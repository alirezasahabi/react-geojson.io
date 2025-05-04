// this mode extends the build-in linestring tool, displaying the current length
// of the line as the user draws using a point feature and a symbol layer

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { getDisplayMeasurements } from './util';
import type { Feature, Position } from 'geojson';

interface LineStringState {
  line: {
    id: string;
    coordinates: Position[];
  };
  direction: 'forward' | 'backward';
}

const ExtendedLineStringMode = {
  ...MapboxDraw.modes.draw_line_string,

  toDisplayFeatures: function (
    state: LineStringState,
    geojson: Feature,
    display: (feature: Feature) => void
  ) {
    const lineId = state.line.id;

    const isActiveLine = geojson.properties?.id === lineId;

    geojson.properties = {
      ...geojson.properties,
      active: isActiveLine ? 'true' : 'false'
    };

    if (!isActiveLine) return display(geojson);

    // Only render the line if it has at least one real coordinate
    if (
      geojson.geometry.type === 'LineString' &&
      geojson.geometry.coordinates.length < 2
    )
      return;

    geojson.properties.meta = 'feature';

    display({
      type: 'Feature',
      properties: {
        meta: 'vertex',
        parent: lineId,
        coord_path: `${
          state.direction === 'forward'
            ? geojson.geometry.type === 'LineString'
              ? geojson.geometry.coordinates.length - 2
              : 0
            : 1
        }`,
        active: 'false'
      },
      geometry: {
        type: 'Point',
        coordinates:
          geojson.geometry.type === 'LineString'
            ? geojson.geometry.coordinates[
                state.direction === 'forward'
                  ? geojson.geometry.coordinates.length - 2
                  : 1
              ]
            : [0, 0]
      }
    });

    display(geojson);

    const displayMeasurements = getDisplayMeasurements(geojson);

    // create custom feature for the current pointer position
    const currentVertex: Feature = {
      type: 'Feature',
      properties: {
        meta: 'currentPosition',
        radius: `${displayMeasurements.metric}\n${displayMeasurements.standard}`,
        parent: lineId
      },
      geometry: {
        type: 'Point',
        coordinates:
          geojson.geometry.type === 'LineString'
            ? geojson.geometry.coordinates[
                geojson.geometry.coordinates.length - 1
              ]
            : [0, 0]
      }
    };

    display(currentVertex);
  }
};

export default ExtendedLineStringMode;
