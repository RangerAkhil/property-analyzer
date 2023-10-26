import React from 'react'

const DataAverage = ({ data }) => {
    const totalDuration = data.reduce((total, item) => total + Number(item.duration), 0);
    const totalProperty = data.reduce((total, item) => total + item.property.length, 0);
 
    const users = data.map((item) => {
        const average = item.duration / item.property.length;
        return { ...item, average }
    }).sort((a, b) => a.average - b.average)

    const averageDuration = totalDuration / data.length;
    const averageProperty = totalProperty / data.length;

     return (
        <table>
            <tr>
                <td>Average Time Tracked</td>
                 <td>{Number(averageDuration).toFixed(2)}</td>
            </tr><tr>
                <td>Average property analyzed</td>
                 <td>{Number(averageProperty).toFixed(2)}</td>

            </tr><tr>
                <td>Top performing user</td>
                 <td>{users[0].username}</td>
            </tr>
            <tr>
                <td>Total time tracked</td>
                 <td>{Number(totalDuration).toFixed(2)}</td>
            </tr>
        </table>
    )
}

export default DataAverage