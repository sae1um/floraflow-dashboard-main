import React from 'react'
import TabViewCard from './dashboard/TabViewCard'
import { greenhouses, rooms } from './libs/data/testGreenhouses'
import randomColor from "randomcolor"

export function GridView() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden'>
      {
        greenhouses.map((ghouse, index) => (
          <TabViewCard
            key={index}
            view={"grid"}
            power_status={ghouse.greenhouseStatus}
            name={ghouse.outGreenhousename}
            room={ghouse.outRoomName}
            temp={ghouse.temperature}
            humidity={ghouse.humidity}
            soil_moisture={ghouse.soilMoisture}
            vent_status={ghouse.ventStatus}
          />
        ))
      }
    </div>
  )
}

export function RoomView() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-auto'>
      {rooms ?
        rooms.map((room, index) => {
          const backgroundColor = randomColor({hue: 'green', count: 1})[0];
          return(
          <div key={room} style={{backgroundColor}} className='rounded-lg p-4 flex flex-row md:flex-col lg:flex-col gap-2 overflow-x-scroll touch-pan-x md:overflow-x-hidden lg:overflow-x-hidden'>
            <span className='font-bold text-xl'>{room}</span>
          {
            greenhouses.filter((greenhouse) => greenhouse.outRoomName === room).map((ghouse, index) => {
              if(!ghouse){
                return(<span> No greenhouses found</span>)
              }
              return(<TabViewCard
                key={ghouse.greenhouseId}
                view={"room"}
                power_status={ghouse.greenhouseStatus}
                name={ghouse.outGreenhousename}
                room={ghouse.outRoomName}
                temp={ghouse.temperature}
                humidity={ghouse.humidity}
                soil_moisture={ghouse.soilMoisture}
                vent_status={ghouse.ventStatus}
              />)
            })
          } 
        </div>)
      }) : <span>No rooms found</span>
      }
    </div>
  )
}
