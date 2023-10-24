import React from 'react'

const DataTable = ({ data }) => {
   return (
    <table>
      <tr>
        <th>Users</th>
        <th>Company</th>
        <th>Time Tracked</th>
        <th>Analyzed properties</th>
      </tr>
      {
        data.map(({ userId, username, company, duration, property }) => {
          return <tr key={userId}>
            <td>{username}</td>
            <td>{company}</td>
            <td>{duration}</td>
            <td>{property.map((item, i) => <p key={i}>{item}</p>)}</td>
          </tr>
        })
      }

    </table>

  )
}

export default DataTable