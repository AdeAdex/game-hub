// app/components/validationSchema.ts
import * as Yup from "yup";

export const uploadGameSchema = Yup.object({
  title: Yup.string().required("Game title is required"),
  description: Yup.string().required("Game description is required"),
  file: Yup.mixed().required("A file is required"),
});
