import { getSession } from "next-auth/react";

const ProfilePage = ({ user }) => {
   // Use the user data obtained from the session
   // The user data will be available in the 'user' prop
   return (
      <div>
         <h1>Welcome, {user.name}!</h1>
         {/* Display other user data */}
      </div>
   );
};

export async function getServerSideProps(context) {
   const session = await getSession(context);
   if (!session?.user) {
      return {
         redirect: {
            destination: "/",
            permanent: false,
         },
      };
   }

   return {
      props: {
         user: session.user,
      },
   };
}

export default ProfilePage;
