import { Avatar, Dropdown } from "flowbite-react";

export default function Profile() {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<Avatar alt="Configurações de Usuário" rounded />}
    >
      <Dropdown.Header>
        <span className="block text-sm">Adriana Oliveira</span>
      </Dropdown.Header>
      <Dropdown.Item href="/">Página Inicial</Dropdown.Item>
      <Dropdown.Item href="/app/clientes">Clientes</Dropdown.Item>
      <Dropdown.Item href="/app/galerias">Galerias</Dropdown.Item>
      <Dropdown.Item href="/app/agenda">Agenda</Dropdown.Item>
      <Dropdown.Item href="/app/financeiro">Financeiro</Dropdown.Item>
    </Dropdown>
  );
}
