import { useUpdateUserMutation, type AuthUser, type UserUpdateInput, ProfileDocument } from "@/generated/graphql";
import Form from "@/components/forms/form";
import Wrapper from "../components/common/wrapper";
import withAuth from "../lib/auth/with-auth";
import FormInput from "@/components/forms/FormInput";
import Submit from "@/components/forms/submit";
import FormTextarea from "../components/forms/form-textarea";
import CustomButton from "@/components/common/CustomButton";
import { useToken } from "@/lib/hooks/use-token";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMessageHandler } from "@/lib/hooks/use-message";

const Settings = ({ user }: { user: AuthUser }) => {
  const client = useApolloClient();
  const { handleChangeToken, token } = useToken();
  const { success, handleErrors } = useMessageHandler();
  const router = useRouter();

  // useEffect(() => {
  //   const resetAndRedirect = async () => {
  //     if (!token) {
  //       await client.clearStore()
  //       await client.resetStore();
  //     }
  //   };
  //   resetAndRedirect();
  // }, [token, client, router]);

  const [updateUser] = useUpdateUserMutation({
    refetchQueries: [{ query: ProfileDocument, variables: { username: user?.username } }],
    onError: (err) => handleErrors({ err, mode: 'alert' }),
    onCompleted: () => success({ content: 'user updated!', mode: 'toast' }),
  });


  const { username, email, bio, image } = user;
  const init: UserUpdateInput = {
    username,
    email,
    bio: bio ?? "",
    image: image ?? "",
    password: "",
  };

  

  async function onUpdateSettings(input: UserUpdateInput) {
    await updateUser({ variables: { input } });
  }


  const onLogout = async () => {
    handleChangeToken("");
    // move it to use effect because there is delay in useState
    await client.resetStore();
    router.replace("/login");
  };

  return (
    <Wrapper title="Settings">
      <div className="container flex flex-wrap flex-col items-center mx-auto pt-12">
        <h1 className="text-4xl font-extralight">Your Settings</h1>
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
          <Form<UserUpdateInput>
            onSubmit={onUpdateSettings}
            mode="onBlur"
            reValidateMode="onBlur"
            defaultValues={init}
          >
            <fieldset
              className="flex flex-col justify-center mx-auto"
              aria-live="polite"
            >
              <FormInput<UserUpdateInput>
                name="username"
                placeholder="Your name"
              />
              <FormTextarea<UserUpdateInput>
                name="bio"
                placeholder="Short bio about you"
                rows={8}
              />
              <FormInput<UserUpdateInput> name="email" placeholder="Email" />
              <FormInput<UserUpdateInput>
                name="password"
                placeholder="Password"
                type="password"
                clear
              />

              <Submit size="l" className="self-end" strict>
                Update Settings
              </Submit>
            </fieldset>
          </Form>

          <hr className="my-4" />

          <CustomButton
            color="danger"
            outlined
            className="self-start"
            onClick={onLogout}
          >
            Or click here to logout
          </CustomButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default withAuth(Settings);
