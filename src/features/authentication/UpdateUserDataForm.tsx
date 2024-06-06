import { FormEvent, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUserInfo } from "./useUpdateUserInfo";

function UpdateUserDataForm() {
  const { user } = useUser();
  if (!user) return;
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;

  const { updateUserInfo, isUpdating } = useUpdateUserInfo();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName) return;
    updateUserInfo(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form type="regular" onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            size="medium"
            type="reset"
            $variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button $variation="primary" size="medium" disabled={isUpdating}>
            Update account
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
