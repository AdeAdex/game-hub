import React from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ContributorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; description: string }) => void;
  submitting: boolean;
}

const ContributorModal: React.FC<ContributorModalProps> = ({
  open,
  onClose,
  onSubmit,
  submitting,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    // <Dialog open={open} onClose={onClose} PaperProps={{
    //     className: theme === "dark" ? "bg-gray-800 text-white" : "",
    //     style: { maxWidth: '600px', width: '100%' }
    //   }}>
    //   <DialogTitle className={theme === "dark" ? "bg-gray-800 text-white" : ""}>Add a Contributor</DialogTitle>
    //   <form onSubmit={formik.handleSubmit}>
    //     <DialogContent>
    //       <div className={`flex flex-col gap-[5px] ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
    //         <label htmlFor="contributor-name" className="w-full font-bold text-sm">
    //           Name
    //         </label>
    //         <input
    //           type="text"
    //           id="contributor-name"
    //           name="name"
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           value={formik.values.name}
    //           className={`w-full border border-2 px-3 py-[5px] rounded-md ${
    //             theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
    //           } ${
    //             formik.errors.name && formik.touched.name ? "register-input" : ""
    //           }`}
    //           placeholder={
    //             formik.touched.name && formik.errors.name
    //               ? formik.errors.name
    //               : "Enter the contributor name"
    //           }
    //         />
    //       </div>
    //       <div className="flex flex-col gap-[5px] mt-4">
    //         <label htmlFor="contributor-description" className="w-full font-bold text-sm">
    //           Description
    //         </label>
    //         <textarea
    //           id="contributor-description"
    //           name="description"
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           value={formik.values.description}
    //           className={`w-full border border-2 px-3 py-[5px] rounded-md ${
    //             theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
    //           } ${
    //             formik.errors.description && formik.touched.description ? "register-input" : ""
    //           }`}
    //           rows={3}
    //           placeholder={
    //             formik.touched.description && formik.errors.description
    //               ? formik.errors.description
    //               : "Enter the contributor description"
    //           }
    //         ></textarea>
    //       </div>
    //     </DialogContent>
    //     <DialogActions className={theme === "dark" ? "bg-gray-800 text-white" : ""}>
    //       <button
    //         type="button"
    //         onClick={onClose}
    //         className={`px-4 py-2 rounded ${
    //           theme === "dark" ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-200 text-black hover:bg-gray-300"
    //         }`}
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="submit"
    //         disabled={submitting}
    //         className={`px-4 py-2 rounded ml-2 ${
    //           submitting
    //             ? "bg-gray-400 text-gray-800 cursor-not-allowed"
    //             : theme === "dark"
    //             ? "bg-blue-600 text-white hover:bg-blue-500"
    //             : "bg-blue-500 text-white hover:bg-blue-400"
    //         }`}
    //       >
    //         {submitting ? "Submitting..." : "Add Contributor"}
    //       </button>
    //     </DialogActions>
    //   </form>
    // </Dialog>
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "bg-white dark:bg-gray-800 text-black dark:text-white",
        style: { maxWidth: "600px", width: "100%" },
      }}
    >
      <DialogTitle className="bg-white dark:bg-gray-800 text-black dark:text-white">
        Add a Contributor
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <div className="flex flex-col gap-[5px] bg-white dark:bg-gray-800 text-black dark:text-white">
            <label
              htmlFor="contributor-name"
              className="w-full font-bold text-sm"
            >
              Name
            </label>
            <input
              type="text"
              id="contributor-name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full border border-2 px-3 py-[5px] rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                formik.errors.name && formik.touched.name
                  ? "register-input"
                  : ""
              }`}
              placeholder={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : "Enter the contributor name"
              }
            />
          </div>
          <div className="flex flex-col gap-[5px] mt-4 bg-white dark:bg-gray-800 text-black dark:text-white">
            <label
              htmlFor="contributor-description"
              className="w-full font-bold text-sm"
            >
              Description
            </label>
            <textarea
              id="contributor-description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`w-full border border-2 px-3 py-[5px] rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                formik.errors.description && formik.touched.description
                  ? "register-input"
                  : ""
              }`}
              rows={3}
              placeholder={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : "Enter the contributor description"
              }
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions className="bg-white dark:bg-gray-800 text-black dark:text-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 rounded ml-2 ${
              submitting
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-400 dark:hover:bg-blue-500"
            }`}
          >
            {submitting ? "Submitting..." : "Add Contributor"}
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContributorModal;
