import React from 'react'


export const  SuccessTable = ({ data }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr key={d._id}>
            <td>{d.name}</td>
            <td>{d.email}</td>
            <td>{d.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
