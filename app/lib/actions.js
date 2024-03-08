// 'use server'

// import { signIn } from "next-auth/react"

 
// // import { signIn } from '@/auth'
 
// export async function authenticate(_currentState, formData) {
//   try {
//     await signIn('credentials', formData)
//     console.log("formdata", formData)
//   } catch (error) {
//     if (error) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.'
//         default:
//           return 'Something went wrong.'
//       }
//     }
//     throw error
//   }
// }