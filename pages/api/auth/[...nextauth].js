import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { mongooseConnect } from '@/lib/mongoose';
import Consument from '@/models/consuments';
import bcrypt from 'bcryptjs';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  
  secret: process.env.SECRET,

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await mongooseConnect();

        const { email, password } = credentials;

        const user = await Consument.findOne({ email });

        if (!user) {
          throw new Error('User tidak ditemukan');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error('Password Salah');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  
});