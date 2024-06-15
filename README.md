# The Wild Oasis

🇬🇧 Fullstack (React + supabase) hotel management application. Project built following the design by Jonas Schmedtmann, as part of his [Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course/).

🇧🇷 Projeto de gerenciamento hoteleiro fullstack (React + supabase). Parte do curso [Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course), de Jonas Schmedtmann.

## Features

- Authentication: for the hotel staff
- Bookings table: including options to filter by status, and sort by date or cabin price
- Intuitive dashboard
- Dark Mode option
- Check-in/Check-out guests: straight from the dashboard or through each detailed booking page
- Cabin management: add, edit and delete cabins
- User creation (only by logged in users)
- Settings: option to easily change hotel settings

## Technical concepts + external libraries used

- Typescript: JS to TS adaptation made by me (my very first one!), so there will likely be lots of mistakes! 😅
- Compound Components
- Custom React Hooks
- Error Boundary
- React Hook Form
- React Router
- React Query
- Recharts
- RESTful APIs
- Styled Components

## Live Demo

[Here on Netlify](https://the-wild-oasis-tsm13.netlify.app)!

### **Notes (please read!)**

🇬🇧
A pre-created user is available for demo purposes. The "Demo Data" button uploads dummy booking data to the database, which will be fetched by the dashboard after it's reloaded.

If you face issues logging in with an "error while fetching resources" message, it might be that the database was paused due to inactivity. If that happens, the app will become unusable until I reactivate the database.

**Important**: While this is just a sample project built for learning purposes, I humbly ask that you don't intentionally misuse any data deletion/edition functionalities, as not to mess up the database. 🙏

---

🇧🇷
Usuário de teste já disponível para fins de demonstração. O botão "Demo Data" faz upload de dados mockados para a database, os quais serão atualizados na dashboard após um refresh ou troca de página.

Se o site retornar a mensagem "error while fetching resources" durante tentativa de login, pode ser que a database tenha sido pausada por inatividade, não sendo possível acessar os dados a não ser que eu a reative.

**Importante**: Apesar deste projeto ser apenas para fins de aprendizado, peço humildemente que não faça mal uso intencional das funcionalidades de edição/exclusão de dados, pois ambos se refletem na database automaticamente. 🙏
