import { Avatar, Dropdown } from "flowbite-react";
import { useUserAuth, useAdminAuth } from "../../../../hooks/useAuth";

export default function Profile() {

  const {
    authUser,
    setAuthUser,
    isLoggedIn: isUserLoggedIn,
    setIsLoggedIn: setUserIsLoggedIn,
  } = useUserAuth();

  const {
    authAdmin,
    setAuthAdmin,
    isLoggedIn: isAdminLoggedIn,
    setIsLoggedIn: setAdminIsLoggedIn,
  } = useAdminAuth();

  const isLoggedIn = isUserLoggedIn || isAdminLoggedIn;
  const setIsLoggedIn = isUserLoggedIn ? setUserIsLoggedIn : setAdminIsLoggedIn;

  return (
    <>
      {isAdminLoggedIn ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              className="mr-2"
              alt="Configurações do usuário"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Adriana Oliveira</span>
            <span className="block truncate text-sm font-medium"></span>
          </Dropdown.Header>
          <Dropdown.Item href="/app/clientes">
            Gerenciamento de Clientes
          </Dropdown.Item>
          <Dropdown.Item href="/app/galerias">
            Gerenciamento de Galerias
          </Dropdown.Item>
          <Dropdown.Item href="/app/financeiro">
            Gerenciamento de Finanças
          </Dropdown.Item>
          <Dropdown.Item href="/app/agenda">
            Gerenciamento de Compromissos
          </Dropdown.Item>
          <Dropdown.Divider />
          {isLoggedIn && (
            <Dropdown.Item onClick={() => setIsLoggedIn(false)}>
              Sair
            </Dropdown.Item>
          )}
        </Dropdown>
      ) : isUserLoggedIn ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              className="mr-2"
              alt="Configurações do usuário"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Nome do cliente</span>
            <span className="block truncate text-sm font-medium">
              cliente@example.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item href="/app/escolher-fotos">
            Escolher Fotos
          </Dropdown.Item>
          <Dropdown.Item href="/app/visualizar-contratos">
            Visualizar Contratos
          </Dropdown.Item>
          <Dropdown.Item href="/app/ajuda">Ajuda</Dropdown.Item>
          <Dropdown.Divider />
        </Dropdown>
      ) : null}
    </>
  );
}