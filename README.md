# The Wild Oasis

![Dashboard](/public/screenshots/00.png)

🇬🇧 Fullstack (React + supabase) hotel management application. Project built following the design by Jonas Schmedtmann, as part of his [Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course/).

🇧🇷 Projeto de gerenciamento hoteleiro fullstack (React + supabase). Parte do curso [Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course), de Jonas Schmedtmann.

## Live Demo

[Here on Netlify](https://the-wild-oasis-tsm13.netlify.app)

## Features

- Authentication: for the hotel staff
- Bookings table: including options to filter by status, and sort by date or cabin price
- Intuitive dashboard
- Dark Mode option
- Check-in/Check-out guests: straight from the dashboard or through each detailed booking page
- Cabin management: add, edit and delete cabins
- User creation (only by logged in users)
- Settings: option to easily change hotel settings

![Dashboard](/public/screenshots/01.png)

![Dashboard](/public/screenshots/02.png)

![Dashboard](/public/screenshots/03.png)

![Dashboard](/public/screenshots/04.png)

## Tools and technical concepts

- Compound Components: For the creation of highly reusable components such as tables and modals
- Custom React Hooks: For fetching data with React Query
- Error Boundary
- React Hook Form
- React Router
- React Query
- Recharts
- Supabase
- Styled Components
- Typescript

### Notes

Optimized for mobile: No.

🇬🇧
A pre-created user is available for demo purposes. The "Demo Data" button uploads dummy booking data to the database, which will be fetched by the dashboard after it's reloaded.

If you face issues logging in with an "error while fetching resources" message, it might be that the database was paused due to inactivity. If that happens, the app will become unusable until I reactivate the database.

🇧🇷
Usuário de teste já disponível para fins de demonstração. O botão "Demo Data" faz upload de dados mockados para a database, os quais serão atualizados na dashboard após um refresh ou troca de página.

Se o site retornar a mensagem "error while fetching resources" durante tentativa de login, pode ser que a database tenha sido pausada por inatividade, não sendo possível acessar os dados a não ser que eu a reative.
