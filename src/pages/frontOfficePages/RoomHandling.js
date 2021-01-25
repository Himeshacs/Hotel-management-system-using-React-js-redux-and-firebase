import React from 'react'
import MaterialTable from 'material-table'
import RoomTypeTable from '../../components/frontOffice/rooms/RoomTypeTable'
import MasterDetail from '../../components/frontOffice/rooms/MasterDetail'

function RoomHandling() {
    return (
      <MaterialTable
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ]}
        data={[
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        ]}
        title="Detail Panel With RowClick Preview"
        detailPanel={rowData => {
          return (
               <RoomTypeTable/> 
          )
        }}
        options={{
        rowStyle: {
          backgroundColor: 'grey',
        }
      }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    )
  }

  export default RoomHandling