'use client';
import React, { useState } from 'react';
import { handleSignUp } from '../actions/users';
import { useRouter } from 'next/navigation';

export interface IUserSignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const [formValues, setFormValues] = useState<IUserSignUpForm>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const { push } = useRouter();

  function handleUpdateForm(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { value, id } = e.target;
    if (id === 'firstName') {
      setFormValues({ ...formValues, firstName: value });
    } else if (id === 'lastName') {
      setFormValues({ ...formValues, lastName: value });
    } else if (id === 'email') {
      setFormValues({ ...formValues, email: value });
    } else if (id === 'password') {
      setFormValues({ ...formValues, password: value });
    }
  }

  async function handleSubmit() {
    try {
      await handleSignUp(formValues);
      alert(
        'Success! Please follow the instructions in the email we sent you and verify your account.'
      );
      push('/');
    } catch (error: any) {
      console.error(error);
      if (error?.message) {
        alert(error?.message);
      }
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 align-center">
        <label htmlFor="firstName">First name</label>
        <input
          onChange={handleUpdateForm}
          type="text"
          id="firstName"
          value={formValues.firstName}
          className="text-white bg-dark-gray rounded-md py-2 px-4 w-full border border-light-gray"
          name="firstName"
        />
      </div>
      <div className="flex flex-col gap-1 align-center">
        <label htmlFor="lastName">Last name</label>
        <input
          onChange={handleUpdateForm}
          type="text"
          id="lastName"
          value={formValues.lastName}
          className="text-white bg-dark-gray rounded-md py-2 px-4 w-full border border-light-gray"
          name="lastName"
        />
      </div>
      <div className="flex flex-col gap-1 align-center">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleUpdateForm}
          type="email"
          id="email"
          value={formValues.email}
          className="text-white bg-dark-gray rounded-md py-2 px-4 w-full border border-light-gray"
          name="email"
        />
      </div>
      <div className="flex flex-col gap-1 align-center">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleUpdateForm}
          type="password"
          id="password"
          value={formValues.password}
          className="text-white bg-dark-gray rounded-md py-2 px-4 w-full border border-light-gray"
          name="password"
        />
      </div>
      <button type="submit" className="button-primary mt-2">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
