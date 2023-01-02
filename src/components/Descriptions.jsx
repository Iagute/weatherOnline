import React from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoodIcon from '@mui/icons-material/Mood';
import CompressIcon from '@mui/icons-material/Compress';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';

export const Descriptions = ({ weather, units }) => {

  const tempUnit = units === 'metric' ? '°C' : '°F'
  const windUnit = units === 'metric' ? 'm/s' : 'm/h'

  const cards = [
    {
      id: 1,
      icon: <KeyboardArrowDownIcon />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <KeyboardArrowUpIcon />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <MoodIcon />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <CompressIcon />,
      title: "pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <WaterIcon />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <AirIcon />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];

  return (
    <div className="section sectionDescriptions">

      {cards.map(({id, icon, title, data, unit}) => (
        <div key={id} className="card">
          <div className="descriptionCardIcon">
            {icon}
            <small> {title} </small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}

    </div>
  )
}
