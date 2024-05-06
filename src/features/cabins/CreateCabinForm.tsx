import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<Props>();
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin added successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  type Props = {
    id: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: FileList;
    description: string;
  };

  type EditProps = {
    cabinToEdit?: Props;
  };

  const onSubmit = function (data: Props) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  };

  const onError = function (errors: Object) {
    //console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isPending}
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.name?.message}>
        <Input
          type="number"
          disabled={isPending}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Value should be at least 1." },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isPending}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Value should be at least 1." },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isPending}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (curValue) =>
              +curValue <= +getValues().regularPrice ||
              "Discount should be less than the regular price.",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isPending}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          disabled={isPending}
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isPending}>Add cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
