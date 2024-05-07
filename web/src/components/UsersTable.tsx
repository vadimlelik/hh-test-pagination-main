import Table from "react-bootstrap/Table";
import {TUserItem} from "@/pages";

interface UsersTableProps {
  users: TUserItem[]
  onSort: (arg: string) => void
}

const UsersTable = ({users, onSort}: UsersTableProps) => {
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th onClick={() => onSort('id')}>ID</th>
        <th onClick={() => onSort('firstname')}>Имя</th>
        <th onClick={() => onSort('lastname')}>Фамилия</th>
        <th onClick={() => onSort('phone')}>Телефон</th>
        <th onClick={() => onSort('email')}>Email</th>
        <th onClick={() => onSort('updatedAt')}>Дата обновления</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td>{user.updatedAt}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default UsersTable
