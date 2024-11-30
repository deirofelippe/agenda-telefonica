# Agenda Telefônica Frontend

## Checklist

- [ ]: usar o `memo`
- [ ]: usar configurar o error boundaries
- [x]: usar o `useContext`
- [x]: usar o `useReducer`
- [ ]: usar o forward ref
- [ ]: usar o lazy e suspense

## Estrutura das pastas

- `contexts`
- `hooks`
- `services`: acesso a apis.
- `components`: componentes que são usados em mais de uma página ou componente.
- `utils`: códigos que são usados em mais de 1 arquivo.
- `page`: componentes que é usado para renderizar uma página.
  - `ContactList`: nome do componente que vai renderizar a página.
    - `components`: componentes que só serão usados nos componentes de ContactList.
    - `hooks`: hooks que só serão usados nos componentes de ContactList.
    - `tests`: testes voltados ao componente ContactList.
    - `utils`: códigos que só serão usados nos componentes de ContactList.