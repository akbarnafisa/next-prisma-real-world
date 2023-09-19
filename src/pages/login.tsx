import { useApolloClient } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import CustomLink from "../components/common/CustomLink";
import Wrapper from "../components/common/wrapper";
import Form from "../components/forms/form";
import FormInput from "../components/forms/FormInput";
import Submit from "../components/forms/submit";
import { useLoginMutation, type UserLoginInput } from "../generated/graphql";
import guestOnly from "../lib/auth/guest-only";
import { useMessageHandler } from "../lib/hooks/use-message";
import { useToken } from "../lib/hooks/use-token";
import { loginInputSchema } from "../lib/validation/schema";
import { useEffect } from "react";

const init = { email: "", password: "" };

const Login: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { handleChangeToken, token } = useToken();
  const { handleErrors } = useMessageHandler();

  const [login] = useLoginMutation({
    onCompleted: async (data) => {
      if (data) {
        await client.clearStore()
        await client.resetStore(); // iimportant to reset first, otherwise we got error hit API with no auth
        handleChangeToken(data.login?.token as string);
      }
    },
    onError: (err) => handleErrors({ err, mode: "alert" }),
  });

  async function onLogin(input: UserLoginInput) {
    await login({ variables: { input } });
  }

  return (
    <Wrapper title="Sign in">
      <div className="container flex flex-wrap flex-col items-center mx-auto pt-12">
        <h1 className="text-4xl font-extralight">Sign in</h1>
        <p className="mt-4">
          <CustomLink href="/register" mode="primary" underlined>
            Need an account?
          </CustomLink>
        </p>
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
          <Form<UserLoginInput>
            onSubmit={onLogin}
            schema={loginInputSchema}
            defaultValues={init}
          >
            <fieldset
              className="flex flex-col justify-center mx-auto"
              aria-live="polite"
            >
              <FormInput<UserLoginInput> name="email" placeholder="Email" />
              <FormInput<UserLoginInput>
                name="password"
                placeholder="Password"
                type="password"
              />

              <Submit size="l" className="self-end">
                Sign in
              </Submit>
            </fieldset>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default guestOnly(Login);
