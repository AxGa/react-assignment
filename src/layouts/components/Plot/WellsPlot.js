import React from 'react';
import Plot from 'react-plotly.js';

export const WellsPlot = (props) => {
    return (
      <Plot
        data={props.plotData}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        layout={{autosize: true, title: 'Wells Plot', barmode:props.barMode}}
      />
    );
}